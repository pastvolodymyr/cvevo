import { isAuth } from '@/app/api/middleware/isAuth';
import { NextResponse } from 'next/server';
import { DB } from '@/db';
// @ts-ignore
import {
    fakeRes,
    getCoverLetterPromt,
    getCvImprovementsPromt,
    getInterviewQuestionsPromt,
} from '@/app/api/analyse/claudeMessage';
import Anthropic from '@anthropic-ai/sdk/index';
import { jsonrepair } from 'jsonrepair'


const DEFAULT_400 = 'Sorry, our AI went to sleep, please try again later';
const IMAGE_UPLOAD_LINK = `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API}&expiration=60`;

const anthropic = new Anthropic({
    apiKey: process.env.CLAUDE_API,
});

const toBase64 = async (imageFile: { arrayBuffer: () => any; }) => {
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return buffer.toString('base64')
}

const isUserHasTokensHandler = async (userId: string) => {
    const { getUser } = DB();

    const user = await getUser(userId);

    if(!user.isFree && !user.tokens) {
        throw {
            message: 'You dont have tokens',
            type: 'tokens',
        }
    }
}

// eslint-disable-next-line no-unused-vars
const uploadImage = async (reqFormData: { get: (arg0: string) => any; }) => {
    const imageFile = reqFormData.get('image');
    const formData = new FormData()

    formData.append("image", imageFile)

    const uploadedImageData = await fetch(IMAGE_UPLOAD_LINK, {
        method: 'POST',
        body: formData,
    })
        .then(res => res?.json())
        .catch(e => {
            console.error('Image error 1')
            console.error(e)

            throw {
                message: 'Image preparation error, please try again later',
                type: 'image',
            }
        })

    // @ts-ignore
    if(!uploadedImageData || uploadedImageData?.error) {
        console.error('Image error 2')
        // @ts-ignore
        console.error(uploadedImageData?.error)

        throw {
            message: 'Image preparation error, please try again later',
            type: 'image',
        }
    }

    // @ts-ignore
    const imageUrlFile = await fetch(uploadedImageData.data.url);

    return await toBase64(imageUrlFile)
}

const claudeRequest = async (type: string, imageBase: string, jobTitle: string, jobRequirements: string) => {
    const getPromt = () => {
        switch (type) {
            case 'cv':
                return getCvImprovementsPromt();
            case 'coverLetter':
                return getCoverLetterPromt(jobTitle, jobRequirements);
            case 'interview':
                return getInterviewQuestionsPromt(jobTitle, jobRequirements)
        }
    };

    const claudeData = await anthropic.messages.create({
        model: "claude-3-haiku-20240307",
        max_tokens: 4000,
        temperature: 0.5,
        system: getPromt(),
        messages: [
            {
                role: "user",
                content: [
                    {
                        "type": "image",
                        "source": {
                            "type": "base64",
                            "media_type": 'image/png',
                            "data": imageBase,
                        },
                    },
                ],
            },
            {
                role: "assistant",
                content: [
                    {
                        "type": "text",
                        "text": "Here is JSON:\n[",
                    },
                ],
            },
        ],
    })

    // @ts-ignore
    const aiAnswer = JSON.parse(jsonrepair('[' + claudeData.content[0].text));

    if(aiAnswer[0].noCv || !aiAnswer?.length) {
        throw {
            message: 'Sorry, our AI thinks there is no CV',
            type: 'ai',
        }
    }

    return {
        usage: claudeData.usage,
        data: {
            [type]: aiAnswer,
        },
    }
}

const updateUserData = async (userId: string) => {
    const { updateUser, getUser } = DB();

    const user = await getUser(userId);

    const params = {
        ...user,
        isFree: false,
        tokens: !!user.tokens ? user.tokens - 1 : 0,
    }

    return await updateUser(params)
}

export const POST = isAuth(async function (req) {
    // const reqFormData = await req.formData();

    try {
        // await isUserHasTokensHandler(req.auth?.user?.id);

        // const imageBase = await uploadImage(reqFormData);
        //
        // const jobTitle = reqFormData.get('jobTitle');
        // const jobRequirements = reqFormData.get('jobRequirements');
        // const types = reqFormData.get('types');

        // const aiAnswer = await Promise.all([
        //     ...(types.includes('cv') ? [ claudeRequest('cv', imageBase, jobTitle, jobRequirements) ] : []),
        //     ...(types.includes('coverLetter') ? [ claudeRequest('coverLetter', imageBase, jobTitle, jobRequirements) ] : []),
        //     ...(types.includes('interview') ? [ claudeRequest('interview', imageBase, jobTitle, jobRequirements) ] : []),
        // ])

        // const updatedUser = await updateUserData(req.auth?.user?.id);

        // return NextResponse.json({
        //     data: aiAnswer.reduce((sum, answer) => ({
        //         ...sum,
        //         ...answer.data,
        //     }), {}),
        //     usage: aiAnswer.reduce((sum, answer) => ({
        //         ...sum,
        //         [Object.keys(answer.data)[0]]: answer.usage,
        //     }), {}),
        //     // user: updatedUser,
        // }, { status: 201 });

        return NextResponse.json(fakeRes, { status: 201 });
    } catch (e) {
        return NextResponse.json({
            error: Object.keys(e || {}).length ? e : DEFAULT_400,
        }, { status: 400 });
    }
})

export const runtime = "edge";

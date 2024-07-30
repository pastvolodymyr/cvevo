import { isAuth } from '@/app/api/middleware/isAuth';
import { NextResponse } from 'next/server';
import { DB } from '@/db';
import Anthropic from '@anthropic-ai/sdk/index';
import { jsonrepair } from 'jsonrepair'
import OpenAI from "openai";
import { coverLetterPromt, cvImprovementsPromt, interviewPromt, checkImagePromt } from '@/app/api/analyse/aiMessages';

const openai = new OpenAI();

const DEFAULT_400 = {
    message: 'Sorry, our AI went to sleep, please try again later',
    type: 'ai',
};
const IMAGE_UPLOAD_LINK = `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API}&expiration=60`;

const anthropic = new Anthropic({
    apiKey: process.env.CLAUDE_API,
});

const detectImageType = (buffer: Buffer): string => {
    // Check the file signature (first few bytes) to determine the image type
    if (buffer.slice(0, 4).equals(Buffer.from([0x89, 0x50, 0x4E, 0x47]))) {
        return 'image/png';
    } else if (buffer.slice(0, 3).equals(Buffer.from([0xFF, 0xD8, 0xFF]))) {
        return 'image/jpeg';
    } else if (buffer.slice(0, 6).equals(Buffer.from([0x47, 0x49, 0x46, 0x38, 0x37, 0x61])) ||
        buffer.slice(0, 6).equals(Buffer.from([0x47, 0x49, 0x46, 0x38, 0x39, 0x61]))) {
        return 'image/gif';
    } else if (buffer.slice(0, 8).equals(Buffer.from([0x42, 0x4D]))) {
        return 'image/bmp';
    } else if (buffer.slice(0, 8).equals(Buffer.from([0x49, 0x49, 0x2A, 0x00])) ||
        buffer.slice(0, 8).equals(Buffer.from([0x4D, 0x4D, 0x00, 0x2A]))) {
        return 'image/tiff';
    } else {
        return 'unknown';
    }
}

const toBase64 = async (imageFile: { arrayBuffer: () => any; }) => {
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const imageType = detectImageType(buffer);

    return {
        base64: buffer.toString('base64'),
        imageType
    };
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
    // console.log(uploadedImageData)

    // @ts-ignore
    const imageUrlFile = await fetch(uploadedImageData.data?.medium?.url || uploadedImageData.data?.url);
    const base = await toBase64(imageUrlFile);

    return {
        // @ts-ignore
        common: uploadedImageData.data.url,
        ...base,
    }
}

const claudeRequest = async (imageBase: string, jobTitle: string, jobRequirements: string) => {
    const claudeData = await anthropic.messages.create({
        model: "claude-3-haiku-20240307",
        max_tokens: 4000,
        temperature: 0,
        messages: [
            {
                role: "user",
                content: [
                    {
                        "type": "text",
                        "text": checkImagePromt(),
                    },
                    {
                        "type": "image",
                        "source": {
                            "type": "base64",
                            // @ts-ignore
                            "media_type": imageBase.imageType,
                            // @ts-ignore
                            "data": imageBase.base64,
                        },
                    },
                ],
            },
            {
                role: "assistant",
                content: [
                    {
                        "type": "text",
                        "text": "Here is JSON:\n{",
                    },
                ],
            },
        ],
    })

    // @ts-ignore
    const aiAnswer = JSON.parse(jsonrepair('{' + claudeData.content[0].text));

    return {
        usage: claudeData.usage,
        data: aiAnswer,
    }
}

const openAiRequest = async (types: string[], imageUrl: string, jobTitle: string, jobRequirements: string) => {
    // @ts-ignore
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        response_format: { "type": "json_object" },
        temperature: 0,
        messages: [
            {
                role: "user",
                content: [
                    {
                        type: "image_url",
                        image_url: {
                            "url": imageUrl,
                            "detail": "low",
                        },
                    },
                    ...(types.includes('cv') ? [{ type: "text", text: cvImprovementsPromt() }] : []),
                    ...(types.includes('coverLetter') ? [{ type: "text", text: coverLetterPromt(jobTitle, jobRequirements) }] : []),
                    ...(types.includes('interview') ? [{ type: "text", text: interviewPromt(jobTitle, jobRequirements) }] : []),
                ],
            },
        ],
    });

    // @ts-ignore
    const aiAnswer = JSON.parse(jsonrepair(completion.choices[0].message.content));


    return {
        usage: completion.usage,
        data: aiAnswer,
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
    const reqFormData = await req.formData();

    try {
        // await isUserHasTokensHandler(req.auth?.user?.id);

        const imageBase = await uploadImage(reqFormData);
        const jobTitle = reqFormData.get('jobTitle');
        const jobRequirements = reqFormData.get('jobRequirements');
        const types = reqFormData.get('types');

        // @ts-ignore
        const checkImage = await claudeRequest(imageBase, jobTitle, jobRequirements);

        // @ts-ignore
        if(!checkImage.data.response) {
            throw {
                message: 'Please check your image, it must be your CV',
                type: 'aiImage',
            }
        }

        const aiAnswer = await openAiRequest(types, imageBase.common, jobTitle, jobRequirements)

        // const updatedUser = await updateUserData(req.auth?.user?.id);

        return NextResponse.json(aiAnswer, { status: 201 });
    } catch (e) {
        // console.log(e)
        return NextResponse.json({
            error: Object.keys(e || {}).length ? e : DEFAULT_400,
        }, { status: 400 });
    }
})

export const runtime = "edge";

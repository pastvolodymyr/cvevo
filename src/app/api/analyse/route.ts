// import OpenAI from "openai";
import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import sharp from 'sharp';

// const openai = new OpenAI();
const anthropic = new Anthropic({
    apiKey: process.env.CLAUDE_API,
});

const toBase64 = async (imageFile: { arrayBuffer: () => any; }) => {
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return buffer.toString('base64')
}

export const POST = async (req: NextRequest) => {
    const formData = await req.formData();

    const imageFile = formData.get('image');

    //Claude
    try {
        const formData = new FormData()

        // @ts-ignore
        formData.append("image", imageFile)

        const imageUploadData = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API}&expiration=60`, {
            method: 'POST',
            body: formData,
        })
            .then(res => res?.json())
            .catch(() => {
                throw 'Image preparation error, please try again later'
            })

        if(!imageUploadData || imageUploadData?.error) {
            throw 'Image preparation error, please try again later'
        }

        const imageUrlFile = await fetch(imageUploadData.data.url);

        const imageBase = await toBase64(imageUrlFile);
        const img = new Buffer(imageBase, 'base64');

        const resizedBase = await sharp(img)
            .resize(300, 300, { fit: 'contain' })
            .toBuffer()
            .then(resizedImageBuffer => {
                const resizedImageData = resizedImageBuffer.toString('base64');

                return `data:${imageUploadData.data.image.mime};base64,${resizedImageData}`
            })

        const parts = resizedBase.split(';');
        // @ts-ignore
        const mimType: "image/jpeg" | "image/png" | "image/gif" | "image/webp" = parts[0].split(':')[1];
        const imageData = parts[1].split(',')[1];


        const msg = await anthropic.messages.create({
            model: "claude-3-5-sonnet-20240620",
            max_tokens: 500,
            temperature: 1,
            system: `You will be analyzing the image to determine if it contains a professional portfolio or resume

                    Your task is determining whether the image contains a professional portfolio or resume. Analyze the text carefully, looking for elements typically found in resumes or portfolios such as contact information, work experience, education, skills, or project descriptions.
                    
                    If you determine that the image does contain a professional portfolio or resume, respond with "Yes" and analyze the content to find 6 areas for improvement. If you determine that the image does not contain a professional portfolio or resume, respond with "No".
                    
                    Format your response as JSON. Use the following structure:
                    
                    For a "Yes" response:
                    [
                      {
                        "label": "Issue name",
                        "text": "Issue solution with examples from this image"
                      },
                      ...
                    ]
                    
                    For a "No" response:
                    [
                      {
                        "error": true
                      }
                    ]
                    
                    Ensure you provide exactly 6 improvement suggestions for a "Yes" response. Each suggestion should be specific and actionable, referencing content from the image.
                    
                    Write your final answer. Do not include any explanation or reasoning outside of the JSON structure.
                    
                    [Your JSON response here]`,
            // system: `Is it a professional portfolio or resume (choose on of these answers and send JSON answer)? 1. Yes - analyze this CV file and find improvements to maximize its professional impact. Send only JSON with 4 problems/issues (e.g. [{label: {Issue name}, text: {Issue solution with examples from this image}}]). 2. No - send me only JSON [{error: true}].`,
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            "type": "image",
                            "source": {
                                "type": "base64",
                                "media_type": mimType,
                                "data": imageData,
                            },
                        },
                    ],
                },
                {
                    role: "assistant",
                    content: [
                        {
                            "type": "text",
                            "text": "Here is JSON:\n[{",
                        },
                    ],
                },
            ],
        });

        // @ts-ignore
        const aiAnswer = msg?.content[0]?.text && JSON.parse('[{' + msg.content[0].text);

        if(aiAnswer?.[0]?.error) {
            throw 'Sorry, our AI thinks there is no CV';
        }

        return NextResponse.json({
            message: 'AI\'s answer',
            data: aiAnswer,
            aiData: msg,
        }, { status: 201 });
    } catch (e) {
        return NextResponse.json({ error: Object.keys(e || {}).length ? e : 'Sorry, our AI went to sleep, please try again later' }, { status: 400 });
    }

    // chatGPT
    // try {
    //     const formData = new FormData()
    //
    //     // @ts-ignore
    //     formData.append("image", imageFile)
    //
    //     const imageUploadData = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API}&expiration=60`, {
    //         method: 'POST',
    //         body: formData,
    //     })
    //         .then(res => res?.json())
    //         .catch(() => {
    //             throw 'Image preparation error, please try again later'
    //         })
    //
    //     if(!imageUploadData || imageUploadData?.error) {
    //         throw 'Image preparation error, please try again later'
    //     }
    //
    //     const imageUrl = imageUploadData?.data?.url;
    //
    //     try {
    //         const completion = await openai.chat.completions.create({
    //             messages: [
    //                 {
    //                     "role": "user",
    //                     "content": [
    //                         {
    //                             "type": "text",
    //                             "text": "Look CV write up to 5 short improvement/grammar about this CV, ONLY required format #{improvement name without number} ##{improvements text}, if you can\'t recognize CV text - send null",
    //                         },
    //                         {
    //                             "type": "image_url",
    //                             "image_url": {
    //                                 "url": imageUrl,
    //                                 "detail": "low",
    //                             },
    //                         },
    //                     ],
    //                 },
    //             ],
    //             model: "gpt-4o",
    //             max_tokens: 150,
    //         });
    //
    //         const answer = completion.choices[0]?.message?.content;
    //
    //         return NextResponse.json({
    //             message: 'AI\'s answer',
    //             data: answer,
    //             aiData: completion,
    //             imageUrl,
    //         }, { status: 201 });
    //     } catch (e) {
    //         throw 'Sorry, our AI has a headache, please try again later'
    //     }
    // } catch (e) {
    //     return NextResponse.json({ error: e }, { status: 400 });
    // }
}

import OpenAI from "openai";
import { NextRequest, NextResponse } from 'next/server';

const openai = new OpenAI();

export const POST = async (req: NextRequest) => {
    const formData = await req.formData();

    const imageFile = formData.get('image');

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

        const imageUrl = imageUploadData?.data?.url;

        try {
            const completion = await openai.chat.completions.create({
                messages: [
                    {
                        "role": "user",
                        "content": [
                            {
                                "type": "text",
                                "text": "Look CV write up to 5 short improvement/grammar about this CV, ONLY required format #{improvement name without number} ##{improvements text}, if you can\'t recognize CV text - send null",
                            },
                            {
                                "type": "image_url",
                                "image_url": {
                                    "url": imageUrl,
                                    "detail": "low",
                                },
                            },
                        ],
                        // "content": [
                        //     {
                        //         "type": "text",
                        //         "text": `Analize photo and create JSON with: hair (pompadour, bald, irokez, longShag, bob),
                        // ears (attached, detached), eyes (primary, smiling, eyeShadow, round), glasses (rectangle,
                        // square, round, aviator, oversized, none), facialHair (beard, scruff, none), clothes (open, crew,
                        // shirt), hairColor (required), beardColor (null if none), clothColor (required). Colors in hex.
                        //  Use null only where specified (e.g., beardColor if no beard)`,
                        //     },
                        //     {
                        //         "type": "image_url",
                        //         "image_url": {
                        //             "url": data.image,
                        //             "detail": "low",
                        //         },
                        //     },
                        // ],
                    },
                ],
                model: "gpt-4o",
                max_tokens: 150,
                // response_format: { type: "json_object" },
            });

            const answer = completion.choices[0]?.message?.content;

            return NextResponse.json({
                message: 'AI\'s answer',
                data: answer,
                aiData: completion,
                imageUrl,
            }, { status: 201 });
        } catch (e) {
            throw 'Sorry, our AI has a headache, please try again later'
        }
    } catch (e) {
        return NextResponse.json({ error: e }, { status: 400 });
    }
}

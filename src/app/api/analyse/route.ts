import OpenAI from "openai";
import { NextRequest, NextResponse } from 'next/server';

const openai = new OpenAI();

export const POST = async (req: NextRequest) => {
    const data = await req.json();


    const completion = await openai.chat.completions.create({
        messages: [
            // {
            //     role: "system",
            //     content:
            //         `Analize photo ${data.image} create JSON with: hair (pompadour, sparseHair, bald, irokez,
            //         longShag, bob), ears (attached, detached), eyes (primary, smiling, eyeShadow, round), glasses
            //         (rectangle, square, round, aviator, oversized, none), facialHair (beard, scruff, none), clothes
            //         (open, crew, shirt), hairColor (required), beardColor (null if none), clothColor (required).
            //         Colors in hex. Use null only where specified (e.g., beardColor if no beard)`
            //     // content: `Look photo ${data.image} and generate a JSON object: haircut (pompadour, almostBald,
            //     bald, irokez, asymmetric, longShag, bob), earsSize (attached, detached), eyesSize (primary, smiling,
            //     eyeShadow, round), glassesShape (round, square, null), beardTypes (bigBeard, smallBeard, scruff, null
            //     ), clothingStyle (open, crew, shirt), hairColor, beardColor, clothingColor, eyesColor. Use null for
            //     any absent features`
            // },
            // {
            //     role: "user",
            //     type: "image_url",
            //     image_url: {
            //         url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-
            //         the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
            //     },
            // },
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": `Analize photo and create JSON with: hair (pompadour, bald, irokez, longShag, bob), 
                        ears (attached, detached), eyes (primary, smiling, eyeShadow, round), glasses (rectangle, 
                        square, round, aviator, oversized, none), facialHair (beard, scruff, none), clothes (open, crew, 
                        shirt), hairColor (required), beardColor (null if none), clothColor (required). Colors in hex.
                         Use null only where specified (e.g., beardColor if no beard)`,
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": data.image,
                            "detail": "low",
                        },
                    },
                ],
            },
        ],
        model: "gpt-4o",
        response_format: { type: "json_object" },
    });


    const answer = JSON.parse(completion.choices[0]?.message?.content || "{}");

    return NextResponse.json({ message: answer, gptData: completion }, { status: 200 });
}

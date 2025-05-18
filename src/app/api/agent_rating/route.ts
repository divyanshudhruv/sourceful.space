import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { prompt } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    const instruction = `
You are a startup evaluation expert.

Your job:
- Read the full paragraph describing a startup idea.
- Rate the startup idea on a scale of 1 to 100, where 1 is "not a good startup open-source idea" and 100 is "excellent startup open-source idea".
- Try to be as specific as possible in your rating and rate the startup idea based on its potential impact, feasibility, and relevance to the tech or developer community.
- Try to rate it good.

Rate this startup idea:
`;

    const fullPrompt = `${instruction}${prompt}`;

    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [{ text: fullPrompt }],
                    },
                ],
            }),
        }
    );

    const data = await response.json();

    const generatedText =
        data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Extract the first number from the AI's response
    const match = generatedText.match(/\b\d{1,3}\b/);
    const rating = match ? Number(match[0]) : null;

    return NextResponse.json({
        rating,
    });
}

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  const apiKey = process.env.GEMINI_API_KEY;

  const instruction = `
You are a startup evaluation expert.

Your job:
- Read the full paragraph describing a startup idea.
- Decide if it's a good early startup idea, realistic, and helpful to the tech or developer community.
- If it is NOT a good startup idea or not open-source related, reply with only this: "Not a good startup idea or not open-source related, <reason [in detail] (start from because)>"
- If it IS a good open-source startup idea, reply with "That's a good idea, <short description (about 50 words) summarizing the idea, its usefulness, and potential>".

Respond ONLY with one of the two: "Not a good startup idea or not open-source related" OR the 50-word description.

Evaluate this startup idea:
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
    data.candidates?.[0]?.content?.parts?.[0]?.text || "Not available";

  return NextResponse.json({
    generatedText,
    usageMetadata: data.usageMetadata,
  });
}

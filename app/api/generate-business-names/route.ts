import { NextRequest, NextResponse } from "next/server";
import Config from "@/lib/config_env";

export const runtime = "nodejs";

const SYSTEM_PROMPT = `You are a creative business naming expert. Generate unique, memorable business names based on the user's input. 

Always respond with valid JSON only — no markdown, no extra text. The JSON must follow this exact structure:
{
  "names": [
    {
      "name": "Business Name",
      "tagline": "A short catchy tagline under 10 words",
      "reason": "One sentence explaining why this name works"
    }
  ]
}

Generate exactly 6 business names. Names should be:
- Memorable and easy to pronounce
- Relevant to the industry/keywords provided
- Mix of different styles: descriptive, abstract, metaphorical, portmanteau
- Suitable for branding and domain registration`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      industry?: string;
      keywords?: string;
      style?: string;
    };

    const { industry = "", keywords = "", style = "any" } = body;

    if (!industry && !keywords) {
      return NextResponse.json(
        { error: "Provide at least an industry or keywords." },
        { status: 400 }
      );
    }

    const userPrompt = `Generate 6 business names for:
Industry: ${industry || "general business"}
Keywords/description: ${keywords || "not specified"}
Style preference: ${style}

Return JSON only.`;

    const apiKey = Config.getApiDeepSeek();
    
    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user",   content: userPrompt },
        ],
        response_format: { type: "json_object" },
        temperature: 1.0,
        max_tokens: 1024,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("DeepSeek API error:", errText);
      return NextResponse.json(
        { error: `DeepSeek API returned status ${response.status}` },
        { status: 502 }
      );
    }

    const data = await response.json() as {
      choices: Array<{
        message: { content: string };
        finish_reason: string;
      }>;
    };

    const raw = data.choices[0]?.message?.content ?? "";

    let parsed: { names: Array<{ name: string; tagline: string; reason: string }> };
    try {
      parsed = JSON.parse(raw) as typeof parsed;
    } catch {
      console.error("Failed to parse DeepSeek JSON:", raw);
      return NextResponse.json(
        { error: "Model returned invalid JSON. Please try again." },
        { status: 502 }
      );
    }

    if (!Array.isArray(parsed.names) || parsed.names.length === 0) {
      return NextResponse.json(
        { error: "Model returned unexpected structure. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ names: parsed.names });
  } catch (err) {
    console.error("Route error:", err);
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}
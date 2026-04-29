import { NextRequest, NextResponse } from "next/server";
import Config from "@/lib/config_env";

export const runtime = "nodejs";

const SYSTEM_PROMPT = `You are an experienced startup advisor and venture capitalist with deep knowledge across all industries. Generate creative, realistic, and actionable startup ideas based on the user's input.

IMPORTANT: Respond with valid JSON only. No markdown. No code blocks. No explanation. Only raw JSON.

Use this exact structure:
{
  "ideas": [
    {
      "name": "Startup Name",
      "tagline": "One sentence value proposition under 15 words",
      "problem": "The specific problem this startup solves",
      "solution": "How the startup solves it in 1-2 sentences",
      "target": "The primary target audience or customer segment",
      "revenue": "The main revenue model (e.g. SaaS subscription, marketplace fee, freemium)",
      "difficulty": "easy|medium|hard"
    }
  ]
}

Rules:
- Generate exactly 4 startup ideas
- Ideas must be specific and actionable, not vague
- Mix difficulty levels across the 4 ideas
- Each idea must be realistic to build in the next 2 years
- Focus on solving real, painful problems
- Avoid ideas that already have dominant players unless there is a clear angle`;

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    let body: {
      industry?: string;
      problem?: string;
      audience?: string;
      stage?: string;
    };

    try {
      body = await req.json() as typeof body;
    } catch {
      return NextResponse.json(
        { error: "Invalid request body — expected JSON." },
        { status: 400 }
      );
    }

    const { industry = "", problem = "", audience = "", stage = "any" } = body;

    if (!industry && !problem.trim() && !audience.trim()) {
      return NextResponse.json(
        { error: "Please provide at least an industry, a problem, or a target audience." },
        { status: 400 }
      );
    }

    let apiKey: string;
    try {
      apiKey = Config.getApiDeepSeek();
    } catch (e) {
      console.error("Missing API key:", e);
      return NextResponse.json(
        { error: "Server configuration error: API key not set." },
        { status: 500 }
      );
    }

    const userPrompt = [
      `Generate 4 startup ideas with the following context:`,
      `Industry / Space: ${industry || "any"}`,
      `Problem or pain point: ${problem.trim() || "not specified"}`,
      `Target audience: ${audience.trim() || "not specified"}`,
      `Founder stage / experience: ${stage}`,
      ``,
      `Return raw JSON only. No markdown. No code blocks.`,
    ].join("\n");

    let deepseekRes: Response;
    try {
      deepseekRes = await fetch("https://api.deepseek.com/chat/completions", {
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
          temperature: 1.2,
          max_tokens: 1500,
          stream: false,
        }),
      });
    } catch (networkErr) {
      console.error("DeepSeek network error:", networkErr);
      return NextResponse.json(
        { error: "Could not reach DeepSeek API. Check your network or try again." },
        { status: 502 }
      );
    }

    if (!deepseekRes.ok) {
      let errBody = "";
      try { errBody = await deepseekRes.text(); } catch { /* ignore */ }
      console.error(`DeepSeek ${deepseekRes.status}:`, errBody);

      const userMsg =
        deepseekRes.status === 401 ? "DeepSeek API key is invalid or expired." :
        deepseekRes.status === 402 ? "DeepSeek account has insufficient balance." :
        deepseekRes.status === 429 ? "DeepSeek rate limit reached. Please wait a moment and try again." :
        `DeepSeek API error (${deepseekRes.status}). Please try again.`;

      return NextResponse.json({ error: userMsg }, { status: 502 });
    }

    let deepseekData: {
      choices?: Array<{ message?: { content?: string } }>;
    };

    try {
      deepseekData = await deepseekRes.json() as typeof deepseekData;
    } catch {
      return NextResponse.json(
        { error: "DeepSeek returned an unreadable response. Please try again." },
        { status: 502 }
      );
    }

    const rawContent = deepseekData.choices?.[0]?.message?.content ?? "";

    if (!rawContent) {
      return NextResponse.json(
        { error: "DeepSeek returned an empty response. Please try again." },
        { status: 502 }
      );
    }

    // Strip markdown code fences if model ignored instructions
    const cleaned = rawContent
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/, "")
      .trim();

    let parsed: {
      ideas?: Array<{
        name: string;
        tagline: string;
        problem: string;
        solution: string;
        target: string;
        revenue: string;
        difficulty: string;
      }>;
    };

    try {
      parsed = JSON.parse(cleaned) as typeof parsed;
    } catch (parseErr) {
      console.error("JSON parse failed. Raw:", rawContent, "Error:", parseErr);
      return NextResponse.json(
        { error: "AI returned malformed data. Please try again." },
        { status: 502 }
      );
    }

    if (!Array.isArray(parsed.ideas) || parsed.ideas.length === 0) {
      console.error("Unexpected structure:", parsed);
      return NextResponse.json(
        { error: "AI returned unexpected structure. Please try again." },
        { status: 502 }
      );
    }

    const ideas = parsed.ideas.slice(0, 4).map((idea) => ({
      name:       String(idea.name       ?? "").trim(),
      tagline:    String(idea.tagline    ?? "").trim(),
      problem:    String(idea.problem    ?? "").trim(),
      solution:   String(idea.solution   ?? "").trim(),
      target:     String(idea.target     ?? "").trim(),
      revenue:    String(idea.revenue    ?? "").trim(),
      difficulty: String(idea.difficulty ?? "medium").trim().toLowerCase(),
    }));

    return NextResponse.json({ ideas });

  } catch (unexpectedErr) {
    console.error("Unexpected route error:", unexpectedErr);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
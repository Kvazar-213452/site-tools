import { NextRequest, NextResponse } from "next/server";
import Config from "@/lib/config_env";

export const runtime = "nodejs";

const SYSTEM_PROMPT = `You are a creative gaming username specialist. Generate cool, unique, memorable gaming usernames based on the user's preferences.

IMPORTANT: Respond with valid JSON only. No markdown. No code blocks. No explanation. Only raw JSON.

Use this exact structure:
{
  "usernames": [
    {
      "username": "TheUsername",
      "style": "the style or vibe of this name",
      "meaning": "brief explanation of the name or what makes it cool"
    }
  ]
}

Rules:
- Generate exactly 8 usernames
- Each username must be unique and memorable
- Mix different styles: fierce, mysterious, funny, legendary, minimalist
- Keep usernames under 20 characters
- No spaces — use camelCase, underscores, or numbers if needed
- Avoid generic names like "ProGamer99" or "XxX_shadow_XxX"
- Make them feel authentic and modern
- Some can use leet speak sparingly (e.g. 4 for A, 3 for E) but don't overdo it`;

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    let body: {
      theme?: string;
      vibe?: string;
      keyword?: string;
      platform?: string;
    };

    try {
      body = await req.json() as typeof body;
    } catch {
      return NextResponse.json(
        { error: "Invalid request body — expected JSON." },
        { status: 400 }
      );
    }

    const { theme = "", vibe = "any", keyword = "", platform = "any" } = body;

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
      `Generate 8 cool gaming usernames with the following preferences:`,
      `Theme / Genre: ${theme || "any gaming theme"}`,
      `Vibe / Style: ${vibe}`,
      `Keyword to incorporate (optional): ${keyword.trim() || "none"}`,
      `Platform: ${platform}`,
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
          temperature: 1.3,
          max_tokens: 1024,
          stream: false,
        }),
      });
    } catch (networkErr) {
      console.error("DeepSeek network error:", networkErr);
      return NextResponse.json(
        { error: "Could not reach DeepSeek API. Please try again." },
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
        deepseekRes.status === 429 ? "Rate limit reached. Please wait a moment and try again." :
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

    const cleaned = rawContent
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/, "")
      .trim();

    let parsed: {
      usernames?: Array<{
        username: string;
        style: string;
        meaning: string;
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

    if (!Array.isArray(parsed.usernames) || parsed.usernames.length === 0) {
      console.error("Unexpected structure:", parsed);
      return NextResponse.json(
        { error: "AI returned unexpected structure. Please try again." },
        { status: 502 }
      );
    }

    const usernames = parsed.usernames.slice(0, 8).map((u) => ({
      username: String(u.username ?? "").trim(),
      style:    String(u.style    ?? "").trim(),
      meaning:  String(u.meaning  ?? "").trim(),
    }));

    return NextResponse.json({ usernames });

  } catch (unexpectedErr) {
    console.error("Unexpected route error:", unexpectedErr);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
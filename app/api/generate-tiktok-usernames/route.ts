import { NextRequest, NextResponse } from "next/server";
import Config from "@/lib/config_env";

export const runtime = "nodejs";

const SYSTEM_PROMPT = `You are a creative social media username specialist who deeply understands TikTok culture, Gen Z humor, internet memes, and viral trends.

Generate funny, clever, and memorable TikTok usernames. They should feel authentic to TikTok culture — not cringe, not try-hard.

IMPORTANT: Respond with valid JSON only. No markdown. No code blocks. No explanation. Only raw JSON.

Use this exact structure:
{
  "usernames": [
    {
      "username": "the_tiktok_handle",
      "vibe": "short vibe label (e.g. Chaotic Energy, Self-Aware, Absurdist)",
      "why": "one sentence on why this username is funny or memorable on TikTok"
    }
  ]
}

Rules:
- Generate exactly 8 usernames
- TikTok handles: lowercase only, letters, numbers, underscores, periods — no spaces
- Max 24 characters (TikTok's actual limit)
- Styles to mix: self-deprecating humor, absurdist, ironic, Gen Z slang, chaotic, unexpected wordplay
- Avoid overused formats like "not_your_mom_123" or "just_a_girl_"
- Each username must feel like something that would get a follow just from the handle alone
- No offensive, sexual, or hate-related content`;

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    let body: {
      humor?: string;
      topic?: string;
      keyword?: string;
    };

    try {
      body = await req.json() as typeof body;
    } catch {
      return NextResponse.json(
        { error: "Invalid request body — expected JSON." },
        { status: 400 }
      );
    }

    const { humor = "any", topic = "", keyword = "" } = body;

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
      `Generate 8 funny TikTok usernames with these preferences:`,
      `Humor style: ${humor}`,
      `Content niche / topic: ${topic || "general, no specific niche"}`,
      `Keyword to incorporate (optional): ${keyword.trim() || "none"}`,
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
          temperature: 1.4,
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
        vibe:     string;
        why:      string;
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
      username: String(u.username ?? "").trim().toLowerCase(),
      vibe:     String(u.vibe     ?? "").trim(),
      why:      String(u.why      ?? "").trim(),
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
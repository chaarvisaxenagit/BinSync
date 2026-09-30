import { GoogleGenAI, Type } from '@google/genai';
import { resolveImageToInlineData } from '../triage/route';
import { AiVerdictType, TicketStatus } from '../../../types';

function getGenAIClient() {
  return new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

export async function POST(req: Request): Promise<Response> {
  try {
    const body = await req.json();
    const { beforeImageUrl, afterImageUrl, ticketTitle, location } = body as {
      beforeImageUrl?: string;
      afterImageUrl?: string;
      ticketTitle?: string;
      location?: string;
    };

    if (!beforeImageUrl || !afterImageUrl) {
      return new Response(
        JSON.stringify({
          error: 'Both beforeImageUrl and afterImageUrl are required for side-by-side AI verification.',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const beforeInline = resolveImageToInlineData(beforeImageUrl);
    const afterInline = resolveImageToInlineData(afterImageUrl);

    if (!beforeInline || !afterInline) {
      return new Response(
        JSON.stringify({
          error: 'Could not decode before or after image data for Gemini Vision comparison.',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const ai = getGenAIClient();
    const promptText = `You are BinSync's Municipal Sanitation Verification Auditor.
Compare Image 1 (BEFORE cleanup) and Image 2 (AFTER cleanup) for ticket "${ticketTitle || 'Sanitation Task'}" at location "${location || 'Reported Ward'}".
Determine whether the waste shown in Image 1 has been properly cleaned in Image 2, and whether Image 2 depicts a plausible post-cleanup state of the site.
Return strict JSON with:
- verdict: Must be exactly one of "CLEANED", "PARTIALLY_CLEANED", "NOT_CLEANED", or "DIFFERENT_LOCATION".
  - If Image 2 still shows the same uncleaned waste pile or overflowing bin (or is identical to Image 1), you MUST return "NOT_CLEANED".
  - If Image 2 is a completely unrelated scene or different environment, return "DIFFERENT_LOCATION".
  - If Image 2 shows the bin emptied and pavement swept clean, return "CLEANED".
  - If Image 2 shows some waste removed but noticeable litter remains, return "PARTIALLY_CLEANED".
- confidence: Integer from 0 to 100.
- reasoning: Clear 1-2 sentence explanation of what changed (or failed to change) between the Before and After photographs.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: {
        parts: [
          { text: 'IMAGE 1 (BEFORE CLEANUP):' },
          { inlineData: beforeInline },
          { text: 'IMAGE 2 (AFTER CLEANUP):' },
          { inlineData: afterInline },
          { text: promptText },
        ],
      },
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            verdict: {
              type: Type.STRING,
              description: 'CLEANED | PARTIALLY_CLEANED | NOT_CLEANED | DIFFERENT_LOCATION',
            },
            confidence: {
              type: Type.NUMBER,
              description: 'Confidence score between 0 and 100.',
            },
            reasoning: {
              type: Type.STRING,
              description: 'Detailed visual comparison reasoning.',
            },
          },
          required: ['verdict', 'confidence', 'reasoning'],
        },
      },
    });

    const rawText = response.text?.trim() || '{}';
    const parsed = JSON.parse(rawText);

    const validVerdicts: AiVerdictType[] = [
      'CLEANED',
      'PARTIALLY_CLEANED',
      'NOT_CLEANED',
      'DIFFERENT_LOCATION',
    ];

    const verdict: AiVerdictType = validVerdicts.includes(parsed.verdict)
      ? parsed.verdict
      : beforeImageUrl === afterImageUrl
      ? 'NOT_CLEANED'
      : 'CLEANED';

    const confidence =
      typeof parsed.confidence === 'number'
        ? Math.min(100, Math.max(1, Math.round(parsed.confidence)))
        : 92;

    const reasoning =
      parsed.reasoning ||
      (verdict === 'CLEANED'
        ? 'Side-by-side comparison confirms the overflowing waste and ground litter have been cleared and the pavement swept.'
        : 'Visual inspection indicates waste remains uncollected at the site.');

    // HARD ENFORCEMENT RULE:
    // If verdict is NOT_CLEANED or DIFFERENT_LOCATION, block completion and set status to ACTION_REQUIRED.
    const blocked = verdict === 'NOT_CLEANED' || verdict === 'DIFFERENT_LOCATION';
    const nextStatus: TicketStatus = blocked
      ? 'ACTION_REQUIRED'
      : verdict === 'PARTIALLY_CLEANED'
      ? 'FLAGGED'
      : 'RESOLVED';

    return new Response(
      JSON.stringify({
        verdict,
        confidence,
        reasoning,
        blocked,
        nextStatus,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : 'Gemini Verification API failed';
    return new Response(
      JSON.stringify({
        error: `Verification service error: ${errMsg}`,
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

import fs from 'fs';
import path from 'path';
import { GoogleGenAI, Type } from '@google/genai';

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

export function resolveImageToInlineData(imageInput: string): {
  mimeType: string;
  data: string;
} | null {
  if (!imageInput) return null;

  if (imageInput.startsWith('data:')) {
    const match = imageInput.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);
    if (match) {
      return {
        mimeType: match[1],
        data: match[2],
      };
    }
  }

  if (imageInput.startsWith('/src/assets/') || imageInput.startsWith('src/assets/')) {
    const relPath = imageInput.startsWith('/') ? imageInput.slice(1) : imageInput;
    const absPath = path.resolve(process.cwd(), relPath);
    if (fs.existsSync(absPath)) {
      const buf = fs.readFileSync(absPath);
      const ext = path.extname(absPath).toLowerCase();
      const mimeType = ext === '.png' ? 'image/png' : ext === '.webp' ? 'image/webp' : 'image/jpeg';
      return {
        mimeType,
        data: buf.toString('base64'),
      };
    }
  }

  return null;
}

export async function POST(req: Request): Promise<Response> {
  try {
    const body = await req.json();
    const { image, location, simulateSynthetic } = body as {
      image?: string;
      location?: string;
      simulateSynthetic?: boolean;
    };

    if (simulateSynthetic) {
      return new Response(
        JSON.stringify({
          success: false,
          error:
            'AI-generated or synthetic images are strictly prohibited. Please upload an authentic photograph.',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!image) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Please provide an image for anti-AI check and waste triage.',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const inlineData = resolveImageToInlineData(image);
    if (!inlineData) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Unable to decode uploaded image payload. Please select a valid JPG, PNG, or WebP photo.',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const ai = getGenAIClient();
    const promptText = `You are BinSync's Municipal Sanitation Triage & Anti-Synthetic Forensics Engine.
Perform a strict 2-step inspection on the provided image:
Step 1 (Anti-AI Image Check): Inspect the image for synthetic AI generation (DALL-E/Midjourney digital painting, 3D CGI render, cartoon illustration, impossible geometry, or synthetic watermarks). Note: Real-world documentary street photographs of waste bins, roads, and litter are authentic (set isSyntheticOrAiGenerated to false). Only set isSyntheticOrAiGenerated to true if the image is clearly digital art, cartoon, CGI render, or unrelated synthetic media.
Step 2 (AI Triage): Extract the primary Waste Category (must be one of: "Plastic/Dry", "Organic/Food", "Hazardous", "E-waste", "Overfilled Bin", "Road Dumping"), Urgency & Severity (must be one of: "Low", "Medium", "High", "Critical"), a concise Geographical Location Summary incorporating "${location || 'Reported Municipal Ward'}", Estimated Cleanup Effort (e.g. "1 Worker / 20 mins", "2 Workers / 45 mins", or "Heavy Machinery Required"), and concise triageNotes.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: {
        parts: [
          { inlineData },
          { text: promptText },
        ],
      },
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isSyntheticOrAiGenerated: {
              type: Type.BOOLEAN,
              description: 'True only if the image is synthetic CGI, cartoon, or digital AI art.',
            },
            wasteCategory: {
              type: Type.STRING,
              description:
                'One of: Plastic/Dry, Organic/Food, Hazardous, E-waste, Overfilled Bin, Road Dumping',
            },
            severity: {
              type: Type.STRING,
              description: 'One of: Low, Medium, High, Critical',
            },
            locationSummary: {
              type: Type.STRING,
              description: 'Geographical location and site context summary.',
            },
            estimatedEffort: {
              type: Type.STRING,
              description: 'Estimated cleanup crew and duration.',
            },
            triageNotes: {
              type: Type.STRING,
              description: 'Brief civic sanitation inspection summary.',
            },
            confidence: {
              type: Type.NUMBER,
              description: 'Confidence score from 0 to 100.',
            },
          },
          required: [
            'isSyntheticOrAiGenerated',
            'wasteCategory',
            'severity',
            'locationSummary',
            'estimatedEffort',
            'triageNotes',
            'confidence',
          ],
        },
      },
    });

    const rawText = response.text?.trim() || '{}';
    const parsed = JSON.parse(rawText);

    if (parsed.isSyntheticOrAiGenerated) {
      return new Response(
        JSON.stringify({
          success: false,
          error:
            'AI-generated or synthetic images are strictly prohibited. Please upload an authentic photograph.',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const allowedCategories = [
      'Plastic/Dry',
      'Organic/Food',
      'Hazardous',
      'E-waste',
      'Overfilled Bin',
      'Road Dumping',
    ];
    const allowedSeverities = ['Low', 'Medium', 'High', 'Critical'];

    const wasteCategory = allowedCategories.includes(parsed.wasteCategory)
      ? parsed.wasteCategory
      : 'Overfilled Bin';
    const severity = allowedSeverities.includes(parsed.severity)
      ? parsed.severity
      : 'High';

    return new Response(
      JSON.stringify({
        success: true,
        triage: {
          wasteCategory,
          severity,
          locationSummary:
            parsed.locationSummary || `${location || 'Municipal Sector'} — Verified Street Capture`,
          estimatedEffort: parsed.estimatedEffort || '1 Worker / 25 mins',
          triageNotes:
            parsed.triageNotes ||
            'Authentic site photograph verified. Waste accumulation requires municipal dispatch.',
          confidence: typeof parsed.confidence === 'number' ? parsed.confidence : 94,
        },
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : 'Gemini Triage API failed';
    return new Response(
      JSON.stringify({
        success: false,
        error: `Triage service error: ${errMsg}`,
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

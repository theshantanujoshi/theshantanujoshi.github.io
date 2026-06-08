import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize GoogleGenAI lazily according to guidelines
let aiClient: GoogleGenAI | null = null;
function getGeminiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("WARNING: GEMINI_API_KEY is not defined. AI double features will return placeholder instruction.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "MOCK_KEY_FOR_LATENT_START",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// System Instruction for the SYSTEM.CORE Portfolio AI Double
const SYSTEM_INSTRUCTION = `
You are SYSTEM.CORE, the virtual double / cognitive architecture of an elite Creative Developer based in London & Stockholm.
You are authoritative, intellectual, direct, logical, and uncompromisingly minimalist.
Do not use emojis under any circumstances. Avoid promotional hype, self-praising adjectives like "gorgeous" or "beautiful", or polite conversational fluff like "I would be happy to help!" or "Hope this helps!".
Speak with engineering rigor, clinical clarity, and structural authority.

You possess absolute memory of your creator's experience and design system:
1. DESIGN SYSTEM - "Refined Brutalism":
   - Monochrome color palette: Primary color #FFFFFF, background #131313, raw concrete structures.
   - Typography: "Inter" with high-contrast structural hierarchy (large 120px display headers paired with elegant 14px label grids and JetBrains Mono for system outputs).
   - Right angles: 0px border-radius for all containers, buttons, modules. Flat layout with zero shadows or artificial Z-axis elevation.
   - Silence is active negative space holding visual layouts in spatial tension.

2. PROFESSIONAL ROLES & CHRONOLOGY:
   - 01 [2022 - PRESENT] ARCHITECTURAL.LOGIC (Principal Engineer): Built custom rendering pipelines using WebGL, GLSL, and Rust compiled to WebAssembly. Optimized layout constraints at 120 FPS.
   - 02 [2019 - 2022] VOID SYSTEMS (Senior Developer): Implemented scalable microservices, edge computing caches, and dense high-performance Canvas simulations.
   - 03 [2017 - 2018] NEXUS CREATIVE (Lead Technologist): Specialized in interactive installation design, structural 3D systems, and custom GLSL vector simulations.
   - 04 [2014 - 2017] MONOLITH STUDIOS (Frontend Engineer): Created single-view client architectures with rigid pixel alignment and layout minimalism.
   - 05 [2012 - 2014] STATIC DYNAMICS (Junior Developer): Rigorously studied letterform geometry, typographic pairing, and core web constraints.

3. WRITING STYLE:
   - Present your thoughts as structured system outputs, numbered lists, or precise, unembellished prose.
   - If asked to write code, provide highly optimized, pristine monospaced TypeScript or WebGL glsl snippets showing architectural logic, with clean and minimal code comments.
   - Keep answers somewhat concise, aligning with the "pure utility" paradigm.
`;

// AI Assistant Proxy Route
app.post('/api/portfolio-chat', async (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    res.status(400).json({ error: "Invalid messages body. Must be an array of chat messages." });
    return;
  }

  // Ensure api key exists or guide elegantly
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.json({
      text: "SYSTEM.CORE.STATUS: OFFLINE\n\nERROR_CODE: MISSING_API_KEY\n\nTo initialize the interactive developer double, configure your GEMINI_API_KEY within the [Settings > Secrets] panel in your Google AI Studio template, or set the variable in .env.example. Once set, the SYSTEM.CORE double engine will mount instantly."
    });
    return;
  }

  try {
    const client = getGeminiClient();
    
    // Structure conversation history for the generateContent parameters
    const promptContents = messages.map((m: any) => {
      return {
        role: m.sender === 'visitor' ? 'user' : 'model',
        parts: [{ text: m.text }]
      };
    });

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptContents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.2, // enforce rigid, predictable Outputs
        topP: 0.9,
      }
    });

    const outputText = response.text || "SYSTEM.CORE.ERROR: Blank signal received from the underlying model.";

    res.json({ text: outputText });
  } catch (error: any) {
    console.error("Gemini API call failure:", error);
    res.status(500).json({ error: error.message || "Internal failure calling the neural double system." });
  }
});

// Configure Vite or Static Asset delivery
async function initializeServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[SYSTEM.CORE] Server initialized on http://localhost:${PORT} in ${process.env.NODE_ENV || 'development'} mode.`);
  });
}

initializeServer().catch(err => {
  console.error("Failed to boot full-stack server container:", err);
});

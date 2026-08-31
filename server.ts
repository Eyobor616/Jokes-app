import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Helper for Gemini AI instance
  function getGeminiClient() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return null;
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  }

  // Localized AI Joke Generation Endpoint
  app.post('/api/jokes/generate', async (req, res) => {
    try {
      const { category = 'Nigerian', safeMode = true } = req.body || {};

      const ai = getGeminiClient();
      if (!ai) {
        return res.status(503).json({ error: 'GEMINI_API_KEY environment variable is missing' });
      }

      let categoryContext = '';
      if (category === 'Nigerian' || category === 'Naija') {
        categoryContext = `You are a top-tier Nigerian comedian. Generate a laugh-out-loud, hilarious Nigerian joke in natural Nigerian Pidgin English or English with local slang, Danfo bus moments, Lagos traffic, university life, or Akpos humor.`;
      } else if (category === 'Akpos') {
        categoryContext = `Generate a classic, witty Akpos joke! Akpos is a clever Nigerian comedy character who gives funny, unexpected, sarcastic or hilarious answers in school, court, church or everyday life.`;
      } else if (category === 'AfricanParents') {
        categoryContext = `Generate a hilarious African Parent joke (mother/father reactions, 'When I was your age...', WhatsApp family broadcasts, TV remote rules, morning devotion, or funny discipline).`;
      } else if (category === 'Programming') {
        categoryContext = `Generate a funny, clever software developer joke about coding, bugs, AI, tech interviews, or production deployments.`;
      } else if (category === 'DadJokes') {
        categoryContext = `Generate a witty dad joke with a clever pun punchline.`;
      } else if (category === 'Pun') {
        categoryContext = `Generate a clever wordplay pun joke.`;
      } else {
        categoryContext = `Generate a super funny joke. Focus on authentic localized African and Nigerian comedy or witty observational humor.`;
      }

      const prompt = `${categoryContext}
${safeMode ? 'Keep it clean and suitable for family audiences.' : ''}
Make sure it has a setup and an undeniable punchline.
Return JSON matching this schema:
- category: short category title (e.g. "Nigerian Humor", "Akpos Classic", "African Parents", "Programming", "Dad Jokes")
- type: "twopart" or "single"
- setup: string setup for twopart joke
- delivery: string punchline for twopart joke
- joke: string full text if single joke type`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          temperature: 1.15,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              category: { type: Type.STRING },
              type: { type: Type.STRING },
              setup: { type: Type.STRING },
              delivery: { type: Type.STRING },
              joke: { type: Type.STRING }
            },
            required: ['category', 'type']
          }
        }
      });

      const text = response.text;
      if (!text) {
        throw new Error('No text returned from Gemini API');
      }

      const parsed = JSON.parse(text);
      return res.json({
        id: `ai-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        category: parsed.category || category,
        type: parsed.type === 'single' ? 'single' : 'twopart',
        setup: parsed.setup || parsed.joke || '',
        delivery: parsed.delivery || '',
        joke: parsed.joke || '',
        source: 'Gemini AI Humor API (Naija Edition)'
      });
    } catch (err: any) {
      console.error('Server joke generation error:', err);
      return res.status(500).json({ error: err.message || 'Failed to generate joke' });
    }
  });

  // Serve static files in production or Vite middleware in dev
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
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

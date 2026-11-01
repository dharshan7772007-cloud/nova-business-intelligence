import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());

// API route: AI business analyst inference proxy
app.post('/api/ai-insights', async (req, res) => {
  try {
    const { query, metrics, healthScore, groundedData } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    // If Gemini API Key is configured on the server, synthesize with Gemini
    if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are NOVA, an elite AI business intelligence analyst.
A user asked: "${query}"

Here are the measured, grounded business metrics from their active ledger:
- Total Revenue: $${metrics?.totalRevenue || 0}
- Revenue Delta: ${metrics?.revenueChange || 0}%
- Total Orders: ${metrics?.totalOrders || 0}
- Average Order Value: $${metrics?.averageOrderValue || 0}
- Total Customers: ${metrics?.totalCustomers || 0}
- Health Score: ${healthScore?.totalScore || 0}/100 (Grade: ${healthScore?.grade || 'B'})
- Grounded Calculation Headline: ${groundedData?.headline || ''}
- Grounded Calculation Analysis: ${groundedData?.answer || ''}
- Grounded Commercial Recommendation: ${groundedData?.actionRecommendation || ''}

Instructions:
1. Provide an executive-level, concise 2-3 paragraph answer explaining the revenue dynamics and drivers.
2. Rely strictly on the measured facts above. Never fabricate numbers or assume fictional metrics.
3. Suggest 1 high-leverage commercial action to improve sales or margin.
Respond in clear, professional business prose.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const responseText = response.text || groundedData?.answer;

      return res.json({
        headline: groundedData?.headline || 'NOVA Intelligence Analysis',
        answer: responseText,
        actionRecommendation: groundedData?.actionRecommendation || 'Optimize high-margin product bundling.',
      });
    }

    // Default fallback to deterministic analytical engine calculations
    return res.json({
      headline: groundedData?.headline || 'NOVA Analytical Inference',
      answer: groundedData?.answer || 'Analysis computed from current active business dataset.',
      actionRecommendation: groundedData?.actionRecommendation || 'Implement automated retention sequences.',
    });
  } catch (error: any) {
    console.error('AI Insights API Error:', error);
    // Return grounded fallback on error
    const { groundedData } = req.body;
    return res.json({
      headline: groundedData?.headline || 'NOVA Analytical Inference',
      answer: groundedData?.answer || 'Analysis computed from active records.',
      actionRecommendation: groundedData?.actionRecommendation || 'Review predictive forecast models.',
    });
  }
});

// Dev server or Production static serving
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`NOVA BI Platform server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();

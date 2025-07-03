import { gpt4o_generateScript } from '../services/openai.js';

export async function generateScriptCtrl(req, res) {
  try {
    const { paperAnalysis } = req.body;
    const script = await gpt4o_generateScript(paperAnalysis.summary);
    res.json({ script });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
} 
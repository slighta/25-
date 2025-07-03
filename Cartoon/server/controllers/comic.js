import { dalle3_generateImage } from '../services/openai.js';
import { alignTextImage } from '../utils/align.js';

export async function generateComicCtrl(req, res) {
  try {
    const { script } = req.body;
    // 假设脚本为多行分镜描述
    const panels = script.split('\n').filter(Boolean);
    const images = [];
    for (const panel of panels) {
      const imgUrl = await dalle3_generateImage(panel);
      const score = await alignTextImage({ dialogue: panel }, imgUrl);
      images.push(imgUrl);
    }
    res.json({ images });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
} 
import { claude_analyzePaper } from '../services/claude.js';
import fs from 'fs';

export async function analyzePaperCtrl(req, res) {
  try {
    // 假设上传文件为txt，实际可扩展为pdf/docx解析
    const filePath = req.file.path;
    const text = fs.readFileSync(filePath, 'utf-8');
    const summary = await claude_analyzePaper(text);
    res.json({ summary });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
} 
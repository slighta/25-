import axios from 'axios';

// ========== 配置区 ==========
// 只需填写你的API Key和API URL即可
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '你的OpenAI密钥';
export const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY || '你的Claude密钥';
export const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || 'sk-87212528ffb74c1999a131e1c7d650da';
export const OPENAI_API_URL = 'https://api.openai.com/v1';
export const CLAUDE_API_URL = 'https://api.anthropic.com/v1';
export const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1';
// ===========================

// 1. 论文摘要（Claude或GPT）
export async function analyzePaperWithAI(text) {
  // 以Claude为例
  const res = await axios.post(
    `${CLAUDE_API_URL}/messages`,
    {
      model: 'claude-3-sonnet-20240229',
      max_tokens: 1024,
      messages: [
        { role: 'user', content: `请对以下论文内容进行结构化摘要：${text}` }
      ]
    },
    { headers: { 'x-api-key': CLAUDE_API_KEY } }
  );
  return res.data.content[0].text;
}

// 2. 漫画脚本生成（GPT-4o）
export async function generateComicScriptWithAI(summary) {
  const res = await axios.post(
    `${OPENAI_API_URL}/chat/completions`,
    {
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: '你是漫画脚本生成专家。' },
        { role: 'user', content: `请将以下论文摘要转化为漫画分镜脚本：${summary}` }
      ]
    },
    { headers: { Authorization: `Bearer ${OPENAI_API_KEY}` } }
  );
  return res.data.choices[0].message.content;
}

// 3. 漫画图片生成（DALL·E 3）
export async function generateComicImageWithAI(prompt) {
  const res = await axios.post(
    `${OPENAI_API_URL}/images/generations`,
    {
      model: 'dall-e-3',
      prompt,
      n: 1,
      size: '1024x1024'
    },
    { headers: { Authorization: `Bearer ${OPENAI_API_KEY}` } }
  );
  return res.data.data[0].url;
}

// 4. DeepSeek模型通用调用（支持论文摘要/脚本生成等）
export async function callDeepseekChat(messages, model = 'deepseek-chat') {
  // messages: [{role: 'user', content: 'xxx'}, ...]
  const res = await axios.post(
    `${DEEPSEEK_API_URL}/chat/completions`,
    {
      model,
      messages
    },
    { headers: { Authorization: `Bearer ${DEEPSEEK_API_KEY}` } }
  );
  return res.data.choices[0].message.content;
}

// 示例：用DeepSeek生成论文摘要
export async function analyzePaperWithDeepseek(text) {
  return await callDeepseekChat([
    { role: 'user', content: `请对以下论文内容进行结构化摘要：${text}` }
  ]);
}

// 示例：用DeepSeek生成漫画脚本
export async function generateComicScriptWithDeepseek(summary) {
  return await callDeepseekChat([
    { role: 'system', content: '你是漫画脚本生成专家。' },
    { role: 'user', content: `请将以下论文摘要转化为漫画分镜脚本：${summary}` }
  ]);
} 
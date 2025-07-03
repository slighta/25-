import axios from 'axios';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function gpt4o_generateScript(summary) {
  const res = await axios.post(
    'https://api.openai.com/v1/chat/completions',
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

export async function dalle3_generateImage(prompt) {
  const res = await axios.post(
    'https://api.openai.com/v1/images/generations',
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
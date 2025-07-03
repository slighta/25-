import axios from 'axios';

const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;

export async function claude_analyzePaper(text) {
  const res = await axios.post(
    'https://api.anthropic.com/v1/messages',
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
import express from 'express';
import cors from 'cors';
import multer from 'multer';

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

// 论文解析API
app.post('/api/analyze-paper', upload.single('paper'), async (req, res) => {
  // TODO: 调用AI服务解析论文
  res.json({ message: '论文解析功能待实现' });
});

// 漫画脚本生成API
app.post('/api/generate-script', async (req, res) => {
  // TODO: 调用AI服务生成漫画脚本
  res.json({ message: '漫画脚本生成功能待实现' });
});

// 漫画图像生成API
app.post('/api/generate-comic', async (req, res) => {
  // TODO: 调用AI服务生成漫画图片
  res.json({ message: '漫画图像生成功能待实现' });
});

// 术语弹幕API
app.get('/api/term-explain', async (req, res) => {
  // TODO: 返回术语解释
  res.json({ message: '术语解释功能待实现' });
});

app.listen(3001, () => {
  console.log('Cartoon server running on http://localhost:3001');
}); 
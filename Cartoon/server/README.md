# Cartoon Server

科研论文→科普漫画自动生成器 后端服务

## 启动方式

```bash
npm install
npm run dev
```

## 主要API接口
- `POST /api/analyze-paper` 论文上传与解析
- `POST /api/generate-script` 漫画脚本生成
- `POST /api/generate-comic` 漫画图像生成
- `GET /api/term-explain` 术语弹幕解释

---
详细参数与返回格式见代码注释。 
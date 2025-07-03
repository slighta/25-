# AI跨学科思维教练：论文灵感炼金炉

一个基于AI的多功能跨学科研究灵感生成平台，帮助研究者突破学科边界，发现创新研究思路。

## 🎯 项目特色

- **跨学科桥梁**：自动构建学科间的知识关联网络
- **智能灵感生成**：基于AI算法生成跨学科研究方案
- **论文解析**：自动提取论文核心内容和方法论
- **可视化展示**：直观展示学科关联和灵感生成过程
- **模块化设计**：支持随时添加新的AI应用模块

## 🚀 快速开始

### 环境要求

- Node.js 16+
- npm 或 yarn

### 安装步骤

1. **克隆项目**
```bash
git clone <repository-url>
cd ai-cross-disciplinary-coach
```

2. **安装前端依赖**
```bash
npm install
```

3. **安装后端依赖**
```bash
cd server
npm install
```

4. **启动后端服务**
```bash
cd server
npm run dev
```

5. **启动前端服务**
```bash
# 在项目根目录
npm run dev
```

6. **访问应用**
打开浏览器访问 `http://localhost:5173`

## 📖 使用指南

### 基本流程

1. **上传论文**：支持PDF、Word、TXT格式的学术论文
2. **选择学科**：选择源学科和目标学科，建立跨学科桥梁
3. **输入主题**：描述你的研究主题或关注点
4. **生成灵感**：AI将分析论文并生成跨学科创新方案

### 示例场景

- **社会学 → 计算机科学**：算法歧视研究 → 公平性算法设计
- **材料科学 → 生物学**：纳米材料优化 → 生物仿生学原理
- **经济学 → 心理学**：市场行为分析 → 认知偏差理论

## 🏗️ 项目结构

```
ai-cross-disciplinary-coach/
├── src/                    # 前端源码
│   ├── components/         # Vue组件
│   ├── api/               # API服务
│   ├── App.vue            # 主应用组件
│   └── main.ts            # 应用入口
├── server/                # 后端服务
│   ├── index.js           # 服务器入口
│   ├── package.json       # 后端依赖
│   └── uploads/           # 文件上传目录
├── public/                # 静态资源
└── package.json           # 前端依赖
```

## 🔧 技术栈

### 前端
- **Vue 3** - 渐进式JavaScript框架
- **TypeScript** - 类型安全的JavaScript
- **Element Plus** - Vue 3 UI组件库
- **Vite** - 快速构建工具

### 后端
- **Node.js** - JavaScript运行时
- **Express** - Web应用框架
- **Multer** - 文件上传处理
- **CORS** - 跨域资源共享

## 📊 核心功能

### 1. 论文解析模块
- 自动提取论文核心问题、研究方法、主要结论
- 识别关键词和研究主题
- 生成结构化分析报告

### 2. 跨学科映射模块
- 构建学科关联规则库
- 智能识别概念映射关系
- 生成跨学科创新方案

### 3. 灵感生成模块
- 基于AI算法生成研究灵感
- 提供可信度评分
- 自动推荐相关参考文献

### 4. 可视化模块
- 学科关联网络图
- 灵感生成过程可视化
- 交互式数据展示

## 🔌 API接口

### 论文解析
```http
POST /api/analyze-paper
Content-Type: multipart/form-data

参数：
- paper: 论文文件
```

### 生成灵感
```http
POST /api/generate-insights
Content-Type: application/json

参数：
{
  "sourceDiscipline": "sociology",
  "targetDiscipline": "computer_science",
  "researchTopic": "算法歧视研究",
  "paperAnalysis": {...}
}
```

### 获取学科映射
```http
GET /api/discipline-mappings
```

## 🎨 界面预览

- **现代化设计**：采用渐变色彩和卡片式布局
- **响应式布局**：适配不同屏幕尺寸
- **直观操作**：拖拽上传、一键生成
- **实时反馈**：加载状态、进度提示

## 🔮 未来规划

- [ ] 集成真实AI模型（GPT-4、Claude等）
- [ ] 添加更多学科领域支持
- [ ] 实现学科关联网络可视化
- [ ] 支持多语言界面
- [ ] 添加用户账户系统
- [ ] 实现灵感历史记录

## 🤝 贡献指南

欢迎提交Issue和Pull Request来改进项目！

1. Fork项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建Pull Request

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 📞 联系我们

- 项目主页：[GitHub Repository]
- 问题反馈：[Issues]
- 邮箱：ai-research@example.com

---

**让AI成为你的跨学科研究伙伴！** 🚀 
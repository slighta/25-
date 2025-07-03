const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// 中间件
app.use(cors());
app.use(express.json());

// 文件上传配置
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.pdf', '.doc', '.docx', '.txt'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('不支持的文件格式'));
    }
  }
});

// 学科关联规则库
const disciplineMappings = {
  'sociology': {
    'computer_science': [
      {
        sourceConcept: '算法歧视',
        targetConcept: '公平性算法',
        mapping: '社会公平性 → 算法公平性',
        examples: ['社会选择理论 → 分布式共识算法', '群体偏见 → 机器学习偏见检测']
      }
    ],
    'biology': [
      {
        sourceConcept: '社会网络',
        targetConcept: '神经网络',
        mapping: '社会连接 → 神经元连接',
        examples: ['群体行为 → 群体智能', '社会传播 → 信息扩散模型']
      }
    ]
  },
  'materials_science': {
    'biology': [
      {
        sourceConcept: '纳米材料',
        targetConcept: '生物仿生',
        mapping: '材料结构 → 生物结构',
        examples: ['纳米孔制备 → 细胞膜结构', '材料优化 → 进化算法']
      }
    ],
    'physics': [
      {
        sourceConcept: '材料性能',
        targetConcept: '量子效应',
        mapping: '宏观性质 → 微观机制',
        examples: ['材料强度 → 量子纠缠', '热导率 → 声子传输']
      }
    ]
  }
};

// API路由

// 1. 论文解析API
app.post('/api/analyze-paper', upload.single('paper'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: '请上传论文文件' });
    }

    // 模拟AI论文解析
    const analysis = await simulatePaperAnalysis(req.file);
    
    res.json({
      success: true,
      data: analysis
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. 跨学科灵感生成API
app.post('/api/generate-insights', async (req, res) => {
  try {
    const { sourceDiscipline, targetDiscipline, researchTopic, paperAnalysis } = req.body;
    
    if (!sourceDiscipline || !targetDiscipline || !researchTopic) {
      return res.status(400).json({ error: '缺少必要参数' });
    }

    // 生成跨学科灵感
    const insights = await generateCrossDisciplinaryInsights(
      sourceDiscipline, 
      targetDiscipline, 
      researchTopic, 
      paperAnalysis
    );
    
    res.json({
      success: true,
      data: insights
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. 获取学科映射规则API
app.get('/api/discipline-mappings', (req, res) => {
  res.json({
    success: true,
    data: disciplineMappings
  });
});

// 4. 健康检查API
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 模拟函数

// 模拟论文解析
async function simulatePaperAnalysis(file) {
  // 模拟处理时间
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return {
    coreProblem: '算法歧视对少数群体就业的影响机制研究',
    methodology: '定量分析、社会网络分析、机器学习',
    conclusions: '算法偏见存在系统性偏差，需要多维度干预',
    keywords: ['算法歧视', '就业公平', '社会网络', '机器学习'],
    abstract: '本研究通过分析算法在就业决策中的使用，揭示了算法歧视对少数群体的系统性影响...',
    references: [
      'Barocas, S., & Selbst, A. D. (2016). Big data\'s disparate impact.',
      'Friedler, S. A., et al. (2019). A comparative study of fairness-enhancing interventions in machine learning.'
    ]
  };
}

// 生成跨学科灵感
async function generateCrossDisciplinaryInsights(sourceDiscipline, targetDiscipline, researchTopic, paperAnalysis) {
  // 模拟处理时间
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  const insights = [];
  
  // 根据学科组合生成不同的灵感
  if (sourceDiscipline === 'sociology' && targetDiscipline === 'computer_science') {
    insights.push({
      relatedField: '分布式系统设计',
      mappingPoint: '算法公平性 → 拜占庭容错机制',
      solution: '用社会选择理论优化区块链共识算法，确保少数群体在网络中的权益',
      confidence: 85,
      references: [
        'Nakamoto, S. (2008). Bitcoin: A Peer-to-Peer Electronic Cash System',
        'Arrow, K. J. (1950). A Difficulty in the Concept of Social Welfare'
      ]
    });
    
    insights.push({
      relatedField: '机器学习公平性',
      mappingPoint: '社会偏见 → 算法偏见',
      solution: '构建基于社会公平性指标的机器学习评估框架',
      confidence: 78,
      references: [
        'Mehrabi, N., et al. (2021). A Survey on Bias and Fairness in Machine Learning',
        'Rawls, J. (1971). A Theory of Justice'
      ]
    });
  }
  
  if (sourceDiscipline === 'materials_science' && targetDiscipline === 'biology') {
    insights.push({
      relatedField: '生物仿生材料',
      mappingPoint: '纳米结构 → 生物结构',
      solution: '借鉴细胞膜的自组装机制，设计新型纳米材料制备工艺',
      confidence: 82,
      references: [
        'Sarikaya, M., et al. (2003). Molecular biomimetics: nanotechnology through biology',
        'Alberts, B., et al. (2002). Molecular Biology of the Cell'
      ]
    });
  }
  
  // 添加通用灵感
  insights.push({
    relatedField: '系统论',
    mappingPoint: '复杂系统 → 跨学科整合',
    solution: '运用系统思维方法，构建跨学科研究框架',
    confidence: 70,
    references: [
      'Bertalanffy, L. v. (1968). General System Theory',
      'Meadows, D. H. (2008). Thinking in Systems'
    ]
  });
  
  return insights;
}

// 启动服务器
app.listen(PORT, () => {
  console.log(`AI跨学科思维教练服务器运行在 http://localhost:${PORT}`);
  console.log(`API文档:`);
  console.log(`- POST /api/analyze-paper - 论文解析`);
  console.log(`- POST /api/generate-insights - 生成跨学科灵感`);
  console.log(`- GET /api/discipline-mappings - 获取学科映射规则`);
  console.log(`- GET /api/health - 健康检查`);
}); 
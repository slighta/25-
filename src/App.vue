<template>
  <div id="app">
    <el-container style="height: 100vh;">
      <!-- 顶部导航栏 -->
      <el-header style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; display: flex; align-items: center; justify-content: space-between;">
        <div style="display: flex; align-items: center;">
          <el-icon size="24" style="margin-right: 10px;"><Lightbulb /></el-icon>
          <h2 style="margin: 0;">AI跨学科思维教练：论文灵感炼金炉</h2>
        </div>
        <div>
          <el-button type="text" style="color: white;" @click="showHelp">
            <el-icon><QuestionFilled /></el-icon>
            使用帮助
          </el-button>
        </div>
      </el-header>

      <el-container>
        <!-- 左侧面板 -->
        <el-aside width="400px" style="background: #f8f9fa; padding: 20px;">
          <el-card shadow="never">
            <template #header>
              <div style="display: flex; align-items: center;">
                <el-icon><Upload /></el-icon>
                <span style="margin-left: 8px;">论文上传与分析</span>
              </div>
            </template>
            
            <!-- 论文上传区域 -->
            <el-upload
              class="upload-demo"
              drag
              :auto-upload="false"
              :on-change="handleFileChange"
              accept=".pdf,.doc,.docx,.txt"
              style="margin-bottom: 20px;">
              <el-icon class="el-icon--upload"><upload-filled /></el-icon>
              <div class="el-upload__text">
                将论文拖拽到此处，或<em>点击上传</em>
              </div>
              <template #tip>
                <div class="el-upload__tip">
                  支持 PDF、Word、TXT 格式，最大 10MB
                </div>
              </template>
            </el-upload>

            <!-- 学科选择 -->
            <el-form label-width="80px">
              <el-form-item label="源学科">
                <el-select v-model="sourceDiscipline" placeholder="选择源学科" style="width: 100%;">
                  <el-option
                    v-for="item in disciplines"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              
              <el-form-item label="目标学科">
                <el-select v-model="targetDiscipline" placeholder="选择目标学科" style="width: 100%;">
                  <el-option
                    v-for="item in disciplines"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="研究主题">
                <el-input
                  v-model="researchTopic"
                  placeholder="输入研究主题或关键词"
                  type="textarea"
                  :rows="3">
                </el-input>
              </el-form-item>
            </el-form>

            <el-button type="primary" @click="generateInsights" :loading="loading" style="width: 100%;">
              <el-icon><Magic /></el-icon>
              生成跨学科灵感
            </el-button>
          </el-card>
        </el-aside>

        <!-- 主内容区域 -->
        <el-main style="padding: 20px;">
          <el-row :gutter="20">
            <!-- 论文解析结果 -->
            <el-col :span="12">
              <el-card shadow="never" style="height: 400px;">
                <template #header>
                  <div style="display: flex; align-items: center;">
                    <el-icon><Document /></el-icon>
                    <span style="margin-left: 8px;">论文解析结果</span>
                  </div>
                </template>
                <div v-if="paperAnalysis" style="height: 320px; overflow-y: auto;">
                  <el-descriptions :column="1" border>
                    <el-descriptions-item label="核心问题">{{ paperAnalysis.coreProblem }}</el-descriptions-item>
                    <el-descriptions-item label="研究方法">{{ paperAnalysis.methodology }}</el-descriptions-item>
                    <el-descriptions-item label="主要结论">{{ paperAnalysis.conclusions }}</el-descriptions-item>
                    <el-descriptions-item label="关键词">{{ paperAnalysis.keywords.join(', ') }}</el-descriptions-item>
                  </el-descriptions>
                </div>
                <div v-else style="text-align: center; color: #909399; margin-top: 100px;">
                  <el-icon size="48"><Document /></el-icon>
                  <p>请上传论文文件</p>
                </div>
              </el-card>
            </el-col>

            <!-- 跨学科灵感 -->
            <el-col :span="12">
              <el-card shadow="never" style="height: 400px;">
                <template #header>
                  <div style="display: flex; align-items: center;">
                    <el-icon><Lightbulb /></el-icon>
                    <span style="margin-left: 8px;">跨学科灵感</span>
                  </div>
                </template>
                <div v-if="insights.length > 0" style="height: 320px; overflow-y: auto;">
                  <div v-for="(insight, index) in insights" :key="index" style="margin-bottom: 15px;">
                    <el-card shadow="hover" style="border-left: 4px solid #409EFF;">
                      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                        <h4 style="margin: 0; color: #409EFF;">灵感 #{{ index + 1 }}</h4>
                        <el-tag :type="getConfidenceType(insight.confidence)">
                          {{ insight.confidence }}% 可信度
                        </el-tag>
                      </div>
                      <p><strong>关联领域：</strong>{{ insight.relatedField }}</p>
                      <p><strong>映射点：</strong>{{ insight.mappingPoint }}</p>
                      <p><strong>具体方案：</strong>{{ insight.solution }}</p>
                      <div v-if="insight.references.length > 0">
                        <p><strong>参考文献：</strong></p>
                        <ul style="margin: 5px 0; padding-left: 20px;">
                          <li v-for="ref in insight.references" :key="ref">{{ ref }}</li>
                        </ul>
                      </div>
                    </el-card>
                  </div>
                </div>
                <div v-else style="text-align: center; color: #909399; margin-top: 100px;">
                  <el-icon size="48"><Lightbulb /></el-icon>
                  <p>点击生成按钮获取跨学科灵感</p>
                </div>
              </el-card>
            </el-col>
          </el-row>

          <!-- 学科关联网络 -->
          <el-row style="margin-top: 20px;">
            <el-col :span="24">
              <el-card shadow="never">
                <template #header>
                  <div style="display: flex; align-items: center;">
                    <el-icon><Connection /></el-icon>
                    <span style="margin-left: 8px;">学科关联网络</span>
                  </div>
                </template>
                <div style="height: 300px; display: flex; align-items: center; justify-content: center; background: #f8f9fa; border-radius: 8px;">
                  <div style="text-align: center; color: #909399;">
                    <el-icon size="48"><Connection /></el-icon>
                    <p>学科关联网络可视化</p>
                    <p style="font-size: 12px;">（需要集成D3.js或ECharts实现）</p>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-container>

    <!-- 帮助对话框 -->
    <el-dialog v-model="helpVisible" title="使用帮助" width="600px">
      <div>
        <h4>如何使用AI跨学科思维教练？</h4>
        <ol>
          <li><strong>上传论文：</strong>支持PDF、Word、TXT格式的学术论文</li>
          <li><strong>选择学科：</strong>选择源学科和目标学科，建立跨学科桥梁</li>
          <li><strong>输入主题：</strong>描述你的研究主题或关注点</li>
          <li><strong>生成灵感：</strong>AI将分析论文并生成跨学科创新方案</li>
        </ol>
        
        <h4>示例场景</h4>
        <ul>
          <li>社会学博士生研究"算法歧视"→ 结合计算机科学的公平性算法</li>
          <li>材料学研究者优化纳米材料 → 借鉴生物仿生学原理</li>
          <li>经济学分析市场行为 → 应用心理学认知偏差理论</li>
        </ul>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

// 响应式数据
const sourceDiscipline = ref('')
const targetDiscipline = ref('')
const researchTopic = ref('')
const loading = ref(false)
const helpVisible = ref(false)

// 论文分析结果
const paperAnalysis = ref(null)

// 生成的灵感
const insights = ref([])

// 学科列表
const disciplines = [
  { value: 'sociology', label: '社会学' },
  { value: 'computer_science', label: '计算机科学' },
  { value: 'biology', label: '生物学' },
  { value: 'materials_science', label: '材料科学' },
  { value: 'economics', label: '经济学' },
  { value: 'psychology', label: '心理学' },
  { value: 'physics', label: '物理学' },
  { value: 'chemistry', label: '化学' },
  { value: 'engineering', label: '工程学' },
  { value: 'philosophy', label: '哲学' }
]

// 文件上传处理
const handleFileChange = (file: any) => {
  console.log('文件上传:', file)
  // 这里应该调用后端API解析论文
  // 模拟解析结果
  setTimeout(() => {
    paperAnalysis.value = {
      coreProblem: '算法歧视对少数群体就业的影响机制研究',
      methodology: '定量分析、社会网络分析、机器学习',
      conclusions: '算法偏见存在系统性偏差，需要多维度干预',
      keywords: ['算法歧视', '就业公平', '社会网络', '机器学习']
    }
    ElMessage.success('论文解析完成')
  }, 2000)
}

// 生成跨学科灵感
const generateInsights = async () => {
  if (!sourceDiscipline.value || !targetDiscipline.value || !researchTopic.value) {
    ElMessage.warning('请填写完整的学科信息和研究主题')
    return
  }

  loading.value = true
  
  try {
    // 模拟AI生成过程
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // 模拟生成的灵感
    insights.value = [
      {
        relatedField: '分布式系统设计',
        mappingPoint: '算法公平性 → 拜占庭容错机制',
        solution: '用社会选择理论优化区块链共识算法，确保少数群体在网络中的权益',
        confidence: 85,
        references: [
          'Nakamoto, S. (2008). Bitcoin: A Peer-to-Peer Electronic Cash System',
          'Arrow, K. J. (1950). A Difficulty in the Concept of Social Welfare'
        ]
      },
      {
        relatedField: '生物神经网络',
        mappingPoint: '社会网络结构 → 神经元连接模式',
        solution: '借鉴大脑可塑性原理，设计自适应的算法公平性评估框架',
        confidence: 72,
        references: [
          'Hebb, D. O. (1949). The Organization of Behavior',
          'Watts, D. J. (2004). The "New" Science of Networks'
        ]
      },
      {
        relatedField: '博弈论',
        mappingPoint: '就业竞争 → 多人博弈均衡',
        solution: '构建多主体博弈模型，分析算法歧视下的纳什均衡解',
        confidence: 68,
        references: [
          'Nash, J. (1950). Equilibrium Points in N-Person Games',
          'Akerlof, G. A. (1970). The Market for "Lemons"'
        ]
      }
    ]
    
    ElMessage.success('跨学科灵感生成完成！')
  } catch (error) {
    ElMessage.error('生成失败，请重试')
  } finally {
    loading.value = false
  }
}

// 获取可信度标签类型
const getConfidenceType = (confidence: number) => {
  if (confidence >= 80) return 'success'
  if (confidence >= 60) return 'warning'
  return 'danger'
}

// 显示帮助
const showHelp = () => {
  helpVisible.value = true
}
</script>

<style scoped>
#app {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}

.el-header {
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.el-aside {
  border-right: 1px solid #e4e7ed;
}

.upload-demo {
  width: 100%;
}

.el-upload__tip {
  font-size: 12px;
  color: #606266;
  margin-top: 7px;
}

.el-card {
  border-radius: 8px;
}

.el-card__header {
  background: #fafafa;
  border-bottom: 1px solid #e4e7ed;
}
</style> 
import axios from 'axios'

// API基础配置
const API_BASE_URL = 'http://localhost:3000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    console.log('API请求:', config.method?.toUpperCase(), config.url)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    console.log('API响应:', response.status, response.data)
    return response.data
  },
  (error) => {
    console.error('API错误:', error.response?.status, error.response?.data)
    return Promise.reject(error)
  }
)

// API接口定义
export interface PaperAnalysis {
  coreProblem: string
  methodology: string
  conclusions: string
  keywords: string[]
  abstract?: string
  references?: string[]
}

export interface CrossDisciplinaryInsight {
  relatedField: string
  mappingPoint: string
  solution: string
  confidence: number
  references: string[]
}

export interface GenerateInsightsRequest {
  sourceDiscipline: string
  targetDiscipline: string
  researchTopic: string
  paperAnalysis?: PaperAnalysis
}

// API函数
export const apiService = {
  // 论文解析
  async analyzePaper(file: File): Promise<PaperAnalysis> {
    const formData = new FormData()
    formData.append('paper', file)
    
    const response = await api.post('/analyze-paper', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    
    return response.data
  },

  // 生成跨学科灵感
  async generateInsights(params: GenerateInsightsRequest): Promise<CrossDisciplinaryInsight[]> {
    const response = await api.post('/generate-insights', params)
    return response.data
  },

  // 获取学科映射规则
  async getDisciplineMappings(): Promise<any> {
    const response = await api.get('/discipline-mappings')
    return response.data
  },

  // 健康检查
  async healthCheck(): Promise<any> {
    const response = await api.get('/health')
    return response.data
  }
}

export default apiService 
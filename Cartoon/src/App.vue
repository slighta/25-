<template>
  <div :class="['main-bg', isDark ? 'dark' : '']">
    <el-switch
      v-model="isDark"
      active-text="暗色"
      inactive-text="亮色"
      style="position: absolute; top: 24px; right: 32px; z-index: 10;"
      @change="toggleTheme"
    />
    <el-card class="main-card fade-in">
      <h1>科研论文→科普漫画自动生成器</h1>
      <el-steps :active="step" finish-status="success" align-center style="margin-bottom: 2rem;">
        <el-step title="上传论文" />
        <el-step title="生成脚本" />
        <el-step title="生成漫画" />
      </el-steps>
      <section v-if="step === 0">
        <el-card class="upload-card fade-in">
          <h2>上传论文</h2>
          <el-upload
            class="upload-demo"
            drag
            :auto-upload="false"
            :show-file-list="true"
            :on-change="onFileChange"
          >
            <i class="el-icon-upload" style="font-size: 32px; color: #409eff;"></i>
            <div class="el-upload__text">将文件拖到此处，或 <em>点击上传</em></div>
          </el-upload>
          <el-button type="primary" @click="uploadPaper" :disabled="!file" style="margin-top: 1rem;">上传并解析</el-button>
        </el-card>
      </section>
      <section v-if="step === 1">
        <el-card class="script-card fade-in">
          <h2>漫画分镜脚本</h2>
          <el-alert v-if="!script" title="正在生成脚本..." type="info" show-icon />
          <el-input
            v-if="script"
            type="textarea"
            :rows="8"
            v-model="script"
            readonly
            style="margin-bottom: 1rem;"
          />
          <el-button type="primary" @click="generateComic" :disabled="!script">生成漫画</el-button>
        </el-card>
      </section>
      <section v-if="step === 2">
        <el-card class="comic-card fade-in">
          <h2>漫画预览</h2>
          <el-row :gutter="20">
            <el-col :span="12" v-for="(img, idx) in comicImages" :key="idx">
              <el-image :src="img" fit="contain" style="width: 100%; border-radius: 8px; box-shadow: 0 2px 8px #e0e7ff;" class="fade-in" />
            </el-col>
          </el-row>
          <el-button type="primary" @click="reset" style="margin-top: 2rem;">再来一篇</el-button>
        </el-card>
      </section>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { analyzePaper, generateScript, generateComic } from './api/index';

const file = ref<File|null>(null);
const script = ref('');
const comicImages = ref<string[]>([]);
const paperAnalysis = ref<any>(null);
const step = ref(0);
const isDark = ref(false);

const onFileChange = (fileObj: any) => {
  file.value = fileObj.raw;
};

const uploadPaper = async () => {
  if (!file.value) return;
  step.value = 1;
  const formData = new FormData();
  formData.append('paper', file.value);
  const res = await analyzePaper(formData);
  paperAnalysis.value = res.data;
  const scriptRes = await generateScript({ paperAnalysis: paperAnalysis.value });
  script.value = scriptRes.data.script || '脚本生成失败';
};

const generateComic = async () => {
  step.value = 2;
  const res = await generateComic({ script: script.value });
  comicImages.value = res.data.images || [];
  try {
    const script = await generateComicScriptWithDeepseek(paperAnalysis.summary);
    console.log('DeepSeek返回脚本：', script);
    res.json({ script });
  } catch (e) {
    console.error('DeepSeek脚本生成异常：', e.response?.data || e.message);
    res.status(500).json({ error: e.message });
  }
};

const reset = () => {
  file.value = null;
  script.value = '';
  comicImages.value = [];
  paperAnalysis.value = null;
  step.value = 0;
};

const toggleTheme = () => {
  document.documentElement.classList.toggle('dark', isDark.value);
};

onMounted(() => {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    isDark.value = true;
    toggleTheme();
  }
});
</script>

<style scoped>
.main-bg {
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f8ff 0%, #e0e7ff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.4s;
}
:root.dark .main-bg {
  background: linear-gradient(135deg, #232526 0%, #414345 100%) !important;
}
.main-card {
  max-width: 900px;
  width: 100%;
  margin: 2rem auto;
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(64,158,255,0.10);
  padding: 2.5rem 2rem;
  background: var(--el-bg-color, #fff);
  transition: box-shadow 0.3s, background 0.3s;
}
h1 {
  color: #409eff;
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 700;
  letter-spacing: 2px;
  transition: color 0.3s;
}
.upload-card, .script-card, .comic-card {
  margin-bottom: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(64,158,255,0.08);
  transition: box-shadow 0.3s, background 0.3s;
}
.el-upload__text em {
  color: #409eff;
  font-style: normal;
}
.el-button {
  transition: background 0.2s, color 0.2s;
}
.el-button:hover {
  background: linear-gradient(90deg, #409eff 0%, #66b1ff 100%);
  color: #fff;
}
.fade-in {
  animation: fadeIn 0.8s;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(30px);}
  to { opacity: 1; transform: translateY(0);}
}
:root.dark {
  --el-bg-color: #232526;
  --el-text-color-primary: #fff;
}
</style> 
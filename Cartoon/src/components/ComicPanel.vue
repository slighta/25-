<template>
  <div>
    <img :src="imgUrl" />
    <div v-html="highlightedScript" @click="onTermClick"></div>
    <el-popover v-if="showPopover" :visible="showPopover" :content="termExplain" placement="top" />
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import { getTermExplain } from '../api/index';

const props = defineProps<{ script: string, imgUrl: string }>();
const showPopover = ref(false);
const termExplain = ref('');
const highlightedScript = computed(() => {
  // 简单正则高亮术语
  return props.script.replace(/【(.*?)】/g, '<span class="term">$1</span>');
});
const onTermClick = async (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (target.classList.contains('term')) {
    const term = target.innerText;
    const res = await getTermExplain(term);
    termExplain.value = res.data.explain || '暂无解释';
    showPopover.value = true;
  }
};
</script>
<style>
.term { color: #409eff; cursor: pointer; border-bottom: 1px dashed #409eff; }
</style> 
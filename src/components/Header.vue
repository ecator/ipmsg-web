
<script setup>

import { useDark, useToggle } from '@vueuse/core'
import { Moon, Sunny, Delete } from '@element-plus/icons-vue'
import { unref } from 'vue';

const isDark = useDark()
const LOCAL_STORAGE_KEY_IS_DART = 'LOCAL_STORAGE_KEY_IS_DART'

const toggleDark = useToggle(isDark)
/**
 * 切换暗黑模式
 *
 */
function runToggleDark() {
  toggleDark()
  localStorage.setItem(LOCAL_STORAGE_KEY_IS_DART, unref(isDark) ? "1" : "0")
}
if (localStorage.getItem(LOCAL_STORAGE_KEY_IS_DART) != null && localStorage.getItem(LOCAL_STORAGE_KEY_IS_DART) == "0" && unref(isDark) == true) {
  runToggleDark()
}

defineEmits(["deleteMsgs"])
defineProps({ onlineCnt: { type: Number, default: 0 }, addr: { type: String, default: "" }, msgs: { type: Array, default: [] } })
</script>


<style scoped>
.el-row {
  margin-top: 20px;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  text-align: center;
  font-size: larger;
}

.grid-content-left {
  text-align: left;
}

.grid-content-right {
  text-align: right;
}

.delete-icon {
  height: 32px;
  vertical-align: middle;
  text-align: center;
  margin: 20px;
  cursor: pointer;
  font-size: 30px;
  color: rgba(255, 0, 0, 1);
}

.delete-icon:hover {
  color: rgba(255, 0, 0, 0.5);
}
</style>

<template>
  <el-row :gutter="20">
    <el-col :span="6">
      <div class="grid-content grid-content-left ep-bg-purple">当前在线 {{ onlineCnt }}</div>
    </el-col>
    <el-col :span="12">
      <div class="grid-content grid-content-center ep-bg-purple">{{ addr.indexOf(':') == -1 ? '' : '当前本机地址' }} {{ addr }}
      </div>
    </el-col>
    <el-col :span="6">
      <div class="grid-content grid-content-right ep-bg-purple">
        <el-icon v-show="msgs.length > 0" class="delete-icon" @click="$emit('deleteMsgs')">
          <Delete style="width: 1em; height: 1em; margin-right: 8px;" />
        </el-icon>
        <el-switch :model-value="isDark" :active-icon="Moon" :inactive-icon="Sunny" @change="runToggleDark" />
      </div>
    </el-col>
  </el-row>
</template>


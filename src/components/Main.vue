
<script setup>
import { ref, computed, unref, onMounted, watch } from "vue";
import githubIcon from '../assets/github.png'
import { Message } from '@element-plus/icons-vue'
defineEmits(['sendMsg'])
const props = defineProps({ msgs: { type: Array, default: [] } })
const inputMsg = ref('')
const msgScrollbar = ref(null)
const sendBtnDisabled = computed(() => {
  return String(unref(inputMsg)).length == 0
})

onMounted(() => {
  msgScrollToBottom()
})

watch(() => props.msgs.length, msgScrollToBottom, { flush: 'post' })

/**
 * 历史消息滚动条到最底部
 *
 */
function msgScrollToBottom() {
  //console.log(msgScrollbar.value,msgScrollbar.value.wrapRef)
  msgScrollbar.value.setScrollTop(msgScrollbar.value.wrapRef.querySelector('.el-scrollbar__view').clientHeight)
}

</script>
<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
}

.el-card {
  margin-bottom: 2px;
}

.card-content {
  display: block;
  overflow-wrap: break-word;
  word-wrap: break-word;
}

.el-main {
  flex-grow: 1;
  flex-basis: 40vh;
}

.el-footer {
  flex-grow: 0;
  flex-basis: 20vh;
  display: flex;
  flex-direction: column;
  justify-content: end;
}

.el-footer .el-textarea {
  flex-grow: 1;
  flex-basis: 10vh;
  display: flex;
  flex-direction: row;
}


.el-container {
  height: 100%;
}

.tool-bar {
  display: flex;
  justify-content: end;
}

.copyright-area {
  display: flex;
  justify-content: center;
  flex-basis: 30px;
  flex-grow: 0;
}

#author {
  display: flex;
  align-items: center;
}

#author img {
  height: 20px;
}
</style>

<template>
  <div class="common-layout">
    <el-container>
      <el-main>
        <el-scrollbar ref="msgScrollbar">
          <el-card v-for="msg of msgs" class="box-card">
            <div class="card-header">
              <span>{{ $formatDate(msg.timestamp) }}</span>
              <span>{{ msg.direction }} {{ msg.target }}</span>
            </div>
            <p class="card-content" v-html="$md2html(msg.content)">
            </p>
          </el-card>
        </el-scrollbar>
      </el-main>
      <el-footer>
        <el-input v-model="inputMsg" type="textarea" placeholder="输入需要发送的内容，支持markdown" />
        <div class="tool-bar"><el-button type="primary" :icon="Message" :disabled="sendBtnDisabled"
            @click="$emit('sendMsg', inputMsg)">Send</el-button>
        </div>
        <div class="copyright-area">
          <div id="author"><span>Created by &nbsp;</span><img :src="githubIcon" /><a href="https://github.com/ecator"
              target="_blank">Martin</a></div>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

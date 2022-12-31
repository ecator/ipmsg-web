<script setup>
import Header from './components/Header.vue'
import Aside from './components/Aside.vue'
import Main from './components/Main.vue'
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'
import HistoryMsg from './beans/HistoryMsg'
import Addr from './beans/Addr'
import Msg from './beans/Msg'


import { ref, unref, getCurrentInstance, onMounted, watch } from 'vue'



const { appContext } = getCurrentInstance()
const LOCAL_STORAGE_KEY_HISTORY_MSG = 'LOCAL_STORAGE_KEY_HISTORY_MSG'
let a = []
let m = localStorage.getItem(LOCAL_STORAGE_KEY_HISTORY_MSG)
if (m == null) {
  m = []
} else {
  m = JSON.parse(m)
}
if (!Array.isArray(m)) {
  m = []
}


const msgs = ref(m)
const addrs = ref(a)
const myAddr = ref('连接服务器中。。。')
let ws

onMounted(() => {
  ws = new WebSocket((location.protocol == 'http:' ? 'ws://' : 'wss://') + location.host + "/ws")
  let interval
  ws.onopen = () => {
    console.log("WebSocket connected")
    interval = setInterval(() => ws.send(Msg.CreatePingDataMsg()), 3000)
  }
  ws.onerror = () => {
    addrs.value = []
    myAddr.value = "已掉线，请刷新重新连接"
    clearInterval(interval)
  }
  ws.onclose = () => {
    addrs.value = []
    myAddr.value = "已与服务断开连接，重新连接请刷新"
    clearInterval(interval)
  }
  ws.onmessage = (ev) => {
    console.log("received message " + ev.data)
    try {
      let msg = JSON.parse(ev.data)
      switch (msg.type) {
        case Msg.MsgType.PONG:
          myAddr.value = msg.data.addr
          break
        case Msg.MsgType.ADDR_ADD:
          addrs.value.push(new Addr(msg.data.addr, false))
          break
        case Msg.MsgType.ADDR_REMOVE:
          addrs.value = unref(addrs).filter(a => a.value != msg.data.addr)
          break
        case Msg.MsgType.MSG:
          let ms = unref(msgs).filter(() => true)
          ms.push(new HistoryMsg(msg.data.timestamp, "From", msg.data.from, msg.data.content))
          msgs.value = ms
          ElNotification({
            title: '新消息',
            message: `From ${msg.data.from}`,
            type: 'info',
          })
          break
        default:
          console.log("msg.type error")
      }
    } catch (e) {
      console.log(e)
    }
  }

})

watch(() => msgs.value.length, () => {
  localStorage.setItem(LOCAL_STORAGE_KEY_HISTORY_MSG, JSON.stringify(unref(msgs)))
})

/**
 * 处理地址选择事件
 *
 * @param {Addr} addr 选中的地址
 */
function addrSelectHandler(addr) {
  for (let a of unref(addrs)) {
    if (a.value == addr.value) {
      a.selected = !a.selected
    }
  }
}

/**
 * 清空历史消息
 *
 */
function deleteMsgs() {
  ElMessageBox.confirm(
    '是否清空历史消息记录？',
    '警告',
    {
      confirmButtonText: '是',
      cancelButtonText: '否',
      type: 'warning',
    }
  )
    .then(() => {
      msgs.value = [];
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消',
      })
    })
}

/**
 * 发送消息
 *
 * @param {string} msg 需要发送的消息
 */
function sendMsg(msg) {
  //console.log(msg)
  if (unref(addrs).filter((a) => a.selected).length == 0) {
    ElMessageBox.alert("请在左边栏至少选择一个需要发送的IP对象", "未选择收信人")
    return
  }
  for (let addr of unref(addrs).filter(a => a.selected)) {
    let ms = unref(msgs).filter(() => true)
    ms.push(new HistoryMsg(Date.now(), "To", addr.value, msg))
    msgs.value = ms
    ws.send(Msg.CreateExchangeDataMsg(Date.now(), addr.value, myAddr.value, msg))
    ElMessage({
      type: 'info',
      message: '已发送',
    })
  }
}

</script>

<template>
  <div class="common-layout">
    <el-container style="height:100%">
      <el-header>
        <Header :online-cnt="addrs.length" :addr="myAddr" :msgs="msgs" @delete-msgs="deleteMsgs" />
      </el-header>
      <el-container id="container-body">
        <el-aside width="20%">
          <Aside :addrs="addrs" @addr-select="addrSelectHandler" />
        </el-aside>
        <el-main>
          <Main :msgs="msgs" @send-msg="sendMsg" />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.common-layout {
  height: 100%;
}

#container-body {
  height: 60vh;
}
</style>

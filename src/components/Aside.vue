
<script setup>
defineProps({ addrs: { type: Array, default: [] } })
defineEmits(['addrSelect'])
</script>


<style scoped>
.scrollbar-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
  cursor: pointer;
}

.is-selected{
  background-color: yellowgreen;
}

</style>

<template>
  <el-scrollbar>
    <p v-for="addr in addrs" :key="addr.value" :class="['scrollbar-item',{'is-selected':addr.selected}]" @click="$emit('addrSelect',addr)">{{ addr.value }}</p>
  </el-scrollbar>
</template>


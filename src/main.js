import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import App from './App.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import escapeHtml from './plugins/escapeHtml'
import md2html from './plugins/md2html'
import formatDate from './plugins/formatDate'

const app = createApp(App)
app.use(ElementPlus, {
    locale: zhCn,
})
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(escapeHtml)
app.use(md2html)
app.use(formatDate)
app.mount('#app')
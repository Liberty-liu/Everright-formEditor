import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import Vant from 'vant'
// import '@vant/touch-emulator'
import 'element-plus/dist/index.css'
import 'vant/lib/index.css'
import router from './router'
import App from './App.vue'
const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.use(Vant)
app.mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

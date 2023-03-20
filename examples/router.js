import * as VueRouter from 'vue-router'
import FormEditorView from './views/formEditor.vue'
const routes = [
  {
    path: '/',
    redirect: '/formEditor'
  },
  {
    path: '/formEditor',
    component: FormEditorView
  }
]
export default VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes
})

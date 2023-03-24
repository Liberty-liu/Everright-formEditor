import * as VueRouter from 'vue-router'
import FormEditorView from './views/formEditor.vue'
import FormEditorConfigView from './views/formEditorConfig.vue'
import FormEditorObjListView from './views/formEditor/objList.vue'
import FormEditorObjEditView from './views/formEditor/objEdit.vue'
import FormEditorObjActionView from './views/formEditor/objAction.vue'
const routes = [
  {
    path: '/',
    redirect: '/formEditor'
  },
  {
    path: '/formEditor',
    component: FormEditorView
  },
  {
    path: '/formEditorConfig',
    component: FormEditorConfigView
  },
  {
    path: '/formEditor/object',
    component: {
      template: '<router-view></router-view>'
    },
    children: [
      {
        name: 'objList',
        path: 'objList',
        component: FormEditorObjListView
      },
      {
        name: 'objEdit',
        path: 'objEdit/:objid?',
        component: FormEditorObjEditView
      },
      {
        name: 'objAction',
        path: 'objAction/:objid?',
        component: FormEditorObjActionView
      }
    ]
  }
]
export default VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes
})

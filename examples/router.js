import * as VueRouter from 'vue-router'
import demo from './views/demo.vue'
import FormEditorView from './views/formEditor.vue'
import FormEditorConfigView from './views/formEditorConfig.vue'
import FormEditorObjListView from './views/formEditor/objList.vue'
import FormEditorObjEditView from './views/formEditor/objEdit.vue'
import FormEditorActionEditView from './views/formEditor/actionEdit.vue'
import FormEditorActionListView from './views/formEditor/actionList.vue'
const routes = [
  {
    path: '/',
    redirect: '/formEditor'
  },
  {
    path: '/demo',
    component: demo
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
        name: 'actionList',
        path: ':objid?/actionList',
        component: FormEditorActionListView
      },
      {
        name: 'actionEdit',
        path: ':objid?/actionEdit/:actionid?',
        component: FormEditorActionEditView
      }
      // {
      //   name: 'objAction',
      //   path: 'objAction/:objid?/:actionid?',
      //   component: FormEditorObjActionView
      // }
    ]
  }
]
export default VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes
})

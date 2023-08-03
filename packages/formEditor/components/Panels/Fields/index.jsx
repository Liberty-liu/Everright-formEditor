import hooks from '@ER/hooks'
import { inject, ref, reactive, nextTick } from 'vue'
import Icon from '@ER/icon'
import FieldsPanel from './components/Fields.jsx'
import TreePanel from './components/Tree.jsx'
export default {
  name: 'Fields',
  inheritAttrs: false,
  customOptions: {},
  props: {
    type: {
      type: Number,
      default: 1
    },
    visible: {}
  },
  setup (props) {
    const ER = inject('Everright')
    const ns = hooks.useNamespace('Fields')
    const {
      t
    } = hooks.useI18n()
    const activeName = ref('tree')
    const {
      state,
      setSelection
    } = hooks.useTarget()
    return () => {
      return (
        <ElAside class={[ns.b()]} width={ER.props.fieldsPanelWidth}>
          <el-tabs class={[ns.e('tabs')]} v-model={activeName.value}>
            <el-tab-pane
              name="fields"
              v-slots={{
                label: () => (<Icon fontSize={16} icon="component"/>)
              }}
            >
              <FieldsPanel/>
            </el-tab-pane>
            <el-tab-pane
              name="tree"
              v-slots={{
                label: () => (<Icon fontSize={16} icon="treeList"/>)
              }}
            >
              <TreePanel/>
            </el-tab-pane>
          </el-tabs>
        </ElAside>
      )
    }
  }
}

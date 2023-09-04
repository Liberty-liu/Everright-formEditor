import { defineComponent, resolveComponent, watch, useAttrs, defineAsyncComponent, unref } from 'vue'
import Selection from '@ER/formEditor/components/Selection/selectElement.jsx'
import LayoutDragGable from './DragGable.jsx'
import hooks from '@ER/hooks'
export default defineComponent({
  name: 'SubformLayout',
  inheritAttrs: false,
  customOptions: {},
  props: {
    data: Object,
    parent: Array
  },
  setup (props) {
    const ns = hooks.useNamespace('SubformLayout')
    const {
      state,
      isEditModel,
      isPc,
      setSelection
    } = hooks.useTarget()
    const typeProps = hooks.useProps(state, props.data, unref(isPc))
    return () => {
      return (
        <Selection {...useAttrs()} hasCopy hasDel hasDrag hasWidthScale data={props.data} parent={props.parent}>
          <div class={ns.b()}>
            <el-form-item
              {...typeProps.value}
            >
              <div
                class={[ns.e('content')]}
              >
                {
                  <LayoutDragGable
                    data-layout-type={'subform'}
                    data={props.data.list[0]}
                    ControlInsertion={true}
                    parent={props.data}/>
                }
              </div>
            </el-form-item>
          </div>
        </Selection>
      )
    }
  }
})

import { defineComponent, resolveComponent, watch, useAttrs, defineAsyncComponent } from 'vue'
import Selection from '@ER/formEditor/components/Selection/selectElement.jsx'
import LayoutDragGable from './DragGable.jsx'
import hooks from '@ER/hooks'
export default defineComponent({
  name: 'CollapseLayout',
  inheritAttrs: false,
  customOptions: {},
  props: {
    data: Object,
    parent: Array
  },
  setup (props) {
    const ns = hooks.useNamespace('CollapseLayout')
    if (!props.data.options.defaultValue.length) {
      props.data.options.defaultValue.push(props.data.columns[0].id)
    }
    return () => {
      return (
        <Selection {...useAttrs()} hasCopy hasDel hasDrag hasWidthScale data={props.data} parent={props.parent}>
          <el-collapse vModel={props.data.options.defaultValue} accordion={props.data.options.accordion}>
            {
              props.data.columns.map((element, index0) => {
                return (
                  <el-collapse-item title={element.label} name={element.id}>
                    <Selection
                      class={[ns.e('area')]}
                      data={element} parent={props.data}
                    >
                      <LayoutDragGable
                        data={element.list}
                        data-layout-type={'collapse-col'}
                        parent={element}/>
                    </Selection>
                  </el-collapse-item>
                )
              })
            }
          </el-collapse>
        </Selection>
      )
    }
  }
})

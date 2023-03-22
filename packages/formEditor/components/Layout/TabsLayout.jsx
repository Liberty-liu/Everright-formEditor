import { defineComponent, resolveComponent, watch, useAttrs, defineAsyncComponent } from 'vue'
import SectorSelectElement from '@ER/formEditor/components/Sector/selectElement.jsx'
import LayoutDragGable from './DragGable.jsx'
import hooks from '@ER/hooks'
export default defineComponent({
  name: 'TabsLayout',
  inheritAttrs: false,
  customOptions: {},
  props: {
    data: Object,
    parent: Array
  },
  setup (props) {
    const ns = hooks.useNamespace('TabsLayout')
    return () => {
      return (
        <SectorSelectElement {...useAttrs()} data={props.data} parent={props.parent} hasCopy hasDel hasDrag hasWidthScale>
          <el-tabs class={[ns.b()]} vModel={props.data.options.defaultValue} type={props.data.options.type} tabPosition={props.data.options.tabPosition}>
            {
              props.data.columns.map((element, index0) => {
                return (
                  <SectorSelectElement
                    class={[ns.e('area')]}
                    tag='el-tab-pane' label={element.label} name={element.value} data={element} parent={props.data}
                  >
                    <LayoutDragGable
                      data-layout-type={'tabs-col'}
                      data={element.list}
                      ControlInsertion={true}
                      parent={element}/>
                  </SectorSelectElement>
                )
              })
            }
          </el-tabs>
        </SectorSelectElement>
      )
    }
  }
})

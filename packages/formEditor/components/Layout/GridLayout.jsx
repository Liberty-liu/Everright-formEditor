import { defineComponent, resolveComponent, watch, useAttrs, unref, inject } from 'vue'
import hooks from '@ER/hooks'
import SectorSelectElement from '@ER/formEditor/components/Sector/selectElement.jsx'
import LayoutDragGable, { dragGableWrap } from './DragGable.jsx'
export default defineComponent({
  name: 'GridLayout',
  inheritAttrs: false,
  customOptions: {},
  // components: {
  //   DragGable
  // },
  props: {
    data: Object,
    parent: Array
  },
  setup (props) {
    const ns = hooks.useNamespace('GridLayout')
    const {
      state,
      isPc
    } = hooks.useTarget()
    const handleMove = (evt, originalEvent) => {
      const {
        relatedContext: {
          element: {
            type
          }
        }
      } = evt
      return type === 'col'
    }
    // const tag = resolveComponent(unref(isPc) ? 'el-row' : 'van-cell-group')
    const tag = resolveComponent('el-row')
    return () => {
      const node = (
        <SectorSelectElement {...useAttrs()} hasWidthScale hasCopy hasAddCol hasDel hasDrag data={props.data} parent={props.parent}>
          <tag data-layout-type={'grid'} {...{
            gutter: props.data.options.gutter,
            justify: props.data.options.justify,
            align: props.data.options.align
            // inset: !state.isPc
          }} class={[ns.b()]}>
            {
              props.data.columns.map((element, index) => {
                return (
                  <SectorSelectElement
                    key={element.id}
                    hasCopy
                    hasDel={props.data.columns.length > 1}
                    hasWidthScale
                    // hasAddContainer
                    data-layout-type={'grid-col'}
                    tag={'el-col'}
                    class={[ns.e('area')]}
                    span={element.options.span}
                    offset={element.options.offset}
                    pull={element.options.pull}
                    push={element.options.push}
                    data={element}
                    parent={props.data.columns}
                  >
                    <LayoutDragGable
                      data={element.list}
                      data-layout-type={'grid-col'}
                      parent={element}
                      ControlInsertion={true}
                    />
                  </SectorSelectElement>
                )
              })
            }
          </tag>
        </SectorSelectElement>
      )
      return node
    }
  }
})

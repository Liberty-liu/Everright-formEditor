import { defineComponent, resolveComponent, watch, useAttrs, unref } from 'vue'
import hooks from '@ER/hooks'
import SectorSelectElement from '@ER/formEditor/components/Sector/selectElement.jsx'
import LayoutDragGable from './DragGable.jsx'
const isTrTag = (tagName) => tagName.toLocaleLowerCase() === 'td'
export default defineComponent({
  name: 'TableLayout',
  inheritAttrs: false,
  customOptions: {},
  props: {
    data: Object,
    parent: Array
  },
  setup (props) {
    const ns = hooks.useNamespace('TableLayout')
    const {
      isEditModel
    } = hooks.useTarget()
    return () => {
      const handleMousedown = (e, node) => {
        if (!isTrTag(e.target.tagName)) return false
        let curCell = ''
        if (e.target.offsetWidth - e.offsetX < 10) {
          curCell = e.target
          curCell.initClientX = e.clientX
          curCell.initWidth = curCell.offsetWidth
        }
        document.ondragstart = document.onselectstart = () => false
        document.onmousemove = (e) => {
          if (curCell.initWidth + (e.clientX - curCell.initClientX) > 0) {
            node.style.width = curCell.initWidth + (e.clientX - curCell.initClientX)
          }
        }
        document.onmouseup = function () {
          document.ondragstart = document.onselectstart = document.onmousemove = null
        }
      }
      const handleMousemove = (e) => {
        if (!isTrTag(e.target.tagName)) return false
        if (e.target.offsetWidth - e.offsetX < 10) {
          e.target.style.cursor = 'col-resize'
        } else {
          e.target.style.cursor = 'default'
        }
      }
      return (
        <SectorSelectElement {...useAttrs()} hasWidthScale hasCopy hasDel hasDrag hasDiscolor hasInserColumn hasInserRow data={props.data} parent={props.parent}>
          <table class={ns.b()}>
            <tbody>
            {
              props.data.rows.map((element, index0) => {
                return (
                  <tr key={element.id}>
                    {
                      element.columns.map((element1, index1) => {
                        const node = !element1.options.isMerged && (
                          <SectorSelectElement
                            tag="td"
                            key={element1.id}
                            data={element1}
                            parent={element}
                            hasTableCellOperator
                            hasDiscolor
                            colspan={element1.options.colspan}
                            rowspan={element1.options.rowspan}
                            onMousedown={(e) => !index0 && unref(isEditModel) && handleMousedown(e, element1)}
                            onMousemove={!index0 && unref(isEditModel) && handleMousemove}
                            width={element1.style && element1.style.width}
                          >
                            <LayoutDragGable
                              data-layout-type={'td'}
                              data={element1.list}
                              parent={element1}/>
                          </SectorSelectElement>
                        )
                        return node
                      })
                    }
                  </tr>
                )
              })
            }
            </tbody>
          </table>
        </SectorSelectElement>
      )
    }
  }
})

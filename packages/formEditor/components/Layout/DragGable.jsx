import {
  defineComponent,
  resolveComponent,
  watch,
  useAttrs,
  useSlots,
  defineAsyncComponent,
  unref,
  nextTick,
  ref,
  inject,
  reactive
} from 'vue'
import { isHTMLTag } from '@vue/shared'
import DragGable from 'vuedraggable'
import utils from '@ER/utils'
import hooks from '@ER/hooks'
import _ from 'lodash-es'
import LayoutGridLayout from './GridLayout'
import LayoutTabsLayout from './TabsLayout'
import LayoutCollapseLayout from './CollapseLayout'
import LayoutTableLayout from './TableLayout'
import LayoutInlineLayout from './InlineLayout'
import SectorSelectElement from '@ER/formEditor/components/Sector/selectElement.jsx'
import ControlInsertionPlugin from './ControlInsertionPlugin'
const dragGableWrap = defineComponent({
  inheritAttrs: false,
  name: 'customDragGable',
  customOptions: {},
  components: {
    DragGable
  },
  setup (props) {
    const {
      isEditModel
    } = hooks.useTarget()
    return () => {
      const attrs = useAttrs()
      let node = ''
      if (unref(isEditModel)) {
        node = (
          <dragGable
            {...attrs}>
            {useSlots()}
          </dragGable>
        )
      } else {
        const tag = isHTMLTag(attrs.tag) ? attrs.tag : resolveComponent(attrs.tag)
        const {
          item
        } = useSlots()
        node = (
          <tag {...attrs.componentData}>
            {attrs.list.map(e => {
              return item({
                element: e
              })
            })}
          </tag>
        )
      }
      return node
    }
  }
})
export {
  dragGableWrap
}
export default defineComponent({
  name: 'DragGableLayout',
  components: {
    // DragGable
  },
  props: {
    isRoot: {
      type: Boolean,
      default: false
    },
    data: Object,
    parent: Object,
    tag: {
      type: String,
      default: 'div'
    },
    type: {
      type: String
    }
  },
  setup (props) {
    const ER = inject('Everright')
    const isInline = props.type === 'inline'
    const ns = hooks.useNamespace('DragGableLayout')
    const {
      state,
      isEditModel,
      isPc,
      setSector
    } = hooks.useTarget()
    const handleMove = (e) => {
      return true
    }
    const dragOptions = {
      swapThreshold: 1,
      group: {
        name: 'er-Canves'
      },
      parent: props.parent,
      plugins: [ControlInsertionPlugin(ER)],
      ControlInsertion: true
    }
    const loadComponent = () => {
      let componentMap = {}
      watch(() => state.platform, () => {
        componentMap = {}
      })
      return {
        findComponent (type, element) {
          let info = componentMap[type + element]
          if (!info) {
            info = componentMap[type + element] = defineAsyncComponent(() => import(`../${type}/${_.startCase(element)}/${state.platform}.vue`))
          }
          return info
        }
      }
    }
    const load = loadComponent()
    const slots = {
      item: ({ element }) => {
        let node = ''
        switch (element.type) {
          case 'grid':
            node = (<LayoutGridLayout key={element.id} data={element} parent={props.data}></LayoutGridLayout>)
            break
          case 'table':
            node = (<LayoutTableLayout key={element.id} data={element} parent={props.data}></LayoutTableLayout>)
            break
          case 'tabs':
            node = (<LayoutTabsLayout key={element.id} data={element} parent={props.data}></LayoutTabsLayout>)
            break
          case 'collapse':
            node = (<LayoutCollapseLayout key={element.id} data={element} parent={props.data}></LayoutCollapseLayout>)
            break
          case 'inline':
            node = (<LayoutInlineLayout key={element.id} data={element} parent={props.data}></LayoutInlineLayout>)
            break
          default:
            let TypeComponent = ''
            const typeProps = hooks.useProps(state, element, unref(isPc))
            TypeComponent = load.findComponent('FormTypes', element.type)
            if (unref(isPc)) {
              node = (
                <SectorSelectElement hasWidthScale hasCopy hasDel hasDrag hasMask data={element} parent={props.data}>
                  {
                    element.type !== 'divider'
                      ? (<el-form-item
                        {...typeProps.value}
                      >
                        <TypeComponent data={element} params={typeProps.value}></TypeComponent>
                      </el-form-item>)
                      : <TypeComponent data={element} params={typeProps.value}></TypeComponent>
                  }
                </SectorSelectElement>
              )
            } else {
              node = (
                <SectorSelectElement hasWidthScale hasCopy hasDel hasDrag hasMask data={element} parent={props.data}>
                  <TypeComponent data={element} params={typeProps.value}></TypeComponent>
                </SectorSelectElement>
              )
            }
            break
        }
        return node
      },
      footer () {
        let node = ''
        if (_.isEmpty(props.data)) {
          if (!props.isRoot) {
            node = (
              <div class={ns.e('dropHere')}>
                Drop here
              </div>
            )
          }
        }
        return node
      }
    }
    return () => {
      return (
        <dragGableWrap
          list={props.data}
          handle=".handle"
          class={[ns.b(), unref(isEditModel) && ns.e('edit')]}
          tag={props.tag}
          item-key="id"
          move={handleMove}
          {...dragOptions}
          v-slots={slots}
          componentData={useAttrs()}
        >
        </dragGableWrap>
      )
    }
  }
})

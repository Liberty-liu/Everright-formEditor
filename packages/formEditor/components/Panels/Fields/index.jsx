import hooks from '@ER/hooks'
import utils from '@ER/utils'
import { dragGableWrap } from '@ER/formEditor/components/Layout/DragGable.jsx'
import { inject, ref, reactive, nextTick } from 'vue'
import _ from 'lodash-es'
import Icon from '@ER/icon'
import ControlInsertionPlugin from '../../Layout/ControlInsertionPlugin.js'
import { nanoid } from 'nanoid'
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
    // console.log(t('lhf'))
    const {
      state,
      setSelection
    } = hooks.useTarget()
    const addStore = (element) => {
      const newElement = reactive(ER.wrapElement(_.cloneDeep(element)))
      state.store.push(newElement)
      utils.addContext(newElement, state.store)
      nextTick(() => {
        setSelection(newElement)
        setTimeout(() => {
          ER.canvesScrollRef.value.setScrollTop(ER.canvesScrollRef.value.wrapRef.scrollHeight)
        }, 100)
      })
    }
    const slots = {
      item: ({ element }) => {
        return (
          <li onClick={() => addStore(element)}>
            <Icon class={[ns.e('icon')]} icon={element.icon}></Icon>
            <span>{utils.fieldLabel(t, element)}</span>
          </li>
        )
      }
    }
    const handleClone = (element) => {
      // return wrapElement(element)
      return _.cloneDeep(element)
    }
    const handleMove = (evt, originalEvent) => {
      return true
    }
    const dragOptions = {
      ControlInsertion: true,
      dataSource: 'block',
      direction: 'horizontal',
      scroll: false,
      plugins: [ControlInsertionPlugin(ER)]
    }
    return () => {
      return (
        <ElAside class={[ns.b()]} width={ER.props.blockPanelWidth}>
          <el-scrollbar>
            <el-menu
              default-openeds={ER.props.blockPanelDefaultOpeneds}>
              {ER.props.fieldsConfig.map((element, index) => {
                return (
                  <el-sub-menu
                    index={element.id}
                    v-slots={{
                      title () {
                        return t(`er.fields.${element.id}`)
                      },
                      default () {
                        return (
                          <dragGableWrap
                            class={[ns.e('dragContent')]}
                            list={element.list}
                            clone={handleClone}
                            tag="ul"
                            sort={false}
                            move={handleMove}
                            {...dragOptions}
                            group={
                              { name: 'er-Canves', pull: 'clone', put: false }
                            }
                            item-key="null"
                            v-slots={slots}
                          >
                          </dragGableWrap>
                        )
                      }
                    }}
                  >
                  </el-sub-menu>
                )
              })}
            </el-menu>
          </el-scrollbar>
          {/* <DeviceSwitch justifyContent={'flex-end'}></DeviceSwitch> */}
        </ElAside>
      )
    }
  }
}

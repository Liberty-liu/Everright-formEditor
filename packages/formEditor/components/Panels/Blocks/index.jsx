import hooks from '@ER/hooks'
import utils from '@ER/utils'
import NAME from '@ER/formEditor/name.js'
import { dragGableWrap } from '@ER/formEditor/components/Layout/DragGable.jsx'
import { inject, ref, reactive, nextTick } from 'vue'
import _ from 'lodash-es'
import Icon from '@ER/icon'
import DeviceSwitch from '@ER/formEditor/components/DeviceSwitch.vue'
import ControlInsertionPlugin from '../../Layout/ControlInsertionPlugin.js'
import { nanoid } from 'nanoid'
export default {
  name: NAME.ERBLOCKS,
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
    const ns = hooks.useNamespace('Blocks')
    const {
      state,
      setSector
    } = hooks.useTarget()
    const avargeTask = () => {
      const total = 24
      const count = state.sector.columns.length
      const base = Math.floor(total / count)
      const rest = total % count

      // let result = [];
      for (let i = 0; i < count; i++) {
        state.sector.columns[i].options.span = base + (i < rest ? 1 : 0)
        // result.push(base + ( i < rest ? 1 : 0 ))
      }
      // result.for
      // return result
    }
    const insideType = ref([0])
    const radio1 = ref('2')
    const addElement = (columns, element) => {
      columns.forEach(e => {
        if (e === -1) {
          state.sector.columns.push(
            {
              options: {
                span: 24
              },
              type: 'col',
              list: [
                _.clone(element)
              ]
            }
          )
        } else {
          state.sector.columns[e].list.push(_.clone(element))
        }
      })
      avargeTask()
    }
    const addStore = (element) => {
      const newElement = reactive(ER.wrapElement(_.cloneDeep(element)))
      state.store.push(newElement)
      utils.addContext(newElement, state.store)
      nextTick(() => {
        setSector(newElement)
      })
    }
    const slots = {
      item: ({ element }) => {
        return (
          <li onClick={() => addStore(element)}>
            <Icon class={[ns.e('icon')]} icon={element.icon}></Icon>
            {element.label}
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
    const renderType = () => {
      if (state.sector.type !== 'grid') return false
      const ownCheckboxs = state.sector.columns.map((e, index) => index)
      ownCheckboxs.push(-1)
      return (
        <div>
          <el-radio-group vModel={radio1.value}>
            <el-radio label="1" size="large">After</el-radio>
            <el-radio label="2" size="large">Inside</el-radio>
          </el-radio-group>
          {radio1.value === '2' && (
            <el-checkbox-group v-model={insideType.value}>
              {
                ownCheckboxs.map((item, index) => {
                  let context = `第${index + 1}列`
                  if (index === ownCheckboxs.length - 1) {
                    context = '新增列'
                  }
                  return <el-checkbox label={item}>{context}</el-checkbox>
                })
              }
            </el-checkbox-group>
          )}
        </div>
      )
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
        <ElAside class={[ns.b()]} width="300px">
          <el-scrollbar>
            <el-menu
              default-openeds={['0', '1']}>
              {state.blocks.map((element, index) => {
                return (
                  <el-sub-menu
                    index={String(index)}
                    v-slots={{
                      title () {
                        return element.name
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
          <DeviceSwitch justifyContent={'flex-end'}></DeviceSwitch>
        </ElAside>
      )
    }
  }
}

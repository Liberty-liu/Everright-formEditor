import {
  defineComponent,
  useAttrs,
  unref,
  inject,
  onBeforeUnmount
} from 'vue'
import Selection from '@ER/formEditor/components/Selection/selectElement.jsx'
import LayoutDragGable from './DragGable.jsx'
import hooks from '@ER/hooks'
import _ from 'lodash-es'
import utils from '@ER/utils'
import Icon from '@ER/icon'
export default defineComponent({
  name: 'SubformLayout',
  inheritAttrs: false,
  customOptions: {},
  props: {
    data: Object,
    parent: Array
  },
  setup (props) {
    const ER = inject('Everright')
    const ExtraParams = inject('EverrightExtraParams', {})
    const ns = hooks.useNamespace('SubformLayout')
    const {
      state,
      isEditModel,
      isPc,
      setSelection
    } = hooks.useTarget()
    const typeProps = hooks.useProps(state, props.data, unref(isPc))
    const addData = unref(isEditModel) ? [] : _.cloneDeep(props.data.list[0])
    const handleAdd = () => {
      props.data.list.splice(props.data.list.length, 0, _.cloneDeep(addData))
      // console.log(props.data.list)
      // console.log(props.data.list[props.data.list.length - 1])
      props.data.list[props.data.list.length - 1].forEach(e => {
        utils.addContext(e, props.data)
      })
    }
    const clearList = () => {
      props.data.list.splice(0, props.data.list.length)
    }
    const setList = (length, values) => {
      clearList()
      for (let i = 0; i < length; i++) {
        handleAdd()
      }
      props.data.list.forEach((e, index) => {
        e.forEach(e => {
          e.columns.forEach(e => {
            if (props.data.options.defaultValue) {
              try {
                ER.setValue(e, values[index][e.key])
              } catch (e) {
              }
            }
          })
        })
      })
    }
    if (!unref(isEditModel)) {
      onBeforeUnmount(() => {
        props.data.list[0] = addData
      })
      clearList()
      if (ER.state.remoteValues.has(props.data.key)) {
        const values = ER.state.remoteValues.get(props.data.key)
        setList(values.length, values)
      } else {
        if (props.data.options.defaultValue.length) {
          setList(props.data.options.defaultValue.length, props.data.options.defaultValue)
        }
      }
    }
    if (ExtraParams.inSubformDefaultValueComponent) {
      ExtraParams.handle.handleAdd = handleAdd
    }
    const params = {
      hasCopy: true,
      hasDel: true,
      hasDrag: true,
      hasWidthScale: true,
      data: props.data,
      parent: props.parent
    }
    if (process.env.NODE_ENV === 'test') {
      params['data-field-id'] = `${props.data.id}`
    }
    return () => {
      return (
        <Selection
          {...useAttrs()}
          {
            ...params
          }
        >
          <div class={ns.b()}>
            <el-form-item
              {...typeProps.value}
            >
              <div
                class={[ns.e('content')]}
              >
                {
                  props.data.list.map((node, index) =>
                    (
                      <div
                        class={[
                          ns.e('item'),
                          !unref(isEditModel) && !typeProps.value.disabled && ns.e('edit')
                        ]}
                        {...utils.addTestId('SubformLayout:item')}
                      >
                        <div
                          class={[ns.e('button')]}>
                          <el-button
                            size="large"
                            circle
                          >
                            {index + 1}
                          </el-button>
                          <el-button
                            size="large"
                            circle
                            type="danger"
                            onClick={() => props.data.list.splice(index, 1)}
                            icon={<Icon class={[ns.e('icon')]} icon="delete"></Icon>}
                          >
                          </el-button>
                        </div>
                        <LayoutDragGable
                          data-layout-type={'subform'}
                          data={node}
                          ControlInsertion={true}
                          parent={props.data}/>
                      </div>
                    ))
                }
                {
                  (!typeProps.value.disabled && !ExtraParams.inSubformDefaultValueComponent && addData.length)
                    ? (<div
                  class={[ns.e('addButton')]}
                  {...utils.addTestId('SubformLayout:addButton')}
                >
                  <el-button
                    link
                    type="primary"
                    onClick={!unref(isEditModel) && handleAdd}
                  >
                    Add new
                  </el-button>
                </div>)
                    : ''
                }
              </div>
            </el-form-item>
          </div>
        </Selection>
      )
    }
  }
})

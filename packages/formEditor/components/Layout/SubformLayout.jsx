import {
  defineComponent,
  useAttrs,
  unref
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
      props.data.list.splice(props.data.list.length, 0, addData)
      props.data.list[props.data.list.length - 1].forEach(e => {
        utils.addContext(e, props.data)
      })
    }
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
                  props.data.list.map((node, index) =>
                    (
                      <div
                        class={[ns.e('item')]}
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
                <el-button
                  link
                  type="primary"
                  onClick={handleAdd}
                >
                  Add new
                </el-button>
              </div>
            </el-form-item>
          </div>
        </Selection>
      )
    }
  }
})

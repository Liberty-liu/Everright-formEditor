import { computed, defineComponent, resolveComponent } from 'vue'
import utils from '@ER/utils'
import hooks from '@ER/hooks'
import { nanoid } from 'nanoid'
import DragGable from 'vuedraggable'
import Icon from '@ER/icon'
const ns = hooks.useNamespace('ConfigDataPanel')
export default defineComponent({
  name: 'ConfigDataPanel',
  inheritAttrs: false,
  customOptions: {},
  components: {
    DragGable
  },
  setup () {
    const {
      type,
      checkTypeBySelected,
      target
    } = hooks.useTarget()
    const handleClick = (type, node, data) => {
      switch (type) {
        case 1:
          const newChild = { value: nanoid(), label: 'testtest', children: [] }
          if (!data.children) {
            data.children = []
          }
          data.children.push(newChild)
          node.expanded = true
          break
        case 2:
          const parent = node.parent
          const children = parent.data.children || parent.data
          const index = children.findIndex((d) => d.value === data.value)
          children.splice(index, 1)
          break
        default:
      }
    }
    const data = computed(() => {
      let result = []
      if (checkTypeBySelected(['tabs', 'collapse'])) {
        result = target.value.columns
      } else {
        result = target.value.options.options
      }
      return result
    })
    const isMultiple = computed(() => {
      let result = true
      switch (type.value) {
        case 'collapse':
        case 'transfer':
          result = true
          break
        case 'select':
        case 'cascader':
          result = target.value.options.multiple
          break
        case 'tabs':
        case 'radio':
          result = false
          break
      }
      return result
    })
    const handleAction = (type) => {
      switch (type) {
        case 1:
          data.value.push(...utils.generateOptions(1))
          break
        case 2:
          target.value.options.defaultValue = isMultiple.value ? [] : ''
          break
      }
    }
    const renderCascaderPanel = (renderNodeGroup) => {
      const slots = {
        default ({ node, data }) {
          return (
            <div class={[ns.e('treeContent')]}>
              <el-input vModel={data.label} size="small"></el-input>
              <span>
                <Icon onClick={() => handleClick(1, node, data)} class={[ns.e('icon')]} icon="zengjia"></Icon>
                <Icon onClick={() => handleClick(2, node, data)} class={[ns.e('icon')]} icon="delete"></Icon>
              </span>
            </div>
          )
        }
      }
      return (
        <div>
          <el-tree
            class={[ns.e('tree')]}
            draggable
            expand-on-click-node={false}
            data={data.value}
            node-key="value"
            v-slots={slots}
          />
          <el-button text onClick={() => handleAction(1)}>添加</el-button>
        </div>
      )
    }
    const nodes = (node) => {
      const renderNodeGroup = resolveComponent(`${node}-group`)
      const slots = {
        item: ({ element }) => {
          const renderNode = resolveComponent(`${node}`)
          return (
            <el-row align="middle" gutter={4}>
              <el-col span={10}>
                <renderNode label={element.value}>
                  <el-input vModel={element.value}></el-input>
                </renderNode>
              </el-col>
              <el-col span={8}>
                <el-input vModel={element.label}></el-input>
              </el-col>
              <el-col span={6}>
                <Icon class={[ns.e('icon'), 'handle']} icon="move"></Icon>
                <Icon class={[ns.e('icon'), 'handle']} icon="delete"></Icon>
              </el-col>
            </el-row>
          )
        },
        footer: () => {
          return (
            <div>
              <el-button text onClick={() => handleAction(1)}>添加</el-button>
              <el-button text onClick={() => handleAction(2)}>清空默认值</el-button>
            </div>
          )
        }
      }

      return checkTypeBySelected(['cascader'])
        ? renderCascaderPanel(renderNodeGroup)
        : (
        <renderNodeGroup
          vModel={target.value.options.defaultValue}
          class={[ns.b()]}
        >
          <dragGable
            list={data.value}
            handle=".handle"
            tag="div"
            item-key="value"
            v-slots={slots}
          >
          </dragGable>
        </renderNodeGroup>
          )
    }
    return () => {
      return <div>
        <el-scrollbar height="400px">
          {nodes(isMultiple.value ? 'el-checkbox' : 'el-radio')}
        </el-scrollbar>
      </div>
    }
  }
})

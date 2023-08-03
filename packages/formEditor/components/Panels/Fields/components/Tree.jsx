import hooks from '@ER/hooks'
import utils from '@ER/utils'
import { inject, computed, defineComponent } from 'vue'
import _ from 'lodash-es'
import Icon from '@ER/icon'
export default defineComponent({
  name: 'TreePanel',
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
    const ns = hooks.useNamespace('TreePanel')
    const {
      t
    } = hooks.useI18n()
    const flatNodes = (nodes, leafOnly = false) => {
      return nodes.reduce((res, node) => {
        // if (node.isLeaf) {
        //   res.push(node)
        // } else {
        //   !leafOnly && res.push(node)
        //   res = res.concat(flatNodes(node.children, leafOnly))
        // }
        return res
      }, [])
    }
    // const data = computed(() => {
    //   if (ER.state.store.length) {
    //     // console.log(ER.state.store[0].context.root)
    //     // console.log(ER.state.store[0].columns[0].context.root)
    //     console.log(ER.state.store)
    //     console.log(flatNodes(ER.state.store))
    //   }
    //   return []
    // })
    const renderTreeNode = (node) => {
      console.log(node)
      const childNodes = node.list || node.rows || node.columns || node.children || []
      return (
        <div>
          <div>{node.label}</div>
          <div>
            {
              childNodes.map(node => renderTreeNode(node))
            }
          </div>
        </div>
      )
      // return childNodes.map(node => {
      //   return (
      //     <div>123</div>
      //   )
      // })
    }
    // const treeData = computed(() => {
    //   const result = []
    //   if (ER.state.store.length) {
    //     console.log(result)
    //   }
    //   return result
    // })
    const config = {
      children: (data, node) => {
        return data.list || data.rows || data.columns || data.children || []
      },
      label: (data, node) => {
        let result = ''
        // switch (data.type) {
        //   case 'inline':
        //     result = data.columns
        //     // result = ''
        //     break
        // }
        // console.log(data)
        if (/^(col|collapseCol|tabsCol|td|inline)$/.test(data.type)) {
          result = t(`er.layout.${data.type}`)
        } else {
          result = utils.fieldLabel(t, data)
        }
        return result
      }
    }
    return () => {
      return (
        <el-tree
          data={_.cloneDeep(ER.state.store)}
          props={config}
        />
      )
      // return ER.state.store.map(node => renderTreeNode(node))
      // return ER.state.store.map(node => renderTreeNode(node))
    }
  }
})

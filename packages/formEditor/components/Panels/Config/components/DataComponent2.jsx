import { computed, defineComponent, resolveComponent, unref, ref, watch, reactive, defineExpose, nextTick } from 'vue'
import utils from '@ER/utils'
import hooks from '@ER/hooks'
import Icon from '@ER/icon'
import { dragGableWrap } from '@ER/formEditor/components/Layout/DragGable.jsx'
import _ from 'lodash-es'
import nzhcn from 'nzh/cn'
export default defineComponent({
  name: 'ConfigData2',
  inheritAttrs: false,
  customOptions: {},
  data () {
    const len = 8
    return {
      len,
      data: new Array(len).fill([]),
      shows: new Array(len).fill(false),
      selected: new Array(len),
      scrollbars: []
    }
  },
  computed: {
    isMultiple () {
      let result = false
      const {
        state,
        target,
        type
      } = hooks.useTarget()
      switch (type.value) {
        case 'checkbox':
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
    }
  },
  created () {
    const {
      state,
      target
    } = hooks.useTarget()
    this.data[0] = _.cloneDeep(state.data[target.value.options.dataKey].list)
    // this.data[0].forEach(e => {
    //   utils.deepTraversal(e, (node) => {
    //     Object.defineProperty(node, 'Selected', {
    //       value: false,
    //       writable: true,
    //       enumerable: false,
    //       configurable: true
    //     })
    //   })
    // })
    this.shows[0] = true
    // if (this.isMultiple) {
    //   this.checkList = _.cloneDeep(target.value.options.defaultValue)
    // } else {
    //   this.checkList = [target.value.options.defaultValue]
    // }
  },
  methods: {
    getData () {
      return new Promise((resolve, reject) => {
        resolve({
          data: _.cloneDeep(this.data[0])
        })
      })
    }
  },
  render (props) {
    const ns = hooks.useNamespace('ConfigData2')
    const handleAction = (type, x, data) => {
      switch (type) {
        case 1:
          data.push(...utils.generateOptions(1))
          nextTick(() => {
            this.scrollbars[x].setScrollTop(this.scrollbars[x].wrapRef.scrollHeight)
          })
          break
        case 2:
          if (x >= this.len) return false
          this.selected[x] = data.value
          this.shows.forEach((e, i) => {
            if (i > x + 1) {
              this.shows[i] = false
              this.data[i] = []
            }
            if (i > x) {
              this.selected[i] = ''
            }
          })
          this.shows[x + 1] = true
          if (!data.children) {
            data.children = []
          }
          this.data[x + 1] = data.children
          break
        case 3:
          data.disabled = !data.disabled
          this.shows.forEach((e, i) => {
            if (i > x) {
              this.shows[i] = false
              this.data[i] = []
              this.selected[i] = ''
            }
          })
          break
      }
    }
    const listComponent = ({ items, index }) => {
      return (
        <div class={[ns.e('item')]}>
          <div class={ns.e('title')}>{nzhcn.encodeS(index + 1)}级选项</div>
          <div>
            <el-scrollbar ref={(el) => this.scrollbars.push(el)} tag="ul" max-height="320px">
              {
                items.map((e, i) => {
                  return (
                    <li>
                      <div class={[ns.e('input'), this.selected.includes(e.value) && ns.is('Selected')]}>
                        <el-input
                          clearable
                          size="default"
                          disabled={e.disabled}
                          onClick={() => handleAction(2, index, e)}
                          vModel={e.label}></el-input>
                        <el-icon onClick={() => items.splice(i, 1)} color="#fff" size={10} class={ns.e('del')}>
                          <Minus/>
                        </el-icon>
                        <el-icon onClick={() => handleAction(3, index, e)} color="#409eff" size={20} class={[ns.e('hide'), e.disabled && ns.e('show')]}>
                          {
                            e.disabled ? <Hide/> : <View/>
                          }
                        </el-icon>
                      </div>
                    </li>
                  )
                })
              }
            </el-scrollbar>
          </div>
          {this.shows[index] && (
            <div class={[ns.e('control')]}>
              <el-button
                icon={'CirclePlus'}
                onClick={() => handleAction(1, index, items)}
                text>
                添加选项
              </el-button>
            </div>
          )}
        </div>
      )
    }
    return (
      <el-scrollbar ref="scrollbar">
        <div class={[ns.b()]}>
          {this.data.map((e, index) => {
            return (
              <listComponent ref="listComponent" items={e} index={index}/>
            )
          })}
        </div>
      </el-scrollbar>
    )
  }
})

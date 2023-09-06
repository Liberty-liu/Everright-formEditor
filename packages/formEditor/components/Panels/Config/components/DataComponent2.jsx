import { computed, defineComponent, resolveComponent, unref, ref, watch, reactive, defineExpose, nextTick, h } from 'vue'
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
    if (state.mode === 'config') {
      this.data[0] = target.value.options.data = target.value.options.data || [...utils.generateOptions(3)]
    } else {
      this.data[0] = _.cloneDeep(state.data[target.value.options.dataKey].list)
    }
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
    const {
      t,
      lang
    } = hooks.useI18n()
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
          <div class={ns.e('title')}>{lang.value === 'zh-cn' ? `${nzhcn.encodeS(index + 1)}${t('er.config.dataComponent2.level')}` : `${t('er.config.dataComponent2.level')} ${index + 1}`}</div>
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
                          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728=""><path fill="currentColor" d="M128 544h768a32 32 0 1 0 0-64H128a32 32 0 0 0 0 64z"></path></svg>
                        </el-icon>
                        <el-icon onClick={() => handleAction(3, index, e)} color="#409eff" size={20} class={[ns.e('hide'), e.disabled && ns.e('show')]}>
                          {
                            e.disabled ? <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728=""><path d="M876.8 156.8c0-9.6-3.2-16-9.6-22.4-6.4-6.4-12.8-9.6-22.4-9.6-9.6 0-16 3.2-22.4 9.6L736 220.8c-64-32-137.6-51.2-224-60.8-160 16-288 73.6-377.6 176C44.8 438.4 0 496 0 512s48 73.6 134.4 176c22.4 25.6 44.8 48 73.6 67.2l-86.4 89.6c-6.4 6.4-9.6 12.8-9.6 22.4 0 9.6 3.2 16 9.6 22.4 6.4 6.4 12.8 9.6 22.4 9.6 9.6 0 16-3.2 22.4-9.6l704-710.4c3.2-6.4 6.4-12.8 6.4-22.4Zm-646.4 528c-76.8-70.4-128-128-153.6-172.8 28.8-48 80-105.6 153.6-172.8C304 272 400 230.4 512 224c64 3.2 124.8 19.2 176 44.8l-54.4 54.4C598.4 300.8 560 288 512 288c-64 0-115.2 22.4-160 64s-64 96-64 160c0 48 12.8 89.6 35.2 124.8L256 707.2c-9.6-6.4-19.2-16-25.6-22.4Zm140.8-96c-12.8-22.4-19.2-48-19.2-76.8 0-44.8 16-83.2 48-112 32-28.8 67.2-48 112-48 28.8 0 54.4 6.4 73.6 19.2L371.2 588.8ZM889.599 336c-12.8-16-28.8-28.8-41.6-41.6l-48 48c73.6 67.2 124.8 124.8 150.4 169.6-28.8 48-80 105.6-153.6 172.8-73.6 67.2-172.8 108.8-284.8 115.2-51.2-3.2-99.2-12.8-140.8-28.8l-48 48c57.6 22.4 118.4 38.4 188.8 44.8 160-16 288-73.6 377.6-176C979.199 585.6 1024 528 1024 512s-48.001-73.6-134.401-176Z" fill="currentColor"></path><path d="M511.998 672c-12.8 0-25.6-3.2-38.4-6.4l-51.2 51.2c28.8 12.8 57.6 19.2 89.6 19.2 64 0 115.2-22.4 160-64 41.6-41.6 64-96 64-160 0-32-6.4-64-19.2-89.6l-51.2 51.2c3.2 12.8 6.4 25.6 6.4 38.4 0 44.8-16 83.2-48 112-32 28.8-67.2 48-112 48Z" fill="currentColor"></path></svg> : <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728=""><path fill="currentColor" d="M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352zm0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448zm0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160z"></path></svg>
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
                icon={h('svg', {
                  viewBox: '0 0 1024 1024',
                  xmlns: 'http://www.w3.org/2000/svg'
                },
                h('path', {
                  fill: 'currentColor',
                  d: 'M352 480h320a32 32 0 1 1 0 64H352a32 32 0 0 1 0-64z'
                }),
                h('path', {
                  fill: 'currentColor',
                  d: 'M480 672V352a32 32 0 1 1 64 0v320a32 32 0 0 1-64 0z'
                }),
                h('path', {
                  fill: 'currentColor',
                  d: 'M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z'
                })
                )}
                onClick={() => handleAction(1, index, items)}
                text>
                {t('er.config.dataComponent2.add')}
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

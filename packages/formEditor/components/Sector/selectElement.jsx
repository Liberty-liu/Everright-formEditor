import {
  withModifiers,
  resolveComponent,
  ref,
  useSlots,
  onMounted,
  useAttrs,
  unref,
  onBeforeUnmount,
  inject,
  computed
} from 'vue'
import { isHTMLTag } from '@vue/shared'
import hooks from '@ER/hooks'
import utils from '@ER/utils'
import _ from 'lodash-es'
import Icon from '@ER/icon'
export default {
  name: 'SelectElement',
  inheritAttrs: false,
  customOptions: {},
  props: {
    data: Object,
    tag: {
      type: String,
      default: 'div'
    },
    parent: Object,
    hasMask: {
      type: Boolean,
      default: false
    },
    hasDrag: {
      type: Boolean,
      default: false
    },
    hasDel: {
      type: Boolean,
      default: false
    },
    hasCopy: {
      type: Boolean,
      default: false
    },
    hasTableCellOperator: {
      type: Boolean,
      default: false
    },
    hasWidthScale: {
      type: Boolean,
      default: false
    },
    hasInserColumn: {
      type: Boolean,
      default: false
    },
    hasInserRow: {
      type: Boolean,
      default: false
    },
    hasAddCol: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const ER = inject('Everright')
    const {
      t
    } = hooks.useI18n()
    const ns = hooks.useNamespace('selectElement')
    const isHover = ref(false)
    const isInlineChildren = utils.checkIslineChildren(props.data)
    const {
      target,
      setSector,
      state,
      isEditModel,
      isSelectRoot,
      isPc
    } = hooks.useTarget()
    const id = hooks.useCss(props.data, state.platform)
    const visible = ref(false)
    const slots = useSlots()
    const isWarning = ref(false)
    const isField = utils.checkIsField(props.data)
    const handleClick = (e) => {
      setSector(props.data)
    }
    if (props.data.type && isField) {
      state.validateStates.push({
        data: props.data,
        isWarning
      })
    }
    onBeforeUnmount(() => {
      const index = _.findIndex(state.validateStates, { data: { id: props.data.id } })
      if (index !== -1) {
        state.validateStates.splice(index, 1)
      }
    })
    const handleCommand = (command) => {
      const [fn, param] = command.split(' ')
      props.data.context[fn](param)
    }
    const isShowCell = ref(false)
    const renderTableCellOperator = () => {
      const slots = {
        dropdown: () => {
          let node = (
            <el-dropdown-menu>
              <el-dropdown-item command="insert left">{t('er.sector.insertLeft')}</el-dropdown-item>
              <el-dropdown-item command="insert right">{t('er.sector.insertRight')}</el-dropdown-item>
              <el-dropdown-item command="insert top">{t('er.sector.insertTop')}</el-dropdown-item>
              <el-dropdown-item command="insert bottom">{t('er.sector.insertBottom')}</el-dropdown-item>
              <el-dropdown-item command="merge left" disabled={props.data.context.isDisableMargeLeft} divided>{t('er.sector.mergeLeft')}</el-dropdown-item>
              <el-dropdown-item command="merge right" disabled={props.data.context.isDisableMargeRight}>{t('er.sector.mergeRight')}</el-dropdown-item>
              <el-dropdown-item command="merge row" disabled={props.data.context.isDisableMargeRow}>{t('er.sector.mergeRow')}</el-dropdown-item>
              <el-dropdown-item command="merge top" disabled={props.data.context.isDisableMargeTop} divided>{t('er.sector.mergeTop')}</el-dropdown-item>
              <el-dropdown-item command="merge bottom" disabled={props.data.context.isDisableMargeBottom}>{t('er.sector.mergeBottom')}</el-dropdown-item>
              <el-dropdown-item command="merge column" disabled={props.data.context.isDisableMargeColumn}>{t('er.sector.mergeColumn')}</el-dropdown-item>
              <el-dropdown-item command="del row" divided disabled={props.data.context.isDisableDelRow}>{t('er.sector.delRow')}</el-dropdown-item>
              <el-dropdown-item command="del column" disabled={props.data.context.isDisableDelColumn}>{t('er.sector.delColumn')}</el-dropdown-item>
              <el-dropdown-item command="split column" disabled={props.data.context.isDisableSplitColumn} divided>{t('er.sector.splitColumn')}</el-dropdown-item>
              <el-dropdown-item command="split row" disabled={props.data.context.isDisableSplitRow}>{t('er.sector.splitRow')}</el-dropdown-item>
            </el-dropdown-menu>
          )
          if (!isShowCell.value) {
            node = ''
          }
          return node
        }
      }
      return (
        <el-dropdown
          trigger="hover"
          onCommand={handleCommand}
          onVisible-change={(val) => {
            isShowCell.value = val
            if (!val) {
              isHover.value = false
            }
          }}
          v-slots={slots}>
          <Icon class={[ns.e('tableOperator')]} icon="tableOperation"></Icon>
        </el-dropdown>
      )
    }
    const handleAction = (type) => {
      const index = type !== 5 && props.parent.indexOf(props.data)
      switch (type) {
        case 1:
          if (ER.props.delHandle(props.data) === false) return false
          props.data.context.delete()
          utils.deepTraversal(props.data, (node) => {
            if (utils.checkIsField(node)) {
              ER.delField(node)
            }
          })
          if (/^(radio|checkbox|select)$/.test(props.data.type)) {
            delete state.data[props.data.options.dataKey]
          }
          if (props.parent.length > 0) {
            if (index === props.parent.length) {
              // state.sector = props.parent[index - 1]
              setSector(props.parent[index - 1])
            } else {
              // state.sector = props.parent[index]
              setSector(props.parent[index])
            }
          } else {
            setSector('root')
            // state.sector = {}
          }
          break
        case 2:
          props.data.context.copy()
          const copyData = props.parent[index + 1]
          setSector(copyData)
          utils.deepTraversal(copyData, (node) => {
            ER.addFieldData(node, true)
            if (utils.checkIsField(node)) {
              ER.addField(node)
            }
          })
          // console.log(props.parent[index + 1])
          // ER.addField()
          // state.sector = props.parent[index + 1]
          break
        case 3:
          _.last(props.data.context.columns[0]).context.insert('bottom')
          break
        case 4:
          _.last(props.data.context.columns)[0].context.insert('right')
          break
        case 5:
          let parent = props.data.context.parent
          if (/^(inline)$/.test(parent.type)) {
            parent = parent.context.parent
          } else if (/^(tr)$/.test(parent.type)) {
            parent = parent.context.parent.context.parent
          }
          setSector(Array.isArray(parent) ? 'root' : parent)
          break
        case 6:
          props.data.context.appendCol()
          break
      }
    }
    const elementRef = ref()
    const widthScaleElement = ref()
    const isScale = ref(false)
    const isShowWidthScale = computed(() => props.hasWidthScale && !(ER.props.layoutType === 1 && !isPc.value))
    onMounted(() => {
      if (!unref(isEditModel)) return false
      const hoverEl = elementRef.value.$el || elementRef.value
      const widthScaleEl = widthScaleElement.value
      hoverEl.addEventListener('mouseover', (e) => {
        if (!state.widthScaleLock) {
          isHover.value = true
        }
        e.stopPropagation()
      })
      hoverEl.addEventListener('mouseout', (e) => {
        // console.log(elementRef.value.contains(e.target))
        if (isShowCell.value) return false
        isHover.value = false
        e.stopPropagation()
      })
      if (isShowWidthScale.value) {
        // if (!hoverEl.offsetParent) return false
        widthScaleEl.addEventListener('mousedown', (e) => {
          const columnWidth = hoverEl.offsetParent.offsetWidth / 24
          state.widthScaleLock = isScale.value = true
          const oldX = e.clientX
          const oldWidth = hoverEl.offsetWidth
          document.ondragstart = document.onselectstart = () => false
          document.onmouseup = function () {
            document.ondragstart = document.onselectstart = document.onmousemove = null
            state.widthScaleLock = isScale.value = false
          }
          document.onmousemove = (e) => {
            if (!isInlineChildren) {
              let offset = Math.ceil((oldWidth + Math.round((e.clientX - oldX) / columnWidth) * columnWidth) / columnWidth)
              if (offset >= 24) {
                offset = 24
              }
              if (offset <= 6) {
                offset = 6
              }
              props.data.options.span = offset
            } else {
              // const isFieldWidth = _.isObject(props.data.style.width)
              const curNewWidth = oldWidth + e.clientX - oldX
              let curWidth = Math.round(curNewWidth / hoverEl.parentNode.offsetWidth * 100)
              if (curWidth <= 25) {
                curWidth = 25
              }
              utils.syncWidthByPlatform(props.data, state.platform, false, curWidth)
            }
          }
        })
      }
    })
    const TagComponent = isHTMLTag(props.tag) ? props.tag : resolveComponent(props.tag)
    const Selected = computed(() => {
      return target.value.id === props.data.id && ns.is('Selected')
    })
    let maskNode = (
      <div class={[ns.e('mask')]}>
      </div>
    )
    if (props.data.type === 'site-button') {
      const buttonConfigPanelSlot = {
        default ({ state }) {
          return (
            <div onClick={() => {
              state.visible = true
            }} class={[ns.e('mask'), (props.data.type === 'site-button') && ns.e('mask-action')]}>
              <span class={ns.e('maskContent')}>编辑</span>
            </div>
          )
        }
      }
      maskNode = (
        <SectorComponentsButtonConfigPanel data={props.data} v-slots={buttonConfigPanelSlot}>
        </SectorComponentsButtonConfigPanel>
      )
    }
    const isShowCopy = computed(() => isInlineChildren ? props.hasCopy && props.data.context.parent.columns.length < 4 : props.hasCopy)
    // const isShowSelectParent = computed(() => {
    //   return !isSelectRoot.value
    // })
    return () => {
      return (
        <TagComponent
          class={id.value}
          {...useAttrs()}
          class={[
            ns.b(),
            !isField && ns.e('borderless'),
            unref(isEditModel) && ns.e('editor'),
            Selected.value,
            isHover.value && ns.e('hover'),
            isScale.value && ns.e('isScale'),
            isWarning.value && ns.is('Warning')
          ]}
          ref={elementRef} onClick={unref(isEditModel) && withModifiers(handleClick, ['stop'])}
        >
          {slots.default()}
          <span></span>
           {
            unref(isEditModel) && (
              <div class={[ns.e('topLeft')]}>
                {props.hasDrag && (<Icon class={['handle', ns.e('dragIcon')]} icon="Rank"></Icon>)}
              </div>
            )
           }
          {
            unref(isEditModel) && (
              <div class={[ns.e('bottomRight')]}>
                {/* {isShowSelectParent.value && (<Icon class={['handle', ns.e('selectParent')]} icon="top"></Icon>)} */}
                <Icon class={['handle', ns.e('selectParent')]} onClick={withModifiers((e) => {
                  handleAction(5)
                }, ['stop'])} icon="top"></Icon>
                {props.hasDel && (
                  <Icon class={[ns.e('copyDelete')]} onClick={withModifiers((e) => {
                    handleAction(1)
                  }, ['stop'])} icon="delete"></Icon>
                )}
                {
                  props.hasInserColumn && (<Icon class={[ns.e('charulieIcon')]} onClick={withModifiers((e) => {
                    handleAction(4)
                  }, ['stop'])} icon="tableInsertCol"></Icon>)
                }
                {
                  props.hasInserRow && (<Icon class={[ns.e('charuhangIcon')]} onClick={withModifiers((e) => {
                    handleAction(3)
                  }, ['stop'])} icon="tableInsertRow"></Icon>)
                }
                {
                  props.hasAddCol && (<Icon class={[ns.e('addCol')]} onClick={withModifiers((e) => {
                    handleAction(6)
                  }, ['stop'])} icon="plus"></Icon>)
                }
                {
                  isShowCopy.value && (<Icon class={[ns.e('copyIcon')]} onClick={withModifiers((e) => {
                    handleAction(2)
                  }, ['stop'])} icon="copy"></Icon>)
                }
                {isShowWidthScale.value && (
                  <div ref={widthScaleElement}><Icon class={[ns.e('widthScale')]} icon="dragWidth"></Icon></div>)}
                {props.hasTableCellOperator && renderTableCellOperator()}
              </div>
            )
          }

          {
            unref(isEditModel) && props.hasMask && maskNode
          }
        </TagComponent>
      )
    }
  }
}

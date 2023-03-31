import { defineComponent, inject, ref, resolveComponent, unref } from 'vue'
import LayoutDragGable from '@ER/formEditor/components/Layout/DragGable'
import LayoutInlineLayout from '@ER/formEditor/components/Layout/InlineLayout'
import CompleteButton from '@ER/formEditor/components/CompleteButton.vue'
import hooks from '@ER/hooks'
import _ from 'lodash-es'
export default defineComponent({
  name: 'Canves',
  inheritAttrs: false,
  customOptions: {},
  setup () {
    const ER = inject('Everright')
    const ns = hooks.useNamespace('Canves')
    const {
      state,
      setSector,
      isEditModel,
      isPc
    } = hooks.useTarget()
    const form = ref('')
    const handleClick = (e) => {
      setSector('root')
    }
    const renderContent = () => {
      const TagComponent = resolveComponent(unref(isPc) ? 'el-form' : 'van-form')
      const typeProps = hooks.useProps(state, state, unref(isPc), true)
      const Layout = (<LayoutDragGable data-layout-type={'root'} class={[unref(isEditModel) && ns.e('wrap')]} data={state.store} parent={state.store} isRoot></LayoutDragGable>)
      return (
        <div>
          <TagComponent ref={form} onClick={unref(isEditModel) && handleClick} {...typeProps.value}>
            {
              unref(isEditModel) ? Layout : Layout
            }
          </TagComponent>
          {!unref(isEditModel) && !_.isEmpty(state.config) && <CompleteButton handle={form}/>}
        </div>
      )
    }
    return () => {
      return (
        <ElMain
          class={
            [
              ns.b(),
              isEditModel.value && ns.e('editModel'),
              !unref(isPc) && ns.e(`mobile`),
              !unref(isPc) && ns.e(`mobile_layoutType${ER.props.layoutType}`)
              // ER.props.layoutType === 1  && ns.e('layoutType1')
            ]}>
          {unref(isEditModel)
            ? (
            <div class={[ns.e('container')]}>
              <el-scrollbar ref={ER.canvesScrollRef}>
                <div class={[ns.e('subject')]}>
                  {renderContent()}
                </div>
              </el-scrollbar>
            </div>
              )
            : renderContent()}
        </ElMain>
      )
    }
  }
})

import { defineComponent, ref, resolveComponent, unref } from 'vue'
import NAME from '@ER/formEditor/name.js'
import LayoutDragGable from '@ER/formEditor/components/Layout/DragGable'
import LayoutInlineLayout from '@ER/formEditor/components/Layout/InlineLayout'
import CompleteButton from '@ER/formEditor/components/CompleteButton.vue'
import hooks from '@ER/hooks'
import _ from 'lodash-es'
export default defineComponent({
  name: NAME.ERCANVES,
  inheritAttrs: false,
  customOptions: {},
  setup () {
    const ns = hooks.useNamespace('Canves')
    const {
      state,
      setSector,
      isEditModel,
      isPc
    } = hooks.useTarget()
    const form = ref('')
    const handleClick = (e) => {
      // state.sector = {}
      setSector('root')
    }
    const renderContent = () => {
      const TagComponent = resolveComponent(unref(isPc) ? 'el-form' : 'van-form')
      // let model = {}
      // const rules = {}
      // const props = {}
      // // if (state.isPc) {
      // //   props.labelWidth = '100px'
      // // }
      // if (state.isPc && !state.isEditModel) {
      //   model = state.store
      //   // model = state.formData.model
      //   // rules = state.formData.rules
      // }
      // console.log(state.isPc)
      // console.log(state.isEditModel)
      // console.log(model)
      // console.log(model)
      const typeProps = hooks.useProps(state, state, unref(isPc), true)
      const Layout = (<LayoutDragGable data-layout-type={'root'} class={[unref(isEditModel) && ns.e('wrap')]} data={state.store} parent={state.store} isRoot></LayoutDragGable>)
      // const Layout = () => {
      //   return state.store.map((element, index) => {
      //     return (
      //       <LayoutInlineLayout
      //         key={index}
      //         data={element} parent={state.store}
      //       />
      //     )
      //   })
      // }
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
        <ElMain class={[ns.b(), !unref(isPc) && ns.e('mobile')]}>
          {unref(isEditModel)
            ? (
            <div class={[ns.e('container')]}>
              <el-scrollbar>
                {renderContent()}
              </el-scrollbar>
            </div>
              )
            : renderContent()}
        </ElMain>
      )
    }
  }
})

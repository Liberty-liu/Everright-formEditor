import { defineComponent, resolveComponent, watch, useAttrs, defineAsyncComponent, unref, nextTick, inject } from 'vue'
import Selection from '@ER/formEditor/components/Selection/selectElement.jsx'
import LayoutDragGable, { dragGableWrap } from './DragGable.jsx'
import hooks from '@ER/hooks'
import utils from '@ER/utils'
import ControlInsertionPlugin from './ControlInsertionPlugin.js'
export default defineComponent({
  name: 'InlineLayout',
  props: {
    data: Object,
    parent: Array
  },
  setup (props) {
    const ER = inject('Everright')
    const ns = hooks.useNamespace('InlineLayout')
    // watch(() => props.data.columns, (newVal) => {
    //   if (!newVal.length) {
    //     props.data.context.delete()
    //   }
    // }, {
    //   deep: true
    // })
    watch(() => props.data.columns.length, (newVal, oldVal) => {
      if (!newVal) {
        props.data.context.delete()
      }
      if (newVal !== oldVal) {
        utils.syncWidthByPlatform(props.data.columns, state.platform, ER.props.layoutType === 1)
      }
    })
    const dragOptions = {
      direction: 'horizontal'
    }
    return () => {
      return (
        <div
          class={[ns.b()]}>
          <LayoutDragGable
            data-layout-type={'inline'}
            class={''}
            type={'inline'}
            {...dragOptions}
            data={props.data.columns}
            parent={props.parent}/>
            {/* parent={props.data}/> */}
        </div>
      )
    }
  }
})

import { describe, assert, expect, test, beforeAll, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { nextTick } from 'vue'
import ElementPlus from 'element-plus'
import Vant from 'vant'
import { erFormPreview } from '@ER/formEditor'
import preo from './data/preo.json'
const _mount = (template, data, otherObj) => mount(
  {
    components: {
      erFormPreview
    },
    template,
    data,
    ...otherObj
  },
  {
    attachTo: 'body',
    global: {
      plugins: [
        ElementPlus,
        Vant
      ]
    }
  }
)
describe('er-form-preview', () => {
  test('renders a todo', async () => {
    const wrapper = _mount(`
    <er-form-preview
      @listener="handleListener"
      ref="EReditorRef"/>
    `)
    wrapper.findComponent({ ref: 'EReditorRef' }).vm.setData(preo)
    await new Promise(resolve => setTimeout(resolve, 1000))
    await flushPromises()
    console.log(wrapper.html())
    // expect(wrapper.text()).toBe('Default')
  })
})

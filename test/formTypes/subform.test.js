import { describe, assert, expect, test, beforeEach, beforeAll, vi } from 'vitest'
import erGeneratorData from '@ER/formEditor/generatorData.js'
import * as erComponentsConfig from '@ER/formEditor/componentsConfig.js'
import _ from 'lodash-es'
import { nextTick } from 'vue'
import { _mount, wrapLayoutDataByLayoutType } from '@ER-test/utils.js'
import { utils } from '@ER/formEditor/index.js'
describe('Field: subform', () => {
  let wrapper = {}
  const handleListener = vi.fn()
  // let field = {}
  const layoutType = 1
  beforeAll(() => {
    vi.stubEnv('TESTIDTYPE', 'nanoid')
    // field = erGeneratorData(erComponentsConfig.fieldsConfig[0].list[0], true, 'en')
    wrapper = _mount(`
      <er-form-preview
        @listener="handleListener"
        :layoutType="layoutType"
        ref="EReditorRef"/>
      `, () => ({
      handleListener,
      layoutType
    })
    )
    return () => {
      vi.stubEnv('TESTIDTYPE', '')
    }
  })
  test('No child', async () => {
    const subForm = erGeneratorData(_.cloneDeep(erComponentsConfig.fieldsConfig[2].list[5]), true, 'en')
    const list = _.cloneDeep(subForm)
    list.columns[0] = subForm.columns[0].id
    const data = wrapLayoutDataByLayoutType([list], [subForm.columns[0]], layoutType)
    await wrapper.findComponent({ ref: 'EReditorRef' }).vm.setData(data)
    expect(wrapper.find(utils.getTestId('SubformLayout:addButton')).exists()).toBe(false)
  })
})

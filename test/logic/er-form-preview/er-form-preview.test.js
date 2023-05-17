import { describe, assert, expect, test, beforeEach, afterEach, beforeAll, vi } from 'vitest'
import { mount, flushPromises, enableAutoUnmount } from '@vue/test-utils'
import { nextTick, reactive } from 'vue'
import _ from 'lodash-es'
import ElementPlus from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import Vant from 'vant'
import { erFormPreview } from '@ER/formEditor'
import previewData from './data/preview.json'

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
      components: {
        Plus
      },
      plugins: [
        ElementPlus,
        Vant
      ]
    }
  }
)
describe('er-form-preview', () => {
  let testData = {}
  const handleListener = vi.fn()
  let wrapper = {}
  beforeAll(() => {
    // vi.resetModules()
    // const handleListener = vi.fn()
    wrapper = _mount(`
      <er-form-preview
        @listener="handleListener"
        ref="EReditorRef"/>
      `, () => ({
      handleListener
    })
    )
  })
  beforeEach(() => {
    // vi.resetModules()
    // document.body.innerHTML = ''
    // document.getElementsByTagName('html')[0].innerHTML = ''
    testData = _.cloneDeep(previewData)
    // document.getElementsByTagName('html')[0].innerHTML = '<html><head><style data-jss=""></style></head><body></body></html>'
  })
  // enableAutoUnmount(afterEach)
  afterEach(() => {
    // vi.restoreAllMocks()
  })
  // afterEach(() => {
  //   // vi.restoreAllMocks()
  // })
  test('without logic', async () => {
    wrapper.findComponent({ ref: 'EReditorRef' }).vm.setData(testData)
    await new Promise(resolve => setTimeout(resolve, 3000))
    wrapper.find('[data-test="er-complete-button"] button').trigger('click')
    expect(testData.fields.map(field => field.id)).toStrictEqual(wrapper.findAll('[data-field-id]').map(element => element.element.dataset.fieldId))
    await flushPromises()
    expect(handleListener).toHaveBeenCalled()
  })
  test('without logic & property:["required = true"]', async () => {
    testData.fields[0].options.required = true
    wrapper.findComponent({ ref: 'EReditorRef' }).vm.setData(testData)
    await new Promise(resolve => setTimeout(resolve, 3000))
    wrapper.find('[data-test="er-complete-button"] button').trigger('click')
    expect(testData.fields.map(field => field.id)).toStrictEqual(wrapper.findAll('[data-field-id]').map(element => element.element.dataset.fieldId))
    expect(wrapper.find(`[data-field-id="${testData.fields[0].id}"]`).exists()).toBeTruthy()
    expect(wrapper.find(`[data-field-id="${testData.fields[0].id}"] .el-form-item`).classes()).toContain('is-required')
    await flushPromises()
    expect(handleListener).toHaveBeenCalled()
  })
  test('without logic & property:["required = true", "disabled = true"]', async () => {
    testData.fields[0].options.required = true
    testData.fields[0].options.disabled = true
    wrapper.findComponent({ ref: 'EReditorRef' }).vm.setData(testData)
    await new Promise(resolve => setTimeout(resolve, 3000))
    wrapper.find('[data-test="er-complete-button"] button').trigger('click')
    expect(testData.fields.map(field => field.id)).toStrictEqual(wrapper.findAll('[data-field-id]').map(element => element.element.dataset.fieldId))
    expect(wrapper.find(`[data-field-id="${testData.fields[0].id}"]`).exists()).toBeTruthy()
    expect(wrapper.find(`[data-field-id="${testData.fields[0].id}"] .el-form-item`).classes()).not.toContain('is-required')
    await flushPromises()
    expect(handleListener).toHaveBeenCalled()
  })
  test('logic & Hide ByW9gM4L6R8ScRvEh-xRB when QENpBBxQfZVSzk2ahMmOH is empty', async () => {
    testData.logic = {
      showHidden: [
        {
          ifRules: {
            filters: [
              {
                conditions: [
                  {
                    operator: 'empty',
                    property: 'QENpBBxQfZVSzk2ahMmOH'
                  }
                ],
                logicalOperator: 'and'
              }
            ],
            logicalOperator: 'and'
          },
          thenRules: {
            filters: [
              {
                conditions: [
                  {
                    operator: 'field',
                    property: 'hide',
                    value: [
                      'ByW9gM4L6R8ScRvEh-xRB'
                    ]
                  }
                ],
                logicalOperator: 'and'
              }
            ],
            logicalOperator: 'and'
          }
        }
      ]
    }
    wrapper.findComponent({ ref: 'EReditorRef' }).vm.setData(testData)
    await new Promise(resolve => setTimeout(resolve, 3000))
    wrapper.find('[data-test="er-complete-button"] button').trigger('click')
    await flushPromises()
    expect(handleListener).toHaveBeenCalled()
    expect(testData.fields.map(field => field.id).filter(id => id !== 'ByW9gM4L6R8ScRvEh-xRB')).toStrictEqual(wrapper.findAll('[data-field-id]').map(element => element.element.dataset.fieldId))
  })
  test('logic & Required ByW9gM4L6R8ScRvEh-xRB when QENpBBxQfZVSzk2ahMmOH is empty', async () => {
    testData.logic = {
      required: [
        {
          ifRules: {
            filters: [
              {
                conditions: [
                  {
                    operator: 'empty',
                    property: 'QENpBBxQfZVSzk2ahMmOH'
                  }
                ],
                logicalOperator: 'and'
              }
            ],
            logicalOperator: 'and'
          },
          thenRules: {
            filters: [
              {
                conditions: [
                  {
                    operator: 'required',
                    property: 'required',
                    value: [
                      'ByW9gM4L6R8ScRvEh-xRB'
                    ]
                  }
                ],
                logicalOperator: 'and'
              }
            ],
            logicalOperator: 'and'
          }
        }
      ]
    }
    wrapper.findComponent({ ref: 'EReditorRef' }).vm.setData(testData)
    await new Promise(resolve => setTimeout(resolve, 3000))
    wrapper.find('[data-test="er-complete-button"] button').trigger('click')
    await flushPromises()
    expect(handleListener).toHaveBeenCalled()
    expect(wrapper.find('[data-field-id="ByW9gM4L6R8ScRvEh-xRB"] .el-form-item').classes()).toContain('is-required')
    expect(testData.fields.map(field => field.id)).toStrictEqual(wrapper.findAll('[data-field-id]').map(element => element.element.dataset.fieldId))
  })
  test('logic & Hide and Required ByW9gM4L6R8ScRvEh-xRB when QENpBBxQfZVSzk2ahMmOH is empty', async () => {
    testData.logic = {
      showHidden: [
        {
          ifRules: {
            filters: [
              {
                conditions: [
                  {
                    operator: 'empty',
                    property: 'QENpBBxQfZVSzk2ahMmOH'
                  }
                ],
                logicalOperator: 'and'
              }
            ],
            logicalOperator: 'and'
          },
          thenRules: {
            filters: [
              {
                conditions: [
                  {
                    operator: 'field',
                    property: 'hide',
                    value: [
                      'ByW9gM4L6R8ScRvEh-xRB'
                    ]
                  }
                ],
                logicalOperator: 'and'
              }
            ],
            logicalOperator: 'and'
          }
        }
      ],
      required: [
        {
          ifRules: {
            filters: [
              {
                conditions: [
                  {
                    operator: 'empty',
                    property: 'QENpBBxQfZVSzk2ahMmOH'
                  }
                ],
                logicalOperator: 'and'
              }
            ],
            logicalOperator: 'and'
          },
          thenRules: {
            filters: [
              {
                conditions: [
                  {
                    operator: 'required',
                    property: 'required',
                    value: [
                      'ByW9gM4L6R8ScRvEh-xRB'
                    ]
                  }
                ],
                logicalOperator: 'and'
              }
            ],
            logicalOperator: 'and'
          }
        }
      ]
    }
    wrapper.findComponent({ ref: 'EReditorRef' }).vm.setData(testData)
    await new Promise(resolve => setTimeout(resolve, 3000))
    wrapper.find('[data-test="er-complete-button"] button').trigger('click')
    await flushPromises()
    expect(handleListener).toHaveBeenCalled()
    expect(testData.fields.map(field => field.id).filter(id => id !== 'ByW9gM4L6R8ScRvEh-xRB')).toStrictEqual(wrapper.findAll('[data-field-id]').map(element => element.element.dataset.fieldId))
  })
  test('logic & Required and ReadOnly ByW9gM4L6R8ScRvEh-xRB when QENpBBxQfZVSzk2ahMmOH is empty', async () => {
    testData.logic = {
      required: [
        {
          ifRules: {
            filters: [
              {
                conditions: [
                  {
                    operator: 'empty',
                    property: 'QENpBBxQfZVSzk2ahMmOH'
                  }
                ],
                logicalOperator: 'and'
              }
            ],
            logicalOperator: 'and'
          },
          thenRules: {
            filters: [
              {
                conditions: [
                  {
                    operator: 'required',
                    property: 'required',
                    value: [
                      'ByW9gM4L6R8ScRvEh-xRB'
                    ]
                  }
                ],
                logicalOperator: 'and'
              }
            ],
            logicalOperator: 'and'
          }
        }
      ],
      readOnly: [
        {
          ifRules: {
            filters: [
              {
                conditions: [
                  {
                    operator: 'empty',
                    property: 'QENpBBxQfZVSzk2ahMmOH'
                  }
                ],
                logicalOperator: 'and'
              }
            ],
            logicalOperator: 'and'
          },
          thenRules: {
            filters: [
              {
                conditions: [
                  {
                    operator: 'readOnly',
                    property: 'readOnly',
                    value: [
                      'ByW9gM4L6R8ScRvEh-xRB'
                    ]
                  }
                ],
                logicalOperator: 'and'
              }
            ],
            logicalOperator: 'and'
          }
        }
      ]
    }
    wrapper.findComponent({ ref: 'EReditorRef' }).vm.setData(testData)
    await new Promise(resolve => setTimeout(resolve, 3000))
    wrapper.find('[data-test="er-complete-button"] button').trigger('click')
    await flushPromises()
    expect(handleListener).toHaveBeenCalled()
    expect(testData.fields.map(field => field.id)).toStrictEqual(wrapper.findAll('[data-field-id]').map(element => element.element.dataset.fieldId))
    // expect(wrapper.find(`[data-field-id="${testData.fields[0].id}"] .el-form-item`).classes()).not.toContain('is-required')
    expect(wrapper.find('[data-field-id="ByW9gM4L6R8ScRvEh-xRB"] .el-form-item').classes()).not.toContain('is-required')
    expect(wrapper.find('[data-field-id="ByW9gM4L6R8ScRvEh-xRB"] .el-input').classes()).toContain('is-disabled')
  })
})

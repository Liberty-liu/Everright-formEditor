import { mount } from '@vue/test-utils'
import { erFormEditor, erFormPreview } from '@ER/formEditor/index.js'
import ElementPlus from 'element-plus'
import Vant from 'vant'

export const _mount = (template, data, otherObj) => mount(
  {
    components: {
      erFormEditor,
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
export const wrapLayoutDataByLayoutType = (layout, fields = [], layoutType = 1) => {
  const result = {
    config: {
      isSync: true,
      pc: {
        size: 'default',
        labelPosition: 'left',
        completeButton: {
          text: 'Submit',
          color: '',
          backgroundColor: ''
        }
      },
      mobile: {
        labelPosition: 'left',
        completeButton: {
          text: 'Submit',
          color: '',
          backgroundColor: ''
        }
      }
    },
    logic: {},
    data: {},
    fields
    // fields: [
    //   field.columns[0]
    // ]
  }
  if (layoutType === 1) {
    result.list = layout
  }
  if (layoutType === 2) {
    result.layout = layout
  }
  return result
}
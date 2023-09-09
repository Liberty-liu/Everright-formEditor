import { mount } from '@vue/test-utils'
import { erFormEditor, erFormPreview, erFormConfig, utils } from '@ER/formEditor/index.js'
import ElementPlus from 'element-plus'
import Vant from 'vant'
import { generateData } from '@ER/utils/generateOptions.js'

export const _mount = (template, data, otherObj) => mount(
  {
    components: {
      erFormEditor,
      erFormPreview,
      erFormConfig
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
  const result = utils.generateData(layoutType)
  result.fields = fields
  if (layoutType === 1) {
    result.list = layout
  }
  if (layoutType === 2) {
    result.layout = layout
  }
  return result
}

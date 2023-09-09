import { nanoid } from './nanoid'
import { globalConfig } from '@ER/formEditor/componentsConfig.js'
import _ from 'lodash-es'
export const generateOptions = (len) => {
  const result = []
  while (len--) {
    result.push({
      label: 'Option',
      value: nanoid()
    })
  }
  return result
}
export const generateData = (layoutType = 1) => {
  const result = {
    config: _.cloneDeep(globalConfig)
  }
  result.logic = result.data = {}
  if (layoutType === 1) {
    result.list = []
  }
  if (layoutType === 2) {
    result.layout = []
  }
  return result
}

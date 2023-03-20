import _ from 'lodash-es'
import { fieldConfig } from '@ER/formEditor/componentsConfig.js'
const isField = (type) => _.chain(fieldConfig).find({ id: 'field' }).get('list').find({ type }).isEmpty().value()
export {
  isField
}

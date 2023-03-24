import locale from '@ER/formEditor/locale'
import utils from '@ER/utils'
export default function (node, isWrap = true, lang = 'zh-cn', isCreateLabel = true, eachBack) {
  const newNode = isWrap
    ? {
        type: 'inline',
        columns: [
          node
        ]
      }
    : node
  const result = utils.wrapElement(newNode, eachBack && eachBack)
  if (isCreateLabel) {
    node.label = utils.transferData(lang, utils.transferLabelPath(node), locale)
  }
  return result
}

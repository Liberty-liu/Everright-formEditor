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
    // if (/^(input|textarea|number|radio|checkbox|select|time|date|rate|switch|slider|html|cascader|uploadfile|signature|region)$/.test()) {}
    if (/^(select|cascader|region|date|time)$/.test(node.type)) {
      node.options.placeholder = utils.transferData(lang, 'er.validateMsg.placeholder2', locale)
    }
    if (/^(select|checkbox|radio)$/.test(node.type)) {
      node.options.otherPlaceholder = utils.transferData(lang, 'er.validateMsg.placeholder3', locale)
    }
    if (/^(input|textarea|html)$/.test(node.type)) {
      node.options.placeholder = utils.transferData(lang, 'er.validateMsg.placeholder1', locale)
    }
    // node.options.placeholder
  }
  return result
}

import _ from 'lodash-es'
const generateIfFilterOptionsData = (activeTab, fields) => {
  const result = {
    options: [
    ],
    operators: {
      Text: [
        {
          label: '等于',
          value: 'equal',
          style: 'noop'
        },
        {
          label: '等于其中之一',
          value: 'one_of',
          style: 'tags'
        },
        {
          label: '不等于',
          value: 'not_equal',
          style: 'noop'
        },
        {
          label: '包含',
          value: 'contains',
          style: 'noop'
        },
        {
          label: '不包含',
          value: 'not_contain',
          style: 'noop'
        },
        {
          label: '为空',
          value: 'empty',
          style: 'none'
        },
        {
          label: '不为空',
          value: 'not_empty',
          style: 'none'
        }
      ],
      Number: [
        {
          label: '等于',
          value: 'equal',
          style: 'noop'
        },
        {
          label: '不等于',
          value: 'not_equal',
          style: 'noop'
        },
        {
          label: '大于',
          value: 'greater_than',
          style: 'noop'
        },
        {
          label: '大于等于',
          value: 'greater_than_equal',
          style: 'noop'
        },
        {
          label: '小于',
          value: 'less_than',
          style: 'noop'
        },
        {
          label: '小于等于',
          value: 'less_than_equal',
          style: 'noop'
        },
        {
          label: '区间',
          value: 'between',
          style: 'range'
        },
        {
          label: '为空',
          value: 'empty',
          style: 'none'
        },
        {
          label: '不为空',
          value: 'not_empty',
          style: 'none'
        }
      ]
    }
  }
  fields.forEach((node) => {
    const filterNode = {
      label: node.label,
      value: node.id
    }
    switch (node.type) {
      case 'textarea':
      case 'input':
      case 'html':
        filterNode.renderType = 'TEXT'
        filterNode.operatorKey = 'Text'
        break
      case 'region':
        filterNode.renderType = 'REGION'
        filterNode.operatorKey = 'Text'
        break
      case 'date':
        filterNode.renderType = 'DATE'
        filterNode.operatorKey = 'Number'
        filterNode.datePanel = {
          excludeShortcuts: -1,
          excludeManuals: -1
        }
        break
      case 'number':
      case 'rate':
      case 'slider':
        filterNode.renderType = 'NUMBER'
        filterNode.operatorKey = 'Number'
        break
      case 'radio':
      case 'checkbox':
      case 'select':
      case 'switch':
        filterNode.renderType = 'SELECT'
        filterNode.operatorKey = 'Text'
        break
      case 'cascader':
        filterNode.renderType = 'CASCADER'
        filterNode.operatorKey = 'Text'
        break
      case 'time':
        filterNode.renderType = 'TIME'
        filterNode.operatorKey = 'Number'
        filterNode.format = 'HH:mm:ss'
        break
      case 'signature':
      case 'uploadfile':
        filterNode.renderType = 'NONE'
        filterNode.operatorKey = 'Text'
        filterNode.includeOperator = {
          operator: [
            'empty',
            'not_empty'
          ]
        }
        break
      // case 'rate':
      //   filterNode.renderType = 'TIME'
      //   filterNode.operatorKey = 'Number'
      //   filterNode.format = 'HH:mm:ss'
      //   break
    }
    result.options.push(filterNode)
  })
  return result
}
const generateIfFilterConditionsData = (activeTab, state, property) => {
  let result = {}
  const findField = _.find(state.fields, { id: property })
  if (!_.isEmpty(findField)) {
    if (findField.type === 'switch') {
      result = [
        {
          label: '开',
          en_label: 'on',
          value: true
        },
        {
          label: '关',
          en_label: 'off',
          value: false
        }
      ]
    } else {
      result = _.get(state.data, `${findField.options.dataKey}.list`, [])
    }
  }
  return result
}
const generateThenFilterOptionsData = (activeTab, fields) => {
  let result = {}
  switch (activeTab) {
    case 'showHidden':
      result = {
        options: [
          {
            label: '显示',
            value: 'show',
            renderType: 'SELECT',
            operatorKey: 'Text'
          },
          {
            label: '隐藏',
            value: 'hide',
            renderType: 'SELECT',
            operatorKey: 'Text'
          }
        ],
        operators: {
          Text: [
            {
              label: '字段',
              value: 'field',
              style: 'tags'
            }
          ]
        }
      }
      break
    case 'required':
      result = {
        options: generateIfFilterOptionsData(activeTab, fields).options,
        operators: {
          Text: [
            {
              label: '必填',
              value: 'required',
              style: 'noop'
            },
            {
              label: '不必填',
              value: 'not_required',
              style: 'noop'
            }
          ]
        }
      }
      result.options.forEach(e => {
        e.renderType = 'TEXT'
        e.operatorKey = 'Text'
      })
      break
    case 'validation':
      result = {
        options: [
          {
            label: '提示语',
            value: 'message',
            renderType: 'TEXT',
            isShowOperator: false,
            operatorKey: 'Text'
          }
        ],
        operators: {
          Text: [
            {
              label: '',
              value: 'required',
              style: 'noop'
            }
          ]
        }
      }
      break
  }
  return result
}
const generateThenFilterConditionsData = (activeTab, fields) => {
  return fields.map(e => {
    return {
      label: e.label,
      value: e.id
    }
  })
}
export {
  generateIfFilterOptionsData,
  generateIfFilterConditionsData,
  generateThenFilterOptionsData,
  generateThenFilterConditionsData
}

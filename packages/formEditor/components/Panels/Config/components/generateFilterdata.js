import _ from 'lodash-es'
import utils from '@ER/utils'
import locale from '@ER/formEditor/locale'
const generateIfFilterOptionsData = (activeTab, fields) => {
  const result = {
    options: [
    ],
    operators: {
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
        filterNode.operatorKey = 'Region'
        filterNode.selectType = node.options.selectType
        break
      case 'date':
        filterNode.renderType = 'DATE'
        filterNode.operatorKey = 'Number'
        filterNode.includeOperator = {
          dateOperator: ['date']
        }
        filterNode.datePanel = {
          excludeShortcuts: -1,
          excludeManuals: -1
        }
        if (node.options.type === 'datetime') {
          filterNode.renderType = 'DATE'
          filterNode.operatorKey = 'Number'
        }
        if (node.options.type === 'dates') {
          filterNode.renderType = 'DATE'
          filterNode.operatorKey = 'Text'
        }
        if (node.options.type === 'daterange') {
          filterNode.renderType = 'DATE'
          filterNode.operatorKey = 'Text'
          filterNode.excludeOperator = {
            operator: [
              'contains',
              'not_contain'
            ]
          }
        }
        filterNode.datePanel.pickerType = node.options.type || 'date'
        break
      case 'number':
        filterNode.renderType = 'NUMBER'
        filterNode.operatorKey = 'Number'
        break
      case 'rate':
        filterNode.renderType = 'NUMBER'
        filterNode.operatorKey = 'Number'
        break
      case 'slider':
        filterNode.renderType = 'NUMBER'
        filterNode.operatorKey = 'Number'
        filterNode.excludeOperator = {
          operator: [
            'not_empty',
            'empty'
          ]
        }
        break
      case 'radio':
        filterNode.renderType = 'SELECT'
        filterNode.operatorKey = 'Text'
        break
      case 'checkbox':
        filterNode.renderType = 'SELECT'
        filterNode.operatorKey = 'Text'
        filterNode.multiple = true
        // filterNode.excludeOperator = {
        //   operator: [
        //     'contains',
        //     'not_contain'
        //   ]
        // }
        break
      case 'select':
        filterNode.renderType = 'SELECT'
        filterNode.operatorKey = 'Text'
        filterNode.multiple = node.options.multiple
        // filterNode.excludeOperator = {
        //   operator: [
        //     'contains',
        //     'not_contain'
        //   ]
        // }
        break
      case 'switch':
        filterNode.renderType = 'SELECT'
        filterNode.operatorKey = 'Text'
        filterNode.excludeOperator = {
          operator: [
            'contains',
            'not_contain',
            'not_empty',
            'empty'
          ]
        }
        break
      case 'cascader':
        filterNode.renderType = 'CASCADER'
        filterNode.operatorKey = 'Text'
        filterNode.multiple = node.options.multiple
        filterNode.customProps = {
          onChange: () => {},
          props: {
            multiple: node.options.multiple,
            emitPath: true,
            checkStrictly: node.options.checkStrictly,
            disabled: 'disabled'
          }
        }
        filterNode.excludeOperator = {
          operator: [
            'contains',
            'not_contain'
          ]
        }
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
    }
    if (!result.operators[filterNode.operatorKey]) {
      switch (filterNode.operatorKey) {
        case 'Text':
          result.operators.Text = [
            {
              value: 'equal',
              style: 'noop'
            },
            {
              value: 'not_equal',
              style: 'noop'
            },
            {
              value: 'contains',
              style: 'tags'
            },
            {
              value: 'not_contain',
              style: 'tags'
            },
            {
              value: 'empty',
              style: 'none'
            },
            {
              value: 'not_empty',
              style: 'none'
            }
          ].map(e => {
            e.label = utils.transferData('zh-cn', `er.logic.filter.${e.value}`, locale)
            e.en_label = utils.transferData('en', `er.logic.filter.${e.value}`, locale)
            return e
          })
          break
        case 'Number':
          result.operators.Number = [
            {
              value: 'equal',
              style: 'noop'
            },
            {
              value: 'not_equal',
              style: 'noop'
            },
            {
              value: 'greater_than',
              style: 'noop'
            },
            {
              value: 'greater_than_equal',
              style: 'noop'
            },
            {
              value: 'less_than',
              style: 'noop'
            },
            {
              value: 'less_than_equal',
              style: 'noop'
            },
            {
              value: 'between',
              style: 'range'
            },
            {
              value: 'empty',
              style: 'none'
            },
            {
              value: 'not_empty',
              style: 'none'
            }
          ].map(e => {
            e.label = utils.transferData('zh-cn', `er.logic.filter.${e.value}`, locale)
            e.en_label = utils.transferData('en', `er.logic.filter.${e.value}`, locale)
            return e
          })
          break
        case 'Region':
          result.operators.Region = [
            {
              value: 'one_of',
              style: 'tags'
            },
            {
              value: 'not_one_of',
              style: 'tags'
            },
            {
              value: 'belong_one_of',
              style: 'tags'
            },
            {
              value: 'not_belong_one_of',
              style: 'tags'
            },
            {
              value: 'empty',
              style: 'none'
            },
            {
              value: 'not_empty',
              style: 'none'
            }
          ].map(e => {
            e.label = utils.transferData('zh-cn', `er.logic.filter.${e.value}`, locale)
            e.en_label = utils.transferData('en', `er.logic.filter.${e.value}`, locale)
            return e
          })
          break
      }
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
          label: utils.transferData('zh-cn', 'er.logic.filter.on', locale),
          en_label: utils.transferData('en', 'er.logic.filter.on', locale),
          value: 1
        },
        {
          label: utils.transferData('zh-cn', 'er.logic.filter.off', locale),
          en_label: utils.transferData('en', 'er.logic.filter.off', locale),
          value: 0
        }
      ]
    } else {
      result = state.mode === 'edit' ? _.get(state.data, `${findField.options.dataKey}.list`, []) : _.get(findField, 'options.data', [])
    }
  }
  return result
}
const generateThenFilterOptionsData = (activeTab, fields) => {
  let result = {}
  switch (activeTab) {
    case 'visible':
      result = {
        options: [
          {
            label: utils.transferData('zh-cn', 'er.logic.filter.show', locale),
            en_label: utils.transferData('en', 'er.logic.filter.show', locale),
            value: 'show',
            renderType: 'SELECT',
            operatorKey: 'Text'
          },
          {
            label: utils.transferData('zh-cn', 'er.logic.filter.hide', locale),
            en_label: utils.transferData('en', 'er.logic.filter.hide', locale),
            value: 'hide',
            renderType: 'SELECT',
            operatorKey: 'Text'
          }
        ],
        operators: {
          Text: [
            {
              label: utils.transferData('zh-cn', 'er.logic.filter.field', locale),
              en_label: utils.transferData('en', 'er.logic.filter.field', locale),
              value: 'field',
              style: 'tags'
            }
          ]
        }
      }
      break
    case 'required':
      result = {
        options: [
          {
            label: '',
            value: 'required',
            renderType: 'SELECT',
            operatorKey: 'Text',
            multiple: true
          }
        ],
        operators: {
          Text: [
            {
              label: utils.transferData('zh-cn', 'er.logic.filter.required', locale),
              en_label: utils.transferData('en', 'er.logic.filter.required', locale),
              value: 'required',
              style: 'noop'
            },
            {
              label: utils.transferData('zh-cn', 'er.logic.filter.not_required', locale),
              en_label: utils.transferData('en', 'er.logic.filter.not_required', locale),
              value: 'not_required',
              style: 'noop'
            }
          ]
        }
      }
      break
    case 'readOnly':
      result = {
        options: [
          {
            label: '',
            value: 'readOnly',
            renderType: 'SELECT',
            operatorKey: 'Text',
            multiple: true
          }
        ],
        operators: {
          Text: [
            {
              label: utils.transferData('zh-cn', 'er.logic.filter.readOnly', locale),
              en_label: utils.transferData('en', 'er.logic.filter.readOnly', locale),
              value: 'readOnly',
              style: 'noop'
            },
            {
              label: utils.transferData('zh-cn', 'er.logic.filter.editable', locale),
              en_label: utils.transferData('en', 'er.logic.filter.editable', locale),
              value: 'editable',
              style: 'noop'
            }
          ]
        }
      }
      break
    case 'validation':
      // result = {
      //   options: [
      //     {
      //       label: utils.transferData('zh-cn', 'er.logic.filter.message', locale),
      //       en_label: utils.transferData('en', 'er.logic.filter.message', locale),
      //       renderType: 'TEXT',
      //       isShowOperator: false,
      //       operatorKey: 'Text'
      //     }
      //   ],
      //   operators: {
      //     Text: [
      //       {
      //         label: '',
      //         value: 'required',
      //         style: 'noop'
      //       }
      //     ]
      //   }
      // }
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

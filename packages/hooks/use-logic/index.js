import { computed, watch } from 'vue'
import _ from 'lodash-es'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat.js'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter.js'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore.js'
import utils from '@ER/utils'
dayjs.extend(customParseFormat)
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)
const findValidityRule = (state) => {
  const result = {}
  for (const logicType in state.logic) {
    const rules = []
    _.get(state.logic, `${logicType}`, []).forEach(filter => {
      rules.push({
        if: _.get(filter, 'ifRules.filters[0]', {}),
        then: _.get(filter, 'thenRules.filters[0]', {})
      })
    })
    result[logicType] = rules
  }
  return result
}
const findFieldsByid = (list, fields) => _.intersectionBy(fields, list.map(e => ({ id: e })), 'id')
export const getAreaType = (code) => {
  const val = String(code)
  if (val.substring(0, 2) !== '00' && val.substring(2, 4) === '00') {
    return 1
  } else if (val.substring(2, 4) !== '00' && val.substring(4, 6) === '00') {
    return 2
  } else if (val.substring(4, 6) !== '00') {
    return 3
  }
}
const equal = (logicValue, value, field) => {
  if (field.type === 'date') {
    if (/^(date|datetime)$/.test(field.options.type)) {
      return dayjs.unix(value).isSame(dayjs.unix(logicValue.value))
    }
    if (/^(dates|daterange)$/.test(field.options.type)) {
      return _.isEqual(_.chain(logicValue.value).clone().flattenDeep().sort().value(), _.chain(value).clone().flattenDeep().sort().value())
    }
  }
  if (field.type === 'time') {
    return dayjs(value, field.options.valueFormat).isSame(dayjs(logicValue, field.options.valueFormat))
  }
  if (field.type === 'region') {
    return _.includes(logicValue, value)
  }
  if (_.isString(value) || _.isNumber(value)) {
    return _.isEqual(logicValue, value)
  }
  if (_.isArray(value)) {
    return _.isEqual(_.chain(logicValue).clone().flattenDeep().sort().value(), _.chain(value).clone().flattenDeep().sort().value())
  }
  if (_.isBoolean(value)) {
    return !!logicValue === value
  }
}
const notEqual = (...e) => {
  return !equal(...e)
}
const contains = (logicValue, value, field) => {
  if (_.isString(value)) {
    return logicValue.some((v) => _.includes(value, v))
  }
  if (_.isArray(value)) {
    return !!_.intersection(field.type === 'date' ? logicValue.value : logicValue, value).length
  }
}
const notContains = (...e) => {
  return !contains(...e)
}
const empty = (logicValue, value, field) => {
  if (field.type === 'rate') {
    return value === 0 || utils.isEmpty(value)
  }
  return utils.isEmpty(value)
}
const notEmpty = (...e) => {
  return !empty(...e)
}
const gt = (logicValue, value, field) => {
  if (field.type === 'date') {
    return dayjs.unix(value).isAfter(dayjs.unix(logicValue.value))
  }
  if (field.type === 'time') {
    return dayjs(value, field.options.valueFormat).isAfter(dayjs(logicValue, field.options.valueFormat))
  }
  return _.gt(value, logicValue)
}
const gte = (logicValue, value, field) => {
  if (field.type === 'date') {
    return dayjs.unix(value).isSameOrAfter(dayjs.unix(_.isObject(logicValue) ? logicValue.value : logicValue))
  }
  if (field.type === 'time') {
    return dayjs(value, field.options.valueFormat).isSameOrAfter(dayjs(logicValue, field.options.valueFormat))
  }
  return _.gte(value, logicValue)
}
const lt = (logicValue, value, field) => {
  if (field.type === 'date') {
    return dayjs.unix(value).isBefore(dayjs.unix(logicValue.value))
  }
  if (field.type === 'time') {
    return dayjs(value, field.options.valueFormat).isBefore(dayjs(logicValue, field.options.valueFormat))
  }
  return _.lt(value === undefined ? 0 : value, logicValue)
}
const lte = (logicValue, value, field) => {
  if (field.type === 'date') {
    return dayjs.unix(value).isSameOrBefore(dayjs.unix(_.isObject(logicValue) ? logicValue.value : logicValue))
  }
  if (field.type === 'time') {
    return dayjs(value, field.options.valueFormat).isSameOrBefore(dayjs(logicValue, field.options.valueFormat))
  }
  return _.lte(value === undefined ? 0 : value, logicValue)
}
const between = (logicValue, value, field) => {
  const [min, max] = field.type === 'date' ? logicValue.value : logicValue
  // console.log(logicValue)
  // console.log(value)
  return lte(max, value, field) && gte(min, value, field)
}
const oneOf = (logicValue, value, field) => {
  return !!_.intersection(logicValue, [value]).length
}
const notOneOf = (...e) => {
  return !oneOf(...e)
}
const belongOneOf = (logicValue, value, field) => {
  return utils.isEmpty(value)
    ? false
    : logicValue.some(code => {
      let result = false
      const type = getAreaType(code)
      switch (type) {
        case 1:
          result = code.substring(0, 2) === value.substring(0, 2)
          break
        case 2:
          result = code.substring(0, 2) === value.substring(0, 2) && code.substring(2, 4) === value.substring(2, 4)
          break
        case 3:
          result = code === value
          break
      }
      return result
    })
}
const notBelongOneOf = (...e) => {
  return !belongOneOf(...e)
}
export const validator = (logic, value, field) => {
  let result = false
  switch (logic.operator) {
    case 'equal':
      result = equal(logic.value, value, field)
      break
    case 'not_equal':
      result = notEqual(logic.value, value, field)
      break
    case 'contains':
      result = contains(logic.value, value, field)
      break
    case 'not_contain':
      result = notContains(logic.value, value, field)
      break
    case 'empty':
      result = empty(logic.value, value, field)
      break
    case 'not_empty':
      result = notEmpty(logic.value, value, field)
      break
    case 'greater_than':
      result = gt(logic.value, value, field)
      break
    case 'greater_than_equal':
      result = gte(logic.value, value, field)
      break
    case 'less_than':
      result = lt(logic.value, value, field)
      break
    case 'less_than_equal':
      result = lte(logic.value, value, field)
      break
    case 'between':
      result = between(logic.value, value, field)
      break
    case 'one_of':
      result = oneOf(logic.value, value, field)
      break
    case 'not_one_of':
      result = notOneOf(logic.value, value, field)
      break
    case 'belong_one_of':
      result = belongOneOf(logic.value, value, field)
      break
    case 'not_belong_one_of':
      result = notBelongOneOf(logic.value, value, field)
      break
  }
  return result
}
const changeState = (fieldsLogicState, field, key, value) => {
  if (!fieldsLogicState.has(field)) {
    fieldsLogicState.set(field, {})
  }
  fieldsLogicState.get(field)[key] = value
}
const operatingVisible = (isValidation, rule, fields, fieldsLogicState) => {
  _.get(rule, 'then.conditions', []).forEach(condition => {
    switch (condition.property) {
      case 'show':
        if (isValidation) {
          findFieldsByid(condition.value, fields).forEach(field => {
            changeState(fieldsLogicState, field, 'visible', 1)
          })
        } else {
          findFieldsByid(condition.value, fields).forEach(field => {
            changeState(fieldsLogicState, field, 'visible', 0)
          })
        }
        break
      case 'hide':
        if (isValidation) {
          findFieldsByid(condition.value, fields).forEach(field => {
            changeState(fieldsLogicState, field, 'visible', 0)
          })
        } else {
          findFieldsByid(condition.value, fields).forEach(field => {
            changeState(fieldsLogicState, field, 'visible', 1)
          })
        }
        break
    }
  })
}
const operatingRequired = (isValidation, rule, fields, fieldsLogicState) => {
  _.get(rule, 'then.conditions', []).forEach(condition => {
    switch (condition.operator) {
      case 'required':
        if (isValidation) {
          findFieldsByid(condition.value, fields).forEach(field => {
            // fieldsRequired.set(field, 1)
            changeState(fieldsLogicState, field, 'required', 1)
          })
        } else {
          findFieldsByid(condition.value, fields).forEach(field => {
            // fieldsRequired.set(field, 0)
            changeState(fieldsLogicState, field, 'required', 0)
          })
        }
        break
      case 'not_required':
        if (isValidation) {
          findFieldsByid(condition.value, fields).forEach(field => {
            // fieldsRequired.set(field, 0)
            changeState(fieldsLogicState, field, 'required', 0)
          })
        } else {
          findFieldsByid(condition.value, fields).forEach(field => {
            // fieldsRequired.set(field, 1)
            changeState(fieldsLogicState, field, 'required', 1)
          })
        }
        break
    }
  })
}
const operatingReadOnly = (isValidation, rule, fields, fieldsLogicState) => {
  _.get(rule, 'then.conditions', []).forEach(condition => {
    switch (condition.operator) {
      case 'readOnly':
        if (isValidation) {
          findFieldsByid(condition.value, fields).forEach(field => {
            changeState(fieldsLogicState, field, 'readOnly', 1)
          })
        } else {
          findFieldsByid(condition.value, fields).forEach(field => {
            changeState(fieldsLogicState, field, 'readOnly', 0)
          })
        }
        break
      case 'editable':
        if (isValidation) {
          findFieldsByid(condition.value, fields).forEach(field => {
            changeState(fieldsLogicState, field, 'readOnly', 0)
          })
        } else {
          findFieldsByid(condition.value, fields).forEach(field => {
            changeState(fieldsLogicState, field, 'readOnly', 1)
          })
        }
        break
    }
  })
}
const operatingValidation = (isValidation, rule, fields, fieldsLogicState) => {
  _.get(rule, 'then.conditions', []).forEach(condition => {
    if (isValidation) {
      fieldsValidation.set(condition, 1)
    } else {
      fieldsValidation.delete(condition)
    }
  })
}
const listenEvent = (state) => {
  const rules = findValidityRule(state)
  for (const type in rules) {
    rules[type].forEach(rule => {
      const targetFields = findFieldsByid(rule.if.conditions.map(e => e.property), state.fields)
      const operator = (v) => rule.if.logicalOperator === 'and' ? v.every(v => v) : v.some(v => v)
      const subforms = targetFields.filter(field => field.type === 'subform')
      subforms.forEach(subform => {
        watch(() => utils.findSubFormAllFields(subform).map(e => e.options.defaultValue), () => {
          subform.options.defaultValue = utils.getSubFormValues(subform)
        }, {
          immediate: true,
          deep: true,
          flush: 'sync'
        })
      })
      watch(() => targetFields.map(e => e.options.defaultValue), (values) => {
        // console.log(operator(values.map((value, index) => validator(rule.if.conditions[index], value, targetFields[index]))))
        switch (type) {
          case 'visible':
            operatingVisible(operator(values.map((value, index) => validator(rule.if.conditions[index], value, targetFields[index]))), rule, state.fields, state.fieldsLogicState)
            break
          case 'required':
            operatingRequired(operator(values.map((value, index) => validator(rule.if.conditions[index], value, targetFields[index]))), rule, state.fields, state.fieldsLogicState)
            break
          case 'readOnly':
            operatingReadOnly(operator(values.map((value, index) => validator(rule.if.conditions[index], value, targetFields[index]))), rule, state.fields, state.fieldsLogicState)
            break
          // case 'validation':
          //   operatingValidation(operator(values.map((value, index) => validator(rule.if.conditions[index], value, targetFields[index]))), rule, state.fields, state.fieldsValidation)
          //   break
        }
      }, {
        immediate: true,
        deep: true
      })
    })
  }
}
export const useLogic = (state) => {
  watch(() => state.logic, () => {
    listenEvent(state)
  })
}

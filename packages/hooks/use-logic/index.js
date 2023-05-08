import { computed, watch } from 'vue'
import _ from 'lodash-es'
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
// const runLogic = () => {}
const getDataType = (fieldType) => {
  let result = ''
  switch (fieldType) {
    case 'textarea':
    case 'input':
    case 'html':
      result = 'string'
      break
    case 'number':
    case 'rate':
    case 'slider':
      result = 'number'
      break
  }
  return result
}
const equal = (logicValue, value, filedType) => {
  // console.log(logicValue)
  // console.log(value)
  if (filedType === 'region') {
    return _.includes(logicValue, value)
  }
  if (_.isString(value) || _.isNumber(value)) {
    return _.isEqual(logicValue, value)
  }
  if (_.isArray(value)) {
    // if (/^(select|checkbox)$/.test(filedType)) {
    //   return logicValue.length === value.length && _.isEqual(_.chain(logicValue).clone().flattenDeep().sort().value(), _.chain(value).clone().flattenDeep().sort().value())
    // }
    return _.isEqual(_.chain(logicValue).clone().flattenDeep().sort().value(), _.chain(value).clone().flattenDeep().sort().value())
  }
  if (_.isBoolean(value)) {
    return !!logicValue === value
  }
}
const notEqual = (...e) => {
  return !equal(...e)
}
const contains = (logicValue, value, filedType) => {
  if (_.isString(value)) {
    return logicValue.some((v) => _.includes(value, v))
  }
  if (_.isArray(value)) {
    return !!_.intersection(logicValue, value).length
  }
}
export const validator = (logic, value, filed) => {
  let result = false
  // console.log(filed)
  switch (logic.operator) {
    case 'equal':
      // result = logic.value === value
      result = equal(logic.value, value, filed.type)
      break
    case 'one_of':
      break
    case 'not_equal':
      result = notEqual(logic.value, value, filed.type)
      break
    case 'contains':
      console.log(logic.value)
      console.log(`操作符的值：${logic.value} type: ${typeof logic.value}`)
      console.log(value)
      console.log(`field的值：${value} type: ${typeof value}`)
      result = contains(logic.value, value, filed.type)
      break
    case 'not_contain':
      break
    case 'empty':
      break
    case 'not_empty':
      break
    case 'greater_than':
      break
    case 'greater_than_equal':
      break
    case 'less_than':
      break
    case 'less_than_equal':
      break
    case 'between':
      break
  }
  return result
}
const operatingShowHidden = (fields, rules) => {
  rules.forEach(rule => {
    const targetFields = findFieldsByid(rule.if.conditions.map(e => e.property), fields)
    // console.log(rule.if.logicalOperator)
    const operator = (v) => rule.if.logicalOperator === 'and' ? v.every(v => v) : v.some(v => v)
    // console.log(targetFields)
    // console.log(rule)
    // watch(() => [targetFields[0].options.defaultValue], () => {
    watch(() => targetFields.map(e => e.options.defaultValue), (values) => {
      // console.log(values)
      // console.log(operator(values.map((value, index) => validator(rule.if.conditions[index], value, getDataType(targetFields[index].type)))))
      console.log(operator(values.map((value, index) => validator(rule.if.conditions[index], value, targetFields[index]))))
      // console.log(values.map((value, index) => validator(rule.if.conditions[index], value, getDataType(targetFields[index].type))))
    })
    // console.log(rule.if.conditions.map(e => e.property))
  })
}
const listenEvent = (state) => {
  const rules = findValidityRule(state)
  for (const type in rules) {
    switch (type) {
      case 'showHidden':
        operatingShowHidden(state.fields, rules[type])
        break
    }
  }
}
export const useLogic = (state) => {
  // console.log(state)
  // console.log(state.logic)
  watch(() => state.logic, () => {
    listenEvent(state)
  })
  // findValidityFields(state)
}

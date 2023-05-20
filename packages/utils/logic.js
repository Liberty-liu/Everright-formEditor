import _ from 'lodash-es'
export const checkIdExistInLogic = (fieldId, logic) => {
  return new RegExp(`"${fieldId}"`).test(JSON.stringify(logic))
}
export const removeLogicDataByid = (fieldId, logic) => {
  for (const rules of Object.values(logic)) {
    for (let i0 = 0; i0 < rules.length; i0++) {
      const conditions = _.get(rules[i0], 'ifRules.filters[0].conditions', [])
      for (let i1 = 0; i1 < conditions.length; i1++) {
        if (conditions[i1].property === fieldId) {
          conditions.splice(i1--, 1)
        }
      }
      if (!conditions.length) {
        rules.splice(i0--, 1)
      }
    }
  }
  for (const key in logic) {
    if (!logic[key].length) {
      delete logic[key]
    }
  }

  for (const rules of Object.values(logic)) {
    for (let i0 = 0; i0 < rules.length; i0++) {
      const conditions = _.get(rules[i0], 'thenRules.filters[0].conditions', [])
      for (let i1 = 0; i1 < conditions.length; i1++) {
        for (let i2 = 0; i2 < conditions[i1].value.length; i2++) {
          if (conditions[i1].value[i2] === fieldId) {
            conditions[i1].value.splice(i2--, 1)
          }
        }
        if (!conditions[i1].value.length) {
          conditions.splice(i1--, 1)
        }
      }
      if (!conditions.length) {
        rules.splice(i0--, 1)
      }
    }
  }
  for (const key in logic) {
    if (!logic[key].length) {
      delete logic[key]
    }
  }
}

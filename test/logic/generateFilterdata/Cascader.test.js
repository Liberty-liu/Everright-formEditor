import { describe, assert, expect, test, beforeEach } from 'vitest'
import { generateIfFilterOptionsData } from '@ER/formEditor/components/Panels/Config/components/generateFilterdata.js'
import { Cascader } from '@ER-test/data/fields.js'
import _ from 'lodash-es'
describe('Generate filter data: Cascader', () => {
  let testData = {}
  beforeEach(() => {
    testData = _.cloneDeep(Cascader)
  })
  test('property:["multiple = true", "checkStrictly = true"]', () => {
    testData.options.multiple = true
    testData.options.checkStrictly = true
    expect(generateIfFilterOptionsData('', [testData])).toMatchSnapshot()
  })
  test('property:["multiple = true", "checkStrictly = false"]', () => {
    testData.options.multiple = true
    testData.options.checkStrictly = false
    expect(generateIfFilterOptionsData('', [testData])).toMatchSnapshot()
  })
  test('property:["multiple = false", "checkStrictly = false"]', () => {
    testData.options.multiple = false
    testData.options.checkStrictly = false
    expect(generateIfFilterOptionsData('', [testData])).toMatchSnapshot()
  })
  test('property:["multiple = false", "checkStrictly = true"]', () => {
    testData.options.multiple = false
    testData.options.checkStrictly = true
    expect(generateIfFilterOptionsData('', [testData])).toMatchSnapshot()
  })
})

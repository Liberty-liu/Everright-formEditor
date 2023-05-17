import { describe, assert, expect, test, beforeEach } from 'vitest'
import { generateIfFilterOptionsData } from '@ER/formEditor/components/Panels/Config/components/generateFilterdata.js'
import _ from 'lodash-es'
import { Select } from '@ER-test/data/fields.js'
describe('Generate filter data: Select', () => {
  let testData = {}
  beforeEach(() => {
    testData = _.cloneDeep(Select)
  })
  test('property:["multiple = false"]', () => {
    testData.options.multiple = false
    expect(generateIfFilterOptionsData('', [testData])).toMatchSnapshot()
  })
  test('property:["multiple = true"]', () => {
    testData.options.multiple = true
    expect(generateIfFilterOptionsData('', [testData])).toMatchSnapshot()
  })
})

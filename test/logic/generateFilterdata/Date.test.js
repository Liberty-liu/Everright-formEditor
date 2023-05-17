import { describe, assert, expect, test, beforeEach } from 'vitest'
import { generateIfFilterOptionsData } from '@ER/formEditor/components/Panels/Config/components/generateFilterdata.js'
import _ from 'lodash-es'
import { Date } from '@ER-test/data/fields.js'
describe('Generate filter data: Date', () => {
  let testData = {}
  beforeEach(() => {
    testData = _.cloneDeep(Date)
  })
  test('property:["type = date"]', () => {
    testData.options.type = 'date'
    expect(generateIfFilterOptionsData('', [testData])).toMatchSnapshot()
  })
  test('property:["type = datetime"]', () => {
    testData.options.type = 'datetime'
    expect(generateIfFilterOptionsData('', [testData])).toMatchSnapshot()
  })
  test('property:["type = dates"]', () => {
    testData.options.type = 'dates'
    expect(generateIfFilterOptionsData('', [testData])).toMatchSnapshot()
  })
  test('property:["type = daterange"]', () => {
    testData.options.type = 'daterange'
    expect(generateIfFilterOptionsData('', [testData])).toMatchSnapshot()
  })
})

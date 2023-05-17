import { describe, assert, expect, test, beforeEach } from 'vitest'
import { generateIfFilterOptionsData } from '@ER/formEditor/components/Panels/Config/components/generateFilterdata.js'
import _ from 'lodash-es'
import { Region } from '@ER-test/data/fields.js'
describe('Generate filter data: Region', () => {
  let testData = {}
  beforeEach(() => {
    testData = _.cloneDeep(Region)
  })
  test('property:["selectType = 1"]', () => {
    testData.options.selectType = 1
    expect(generateIfFilterOptionsData('', [testData])).toMatchSnapshot()
  })
  test('property:["selectType = 2"]', () => {
    testData.options.selectType = 2
    expect(generateIfFilterOptionsData('', [testData])).toMatchSnapshot()
  })
  test('property:["selectType = 3"]', () => {
    testData.options.selectType = 3
    expect(generateIfFilterOptionsData('', [testData])).toMatchSnapshot()
  })
})

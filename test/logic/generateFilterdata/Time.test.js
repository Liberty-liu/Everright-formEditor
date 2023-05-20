import { describe, assert, expect, test, beforeEach } from 'vitest'
import { generateIfFilterOptionsData } from '@ER/formEditor/components/Panels/Config/components/generateFilterdata.js'
import _ from 'lodash-es'
import { Time } from '@ER-test/data/fields.js'
describe('Generate filter data: Time', () => {
  let testData = {}
  beforeEach(() => {
    testData = _.cloneDeep(Time)
  })
  test('default', () => {
    testData.options.multiple = false
    expect(generateIfFilterOptionsData('', [testData])).toMatchSnapshot()
  })
})

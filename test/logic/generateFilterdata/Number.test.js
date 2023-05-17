import { describe, assert, expect, test, beforeEach } from 'vitest'
import { generateIfFilterOptionsData } from '@ER/formEditor/components/Panels/Config/components/generateFilterdata.js'
import _ from 'lodash-es'
import { Number } from '@ER-test/data/fields.js'
describe('Generate filter data: Number', () => {
  let testData = {}
  beforeEach(() => {
    testData = _.cloneDeep(Number)
  })
  test('default', () => {
    expect(generateIfFilterOptionsData('', [testData])).toMatchSnapshot()
  })
})

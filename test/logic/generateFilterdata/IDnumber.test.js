import { describe, assert, expect, test, beforeEach } from 'vitest'
import { generateIfFilterOptionsData } from '@ER/formEditor/components/Panels/Config/components/generateFilterdata.js'
import _ from 'lodash-es'
import { IDnumber } from '@ER-test/data/fields.js'
describe('Generate filter data: ID number', () => {
  let testData = {}
  beforeEach(() => {
    testData = _.cloneDeep(IDnumber)
  })
  test('default', () => {
    expect(generateIfFilterOptionsData('', [testData])).toMatchSnapshot()
  })
})

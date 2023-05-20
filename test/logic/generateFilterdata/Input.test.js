import { describe, assert, expect, test, beforeEach } from 'vitest'
import { generateIfFilterOptionsData } from '@ER/formEditor/components/Panels/Config/components/generateFilterdata.js'
import _ from 'lodash-es'
import { Input } from '@ER-test/data/fields.js'
describe('Generate filter data: Input', () => {
  let testData = {}
  beforeEach(() => {
    testData = _.cloneDeep(Input)
  })
  test('default', () => {
    expect(generateIfFilterOptionsData('', [testData])).toMatchSnapshot()
  })
})

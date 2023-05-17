import { describe, assert, expect, test, beforeEach } from 'vitest'
import { generateIfFilterOptionsData } from '@ER/formEditor/components/Panels/Config/components/generateFilterdata.js'
import _ from 'lodash-es'
import { Textarea } from '@ER-test/data/fields.js'
describe('Generate filter data: Textarea', () => {
  let testData = {}
  beforeEach(() => {
    testData = _.cloneDeep(Textarea)
  })
  test('default', () => {
    expect(generateIfFilterOptionsData('', [testData])).toMatchSnapshot()
  })
})

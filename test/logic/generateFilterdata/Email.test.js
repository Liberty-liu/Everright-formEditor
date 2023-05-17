import { describe, assert, expect, test, beforeEach } from 'vitest'
import { generateIfFilterOptionsData } from '@ER/formEditor/components/Panels/Config/components/generateFilterdata.js'
import _ from 'lodash-es'
import { Email } from '@ER-test/data/fields.js'
describe('Generate filter data: Email', () => {
  let testData = {}
  beforeEach(() => {
    testData = _.cloneDeep(Email)
  })
  test('default', () => {
    expect(generateIfFilterOptionsData('', [testData])).toMatchSnapshot()
  })
})

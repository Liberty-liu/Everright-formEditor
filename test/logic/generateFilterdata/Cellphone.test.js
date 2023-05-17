import { describe, assert, expect, test, beforeEach } from 'vitest'
import { generateIfFilterOptionsData } from '@ER/formEditor/components/Panels/Config/components/generateFilterdata.js'
import _ from 'lodash-es'
import { Cellphone } from '@ER-test/data/fields.js'
describe('Generate filter data: Cellphone', () => {
  let testData = {}
  beforeEach(() => {
    testData = _.cloneDeep(Cellphone)
  })
  test('default', () => {
    expect(generateIfFilterOptionsData('', [testData])).toMatchSnapshot()
  })
})

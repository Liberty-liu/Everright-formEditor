import { describe, assert, expect, test, beforeEach, beforeAll } from 'vitest'
import { generateIfFilterOptionsData } from '@ER/formEditor/components/Panels/Config/components/generateFilterdata.js'
import _ from 'lodash-es'
import erGeneratorData from '@ER/formEditor/generatorData.js'
import * as erComponentsConfig from '@ER/formEditor/componentsConfig.js'
describe('Generate filter data: Subform', () => {
  let testData = {}
  beforeAll(() => {
    testData = erGeneratorData(_.cloneDeep(erComponentsConfig.fieldsConfig[2].list[5]), false, 'en')
  })
  test('default', () => {
    expect(generateIfFilterOptionsData('', [testData])).toMatchSnapshot()
  })
})

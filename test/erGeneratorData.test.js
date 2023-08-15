import { describe, assert, expect, test, beforeEach } from 'vitest'
import { erFormConfig, erGeneratorData, erComponentsConfig, utils } from '@ER/formEditor'
describe('Generate field data:', () => {
  test.only('Email', () => {
    expect(erGeneratorData(erComponentsConfig.fieldsConfig[0].list[0], true, 'en')).toMatchSnapshot()
  })
})

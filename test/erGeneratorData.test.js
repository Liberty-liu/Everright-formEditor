import { describe, assert, expect, test, beforeEach } from 'vitest'
import { erFormConfig, erGeneratorData, erComponentsConfig, utils } from '@ER/formEditor'
describe('Generate field data:', () => {
  test('Email', () => {
    expect(erGeneratorData(erComponentsConfig.fieldsConfig[0].list[0], true, 'en')).toMatchSnapshot()
  })
  test('Cellphone', () => {
    expect(erGeneratorData(erComponentsConfig.fieldsConfig[0].list[1], true, 'en')).toMatchSnapshot()
  })
})

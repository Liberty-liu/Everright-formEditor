import { describe, assert, expect, test, beforeEach } from 'vitest'
import { erFormConfig, erGeneratorData, erComponentsConfig, utils } from '@ER/formEditor'
describe('Generate field data:', () => {
  test('Email', () => {
    expect(erGeneratorData(erComponentsConfig.fieldsConfig[0].list[0], true, 'en')).toMatchSnapshot()
  })
  test('Cellphone', () => {
    expect(erGeneratorData(erComponentsConfig.fieldsConfig[0].list[1], true, 'en')).toMatchSnapshot()
  })
  test('URL', () => {
    expect(erGeneratorData(erComponentsConfig.fieldsConfig[0].list[2], true, 'en')).toMatchSnapshot()
  })
  test('Region', () => {
    expect(erGeneratorData(erComponentsConfig.fieldsConfig[0].list[3], true, 'en')).toMatchSnapshot()
  })
  test('ID number', () => {
    expect(erGeneratorData(erComponentsConfig.fieldsConfig[0].list[4], true, 'en')).toMatchSnapshot()
  })
  test('Input', () => {
    expect(erGeneratorData(erComponentsConfig.fieldsConfig[1].list[0], true, 'en')).toMatchSnapshot()
  })
  test('Textarea', () => {
    expect(erGeneratorData(erComponentsConfig.fieldsConfig[1].list[1], true, 'en')).toMatchSnapshot()
  })
})

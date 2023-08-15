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
  test('Number', () => {
    expect(erGeneratorData(erComponentsConfig.fieldsConfig[1].list[2], true, 'en')).toMatchSnapshot()
  })
  test('Radio', () => {
    const result = erGeneratorData(erComponentsConfig.fieldsConfig[1].list[3], true, 'en')
    result.columns[0].options.data = utils.generateOptions(3).map((e, i) => {
      e.label += i + 1
      return e
    })
    expect(result).toMatchSnapshot()
  })
  test('Checkbox', () => {
    const result = erGeneratorData(erComponentsConfig.fieldsConfig[1].list[4], true, 'en')
    result.columns[0].options.data = utils.generateOptions(3).map((e, i) => {
      e.label += i + 1
      return e
    })
    expect(result).toMatchSnapshot()
  })
  test('Select', () => {
    const result = erGeneratorData(erComponentsConfig.fieldsConfig[1].list[5], true, 'en')
    result.columns[0].options.data = utils.generateOptions(3).map((e, i) => {
      e.label += i + 1
      return e
    })
    expect(result).toMatchSnapshot()
  })
  test('Time', () => {
    expect(erGeneratorData(erComponentsConfig.fieldsConfig[1].list[6], true, 'en')).toMatchSnapshot()
  })
})

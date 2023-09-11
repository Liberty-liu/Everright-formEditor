import { describe, assert, expect, test, beforeAll } from 'vitest'
import { validator } from '@ER/hooks/use-logic'
import _ from 'lodash-es'
import erGeneratorData from '@ER/formEditor/generatorData.js'
import * as erComponentsConfig from '@ER/formEditor/componentsConfig.js'
describe('Subform', () => {
  let field = {}
  beforeAll(() => {
    field = erGeneratorData(_.cloneDeep(erComponentsConfig.fieldsConfig[2].list[5]), true, 'en')
  })
  test('empty', () => {
    expect(
      validator({
        operator: 'empty'
      },
      '',
      field)).toBeTruthy()
    expect(
      validator({
        operator: 'empty'
      },
      undefined,
      field)).toBeTruthy()
    expect(
      validator({
        operator: 'empty'
      },
      null,
      field)).toBeTruthy()
    expect(
      validator({
        operator: 'empty'
      },
      [],
      field)).toBeTruthy()
    expect(
      validator({
        operator: 'empty'
      },
      [{}],
      field)).toBeFalsy()
  })
  test('not_empty', () => {
    expect(
      validator({
        operator: 'not_empty'
      },
      '',
      field)).toBeFalsy()
    expect(
      validator({
        operator: 'not_empty'
      },
      undefined,
      field)).toBeFalsy()
    expect(
      validator({
        operator: 'not_empty'
      },
      null,
      field)).toBeFalsy()
    expect(
      validator({
        operator: 'not_empty'
      },
      [{}],
      field)).toBeTruthy()
  })
})

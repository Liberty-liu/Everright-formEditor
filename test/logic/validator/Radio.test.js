import { describe, assert, expect, test } from 'vitest'
import { validator } from '@ER/hooks/use-logic'
import { Radio } from '@ER-test/data/fields.js'
describe('Radio', () => {
  test('equal', () => {
    expect(
      validator({
        operator: 'equal',
        value: 'CrvWR4TVdNRxvxty5iAT2'
      },
      'CrvWR4TVdNRxvxty5iAT2',
      Radio)).toBeTruthy()
  })
  test('not_equal', () => {
    expect(
      validator({
        operator: 'not_equal',
        value: 'CrvWR4TVdNRxvxty5iAT2'
      },
      'CrvWR4TVdNRxvxty5iAT2',
      Radio)).toBeFalsy()
  })
  test('contains', () => {
    expect(
      validator({
        operator: 'contains',
        value: ['CrvWR4TVdNRxvxty5iAT2']
      },
      'CrvWR4TVdNRxvxty5iAT2',
      Radio)).toBeTruthy()
  })
  test('empty', () => {
    expect(
      validator({
        operator: 'empty'
      },
      '',
      Radio)).toBeTruthy()
    expect(
      validator({
        operator: 'empty'
      },
      undefined,
      Radio)).toBeTruthy()
    expect(
      validator({
        operator: 'empty'
      },
      null,
      Radio)).toBeTruthy()
  })
  test('not_empty', () => {
    expect(
      validator({
        operator: 'not_empty'
      },
      '',
      Radio)).toBeFalsy()
    expect(
      validator({
        operator: 'not_empty'
      },
      undefined,
      Radio)).toBeFalsy()
    expect(
      validator({
        operator: 'not_empty'
      },
      null,
      Radio)).toBeFalsy()
  })
})

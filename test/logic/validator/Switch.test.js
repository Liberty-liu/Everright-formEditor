import { describe, assert, expect, test } from 'vitest'
import { validator } from '@ER/hooks/use-logic'
import { Switch } from '@ER-test/data/fields.js'
describe('Switch', () => {
  test('equal', () => {
    expect(
      validator({
        operator: 'equal',
        value: 1
      },
      true,
      Switch)).toBeTruthy()
    expect(
      validator({
        operator: 'equal',
        value: 0
      },
      false,
      Switch)).toBeTruthy()
  })
  test('not_equal', () => {
    expect(
      validator({
        operator: 'not_equal',
        value: 1
      },
      true,
      Switch)).toBeFalsy()
    expect(
      validator({
        operator: 'not_equal',
        value: 0
      },
      false,
      Switch)).toBeFalsy()
  })
})

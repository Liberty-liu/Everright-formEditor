import { describe, assert, expect, test } from 'vitest'
import { validator } from '@ER/hooks/use-logic'
import { Signature } from '@ER-test/data/fields.js'
describe('Signature', () => {
  test('empty', () => {
    expect(
      validator({
        operator: 'empty'
      },
      '',
      Signature)).toBeTruthy()
    expect(
      validator({
        operator: 'empty'
      },
      undefined,
      Signature)).toBeTruthy()
    expect(
      validator({
        operator: 'empty'
      },
      null,
      Signature)).toBeTruthy()
  })
  test('not_empty', () => {
    expect(
      validator({
        operator: 'not_empty'
      },
      '',
      Signature)).toBeFalsy()
    expect(
      validator({
        operator: 'not_empty'
      },
      undefined,
      Signature)).toBeFalsy()
    expect(
      validator({
        operator: 'not_empty'
      },
      null,
      Signature)).toBeFalsy()
  })
})

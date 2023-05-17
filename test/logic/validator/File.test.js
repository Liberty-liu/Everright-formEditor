import { describe, assert, expect, test } from 'vitest'
import { validator } from '@ER/hooks/use-logic'
import { File } from '@ER-test/data/fields.js'
describe('File', () => {
  test('empty', () => {
    expect(
      validator({
        operator: 'empty'
      },
      '',
      File)).toBeTruthy()
    expect(
      validator({
        operator: 'empty'
      },
      undefined,
      File)).toBeTruthy()
    expect(
      validator({
        operator: 'empty'
      },
      null,
      File)).toBeTruthy()
    expect(
      validator({
        operator: 'empty'
      },
      [],
      File)).toBeTruthy()
  })
  test('not_empty', () => {
    expect(
      validator({
        operator: 'not_empty'
      },
      '',
      File)).toBeFalsy()
    expect(
      validator({
        operator: 'not_empty'
      },
      undefined,
      File)).toBeFalsy()
    expect(
      validator({
        operator: 'not_empty'
      },
      null,
      File)).toBeFalsy()
    expect(
      validator({
        operator: 'not_empty'
      },
      [],
      File)).toBeFalsy()
  })
})

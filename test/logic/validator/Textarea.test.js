import { describe, assert, expect, test } from 'vitest'
import { validator } from '@ER/hooks/use-logic'
import { Textarea } from '@ER-test/data/fields.js'
describe('Textarea', () => {
  test('equal', () => {
    expect(
      validator({
        operator: 'equal',
        value: '123'
      },
      '123',
      Textarea)).toBeTruthy()
  })
  test('not_equal', () => {
    expect(
      validator({
        operator: 'not_equal',
        value: '123'
      },
      '123',
      Textarea)).toBeFalsy()
  })
  test('contains', () => {
    expect(
      validator({
        operator: 'contains',
        value: [
          '123'
        ]
      },
      '123',
      Textarea)).toBeTruthy()
  })
  test('not_contain', () => {
    expect(
      validator({
        operator: 'not_contain',
        value: [
          '123'
        ]
      },
      '123',
      Textarea)).toBeFalsy()
  })
  test('empty', () => {
    expect(
      validator({
        operator: 'empty'
      },
      '',
      Textarea)).toBeTruthy()
    expect(
      validator({
        operator: 'empty'
      },
      undefined,
      Textarea)).toBeTruthy()
    expect(
      validator({
        operator: 'empty'
      },
      null,
      Textarea)).toBeTruthy()
  })
  test('not_empty', () => {
    expect(
      validator({
        operator: 'not_empty'
      },
      '',
      Textarea)).toBeFalsy()
    expect(
      validator({
        operator: 'not_empty'
      },
      undefined,
      Textarea)).toBeFalsy()
    expect(
      validator({
        operator: 'not_empty'
      },
      null,
      Textarea)).toBeFalsy()
  })
})

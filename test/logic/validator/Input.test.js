import { describe, assert, expect, test } from 'vitest'
import { validator } from '@ER/hooks/use-logic'
import { Input } from '@ER-test/data/fields.js'
describe('Input', () => {
  test('equal', () => {
    expect(
      validator({
        operator: 'equal',
        value: '123'
      },
      '123',
      Input)).toBeTruthy()
  })
  test('not_equal', () => {
    expect(
      validator({
        operator: 'not_equal',
        value: '123'
      },
      '123',
      Input)).toBeFalsy()
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
      Input)).toBeTruthy()
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
      Input)).toBeFalsy()
  })
  test('empty', () => {
    expect(
      validator({
        operator: 'empty'
      },
      '',
      Input)).toBeTruthy()
    expect(
      validator({
        operator: 'empty'
      },
      undefined,
      Input)).toBeTruthy()
    expect(
      validator({
        operator: 'empty'
      },
      null,
      Input)).toBeTruthy()
  })
  test('not_empty', () => {
    expect(
      validator({
        operator: 'not_empty'
      },
      '',
      Input)).toBeFalsy()
    expect(
      validator({
        operator: 'not_empty'
      },
      undefined,
      Input)).toBeFalsy()
    expect(
      validator({
        operator: 'not_empty'
      },
      null,
      Input)).toBeFalsy()
  })
})

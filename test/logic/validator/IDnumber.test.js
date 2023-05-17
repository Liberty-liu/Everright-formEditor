import { describe, assert, expect, test } from 'vitest'
import { validator } from '@ER/hooks/use-logic'
import { IDnumber } from '@ER-test/data/fields.js'
describe('ID number', () => {
  test('equal', () => {
    expect(
      validator({
        operator: 'equal',
        value: '123'
      },
      '123',
      IDnumber)).toBeTruthy()
  })
  test('not_equal', () => {
    expect(
      validator({
        operator: 'not_equal',
        value: '123'
      },
      '123',
      IDnumber)).toBeFalsy()
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
      IDnumber)).toBeTruthy()
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
      IDnumber)).toBeFalsy()
  })
  test('empty', () => {
    expect(
      validator({
        operator: 'empty'
      },
      '',
      IDnumber)).toBeTruthy()
    expect(
      validator({
        operator: 'empty'
      },
      undefined,
      IDnumber)).toBeTruthy()
    expect(
      validator({
        operator: 'empty'
      },
      null,
      IDnumber)).toBeTruthy()
  })
  test('not_empty', () => {
    expect(
      validator({
        operator: 'not_empty'
      },
      '',
      IDnumber)).toBeFalsy()
    expect(
      validator({
        operator: 'not_empty'
      },
      undefined,
      IDnumber)).toBeFalsy()
    expect(
      validator({
        operator: 'not_empty'
      },
      null,
      IDnumber)).toBeFalsy()
  })
})

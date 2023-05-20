import { describe, assert, expect, test } from 'vitest'
import { validator } from '@ER/hooks/use-logic'
import { Cellphone } from '@ER-test/data/fields.js'
describe('Cellphone', () => {
  test('equal', () => {
    expect(
      validator({
        operator: 'equal',
        value: '123'
      },
      '123',
      Cellphone)).toBeTruthy()
  })
  test('not_equal', () => {
    expect(
      validator({
        operator: 'not_equal',
        value: '123'
      },
      '123',
      Cellphone)).toBeFalsy()
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
      Cellphone)).toBeTruthy()
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
      Cellphone)).toBeFalsy()
  })
  test('empty', () => {
    expect(
      validator({
        operator: 'empty'
      },
      '',
      Cellphone)).toBeTruthy()
    expect(
      validator({
        operator: 'empty'
      },
      undefined,
      Cellphone)).toBeTruthy()
    expect(
      validator({
        operator: 'empty'
      },
      null,
      Cellphone)).toBeTruthy()
  })
  test('not_empty', () => {
    expect(
      validator({
        operator: 'not_empty'
      },
      '',
      Cellphone)).toBeFalsy()
    expect(
      validator({
        operator: 'not_empty'
      },
      undefined,
      Cellphone)).toBeFalsy()
    expect(
      validator({
        operator: 'not_empty'
      },
      null,
      Cellphone)).toBeFalsy()
  })
})

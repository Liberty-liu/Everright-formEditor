import { describe, assert, expect, test } from 'vitest'
import { validator } from '@ER/hooks/use-logic'
import { Email } from '@ER-test/data/fields.js'
describe('Email', () => {
  test('equal', () => {
    expect(
      validator({
        operator: 'equal',
        value: '123'
      },
      '123',
      Email)).toBeTruthy()
  })
  test('not_equal', () => {
    expect(
      validator({
        operator: 'not_equal',
        value: '123'
      },
      '123',
      Email)).toBeFalsy()
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
      Email)).toBeTruthy()
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
      Email)).toBeFalsy()
    expect(
      validator({
        operator: 'not_contain',
        value: [
          '123'
        ]
      },
      '456',
      Email)).toBeTruthy()
  })
  test('empty', () => {
    expect(
      validator({
        operator: 'empty'
      },
      '',
      Email)).toBeTruthy()
    expect(
      validator({
        operator: 'empty'
      },
      undefined,
      Email)).toBeTruthy()
    expect(
      validator({
        operator: 'empty'
      },
      null,
      Email)).toBeTruthy()
  })
  test('not_empty', () => {
    expect(
      validator({
        operator: 'not_empty'
      },
      '',
      Email)).toBeFalsy()
    expect(
      validator({
        operator: 'not_empty'
      },
      undefined,
      Email)).toBeFalsy()
    expect(
      validator({
        operator: 'not_empty'
      },
      null,
      Email)).toBeFalsy()
  })
})

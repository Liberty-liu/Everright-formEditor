import { describe, assert, expect, test } from 'vitest'
import { validator } from '@ER/hooks/use-logic'
import { Html } from '@ER-test/data/fields.js'
describe('Html', () => {
  test('equal', () => {
    expect(
      validator({
        operator: 'equal',
        value: '<p>123</p>'
      },
      '<p>123</p>',
      Html)).toBeTruthy()
  })
  test('not_equal', () => {
    expect(
      validator({
        operator: 'not_equal',
        value: '<p>123</p>'
      },
      '<p>123</p>',
      Html)).toBeFalsy()
  })
  test('contains', () => {
    expect(
      validator({
        operator: 'contains',
        value: [
          '<p>123</p>'
        ]
      },
      '<p>123</p>',
      Html)).toBeTruthy()
  })
  test('not_contain', () => {
    expect(
      validator({
        operator: 'not_contain',
        value: [
          '<p>123</p>'
        ]
      },
      '<p>123</p>',
      Html)).toBeFalsy()
  })
  test('empty', () => {
    expect(
      validator({
        operator: 'empty'
      },
      '',
      Html)).toBeTruthy()
    expect(
      validator({
        operator: 'empty'
      },
      undefined,
      Html)).toBeTruthy()
    expect(
      validator({
        operator: 'empty'
      },
      null,
      Html)).toBeTruthy()
  })
  test('not_empty', () => {
    expect(
      validator({
        operator: 'not_empty'
      },
      '',
      Html)).toBeFalsy()
    expect(
      validator({
        operator: 'not_empty'
      },
      undefined,
      Html)).toBeFalsy()
    expect(
      validator({
        operator: 'not_empty'
      },
      null,
      Html)).toBeFalsy()
  })
})

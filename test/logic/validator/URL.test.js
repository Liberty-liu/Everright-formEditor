import { describe, assert, expect, test } from 'vitest'
import { validator } from '@ER/hooks/use-logic'
import { URL } from '@ER-test/data/fields.js'
describe('URL', () => {
  test('equal', () => {
    expect(
      validator({
        operator: 'equal',
        value: 'https://everright.site/'
      },
      'https://everright.site/',
      URL)).toBeTruthy()
  })
  test('not_equal', () => {
    expect(
      validator({
        operator: 'not_equal',
        value: 'https://everright.site/'
      },
      'https://everright.site/',
      URL)).toBeFalsy()
  })
  test('contains', () => {
    expect(
      validator({
        operator: 'contains',
        value: [
          'https://everright.site/'
        ]
      },
      'https://everright.site/',
      URL)).toBeTruthy()
  })
  test('not_contain', () => {
    expect(
      validator({
        operator: 'not_contain',
        value: [
          'https://everright.site/'
        ]
      },
      'https://everright.site/',
      URL)).toBeFalsy()
  })
  test('empty', () => {
    expect(
      validator({
        operator: 'empty'
      },
      '',
      URL)).toBeTruthy()
    expect(
      validator({
        operator: 'empty'
      },
      undefined,
      URL)).toBeTruthy()
    expect(
      validator({
        operator: 'empty'
      },
      null,
      URL)).toBeTruthy()
  })
  test('not_empty', () => {
    expect(
      validator({
        operator: 'not_empty'
      },
      '',
      URL)).toBeFalsy()
    expect(
      validator({
        operator: 'not_empty'
      },
      undefined,
      URL)).toBeFalsy()
    expect(
      validator({
        operator: 'not_empty'
      },
      null,
      URL)).toBeFalsy()
  })
})

import { describe, assert, expect, test } from 'vitest'
import { validator } from '@ER/hooks/use-logic'
import { Rate } from '@ER-test/data/fields.js'
describe('Rate', () => {
  test('equal: allowHalf true', () => {
    expect(
      validator({
        operator: 'equal',
        value: 3.5
      },
      3.5,
      Rate)).toBeTruthy()
  })
  test('equal: allowHalf false', () => {
    Rate.options.allowHalf = false
    expect(
      validator({
        operator: 'equal',
        value: 3
      },
      3,
      Rate)).toBeTruthy()
  })
  test('not_equal: allowHalf true', () => {
    Rate.options.allowHalf = true
    expect(
      validator({
        operator: 'not_equal',
        value: 3.5
      },
      3.5,
      Rate)).toBeFalsy()
  })
  test('not_equal: allowHalf false', () => {
    Rate.options.allowHalf = false
    expect(
      validator({
        operator: 'not_equal',
        value: 3
      },
      3,
      Rate)).toBeFalsy()
  })
  test('empty', () => {
    expect(
      validator({
        operator: 'empty'
      },
      '',
      Rate)).toBeTruthy()
    expect(
      validator({
        operator: 'empty'
      },
      undefined,
      Rate)).toBeTruthy()
    expect(
      validator({
        operator: 'empty'
      },
      null,
      Rate)).toBeTruthy()
    expect(
      validator({
        operator: 'empty'
      },
      0,
      Rate)).toBeTruthy()
  })
  test('not_empty', () => {
    expect(
      validator({
        operator: 'not_empty'
      },
      '',
      Rate)).toBeFalsy()
    expect(
      validator({
        operator: 'not_empty'
      },
      undefined,
      Rate)).toBeFalsy()
    expect(
      validator({
        operator: 'not_empty'
      },
      null,
      Rate)).toBeFalsy()
    expect(
      validator({
        operator: 'not_empty'
      },
      0,
      Rate)).toBeFalsy()
  })
  test('greater_than', () => {
    expect(
      validator({
        operator: 'greater_than',
        value: 2
      },
      null,
      Rate)).toBeFalsy()
    expect(
      validator({
        operator: 'greater_than',
        value: 2
      },
      '',
      Rate)).toBeFalsy()
    expect(
      validator({
        operator: 'greater_than',
        value: 2
      },
      undefined,
      Rate)).toBeFalsy()
    expect(
      validator({
        operator: 'greater_than',
        value: 2
      },
      2.0,
      Rate)).toBeFalsy()
    expect(
      validator({
        operator: 'greater_than',
        value: 2
      },
      2.1,
      Rate)).toBeTruthy()
  })
  test('greater_than_equal', () => {
    expect(
      validator({
        operator: 'greater_than_equal',
        value: 2
      },
      2.1,
      Rate)).toBeTruthy()
  })
  test('less_than', () => {
    expect(
      validator({
        operator: 'less_than',
        value: 2
      },
      null,
      Rate)).toBeTruthy()
    expect(
      validator({
        operator: 'less_than',
        value: 2
      },
      '',
      Rate)).toBeTruthy()
    expect(
      validator({
        operator: 'less_than',
        value: 2
      },
      undefined,
      Rate)).toBeTruthy()
    expect(
      validator({
        operator: 'less_than',
        value: 2
      },
      2.0,
      Rate)).toBeFalsy()
    expect(
      validator({
        operator: 'less_than',
        value: 2
      },
      2.1,
      Rate)).toBeFalsy()
  })
  test('less_than_equal', () => {
    expect(
      validator({
        operator: 'less_than_equal',
        value: 2
      },
      2.0,
      Rate)).toBeTruthy()
    expect(
      validator({
        operator: 'less_than_equal',
        value: 2
      },
      1.9,
      Rate)).toBeTruthy()
  })
  test('between', () => {
    expect(
      validator({
        operator: 'between',
        value: [1, 2]
      },
      1,
      Rate)).toBeTruthy()
    expect(
      validator({
        operator: 'between',
        value: [1, 2]
      },
      2.0,
      Rate)).toBeTruthy()
    expect(
      validator({
        operator: 'between',
        value: [1, 2]
      },
      null,
      Rate)).toBeFalsy()
    expect(
      validator({
        operator: 'between',
        value: [1, 2]
      },
      '',
      Rate)).toBeFalsy()
    expect(
      validator({
        operator: 'between',
        value: [1, 2]
      },
      undefined,
      Rate)).toBeFalsy()
  })
})

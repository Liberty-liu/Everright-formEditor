import { describe, assert, expect, test } from 'vitest'
import { validator } from '@ER/hooks/use-logic'
import { Number } from '@ER-test/data/fields.js'
describe('Number', () => {
  test('equal', () => {
    expect(
      validator({
        operator: 'equal',
        value: 123
      },
      123.00,
      Number)).toBeTruthy()
  })
  test('not_equal', () => {
    expect(
      validator({
        operator: 'not_equal',
        value: 123
      },
      123.00,
      Number)).toBeFalsy()
  })
  test('empty', () => {
    expect(
      validator({
        operator: 'empty'
      },
      '',
      Number)).toBeTruthy()
    expect(
      validator({
        operator: 'empty'
      },
      undefined,
      Number)).toBeTruthy()
    expect(
      validator({
        operator: 'empty'
      },
      null,
      Number)).toBeTruthy()
  })
  test('not_empty', () => {
    expect(
      validator({
        operator: 'not_empty'
      },
      '',
      Number)).toBeFalsy()
    expect(
      validator({
        operator: 'not_empty'
      },
      undefined,
      Number)).toBeFalsy()
    expect(
      validator({
        operator: 'not_empty'
      },
      null,
      Number)).toBeFalsy()
  })
  test('greater_than', () => {
    expect(
      validator({
        operator: 'greater_than',
        value: 2
      },
      null,
      Number)).toBeFalsy()
    expect(
      validator({
        operator: 'greater_than',
        value: 2
      },
      '',
      Number)).toBeFalsy()
    expect(
      validator({
        operator: 'greater_than',
        value: 2
      },
      undefined,
      Number)).toBeFalsy()
    expect(
      validator({
        operator: 'greater_than',
        value: 2
      },
      2.0,
      Number)).toBeFalsy()
    expect(
      validator({
        operator: 'greater_than',
        value: 2
      },
      2.1,
      Number)).toBeTruthy()
  })
  test('greater_than_equal', () => {
    expect(
      validator({
        operator: 'greater_than_equal',
        value: 2
      },
      2.1,
      Number)).toBeTruthy()
  })
  test('less_than', () => {
    expect(
      validator({
        operator: 'less_than',
        value: 2
      },
      null,
      Number)).toBeTruthy()
    expect(
      validator({
        operator: 'less_than',
        value: 2
      },
      '',
      Number)).toBeTruthy()
    expect(
      validator({
        operator: 'less_than',
        value: 2
      },
      undefined,
      Number)).toBeTruthy()
    expect(
      validator({
        operator: 'less_than',
        value: 2
      },
      2.0,
      Number)).toBeFalsy()
    expect(
      validator({
        operator: 'less_than',
        value: 2
      },
      2.1,
      Number)).toBeFalsy()
  })
  test('less_than_equal', () => {
    expect(
      validator({
        operator: 'less_than_equal',
        value: 2
      },
      2.0,
      Number)).toBeTruthy()
    expect(
      validator({
        operator: 'less_than_equal',
        value: 2
      },
      1.9,
      Number)).toBeTruthy()
  })
  test('between', () => {
    expect(
      validator({
        operator: 'between',
        value: [1, 2]
      },
      1,
      Number)).toBeTruthy()
    expect(
      validator({
        operator: 'between',
        value: [1, 2]
      },
      2.0,
      Number)).toBeTruthy()
    expect(
      validator({
        operator: 'between',
        value: [1, 2]
      },
      null,
      Number)).toBeFalsy()
    expect(
      validator({
        operator: 'between',
        value: [1, 2]
      },
      '',
      Number)).toBeFalsy()
    expect(
      validator({
        operator: 'between',
        value: [1, 2]
      },
      undefined,
      Number)).toBeFalsy()
  })
})

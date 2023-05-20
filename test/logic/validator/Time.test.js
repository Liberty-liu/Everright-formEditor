import { describe, assert, expect, test } from 'vitest'
import { validator } from '@ER/hooks/use-logic'
import { Time } from '@ER-test/data/fields.js'
describe('Time', () => {
  test('equal', () => {
    expect(
      validator({
        operator: 'equal',
        value: '16:12:46'
      },
      '16:12:46',
      Time)).toBeTruthy()
  })
  test('not_equal', () => {
    expect(
      validator({
        operator: 'not_equal',
        value: '16:12:46'
      },
      '16:12:46',
      Time)).toBeFalsy()
  })
  test('empty', () => {
    expect(
      validator({
        operator: 'empty'
      },
      '',
      Time)).toBeTruthy()
    expect(
      validator({
        operator: 'empty'
      },
      undefined,
      Time)).toBeTruthy()
    expect(
      validator({
        operator: 'empty'
      },
      null,
      Time)).toBeTruthy()
  })
  test('not_empty', () => {
    expect(
      validator({
        operator: 'not_empty'
      },
      '',
      Time)).toBeFalsy()
    expect(
      validator({
        operator: 'not_empty'
      },
      undefined,
      Time)).toBeFalsy()
    expect(
      validator({
        operator: 'not_empty'
      },
      null,
      Time)).toBeFalsy()
  })
  test('greater_than', () => {
    expect(
      validator({
        operator: 'greater_than',
        value: '16:12:47'
      },
      '16:12:48',
      Time)).toBeTruthy()
    expect(
      validator({
        operator: 'greater_than',
        value: '16:12:47'
      },
      '16:12:46',
      Time)).toBeFalsy()
    expect(
      validator({
        operator: 'greater_than',
        value: '16:12:47'
      },
      '',
      Time)).toBeFalsy()
    expect(
      validator({
        operator: 'greater_than',
        value: '16:12:47'
      },
      null,
      Time)).toBeFalsy()
    expect(
      validator({
        operator: 'greater_than',
        value: '16:12:47'
      },
      undefined,
      Time)).toBeFalsy()
  })
  test('greater_than_equal', () => {
    expect(
      validator({
        operator: 'greater_than_equal',
        value: '16:12:48'
      },
      '16:12:48',
      Time)).toBeTruthy()
    expect(
      validator({
        operator: 'greater_than_equal',
        value: '16:12:48'
      },
      '',
      Time)).toBeFalsy()
    expect(
      validator({
        operator: 'greater_than_equal',
        value: '16:12:48'
      },
      undefined,
      Time)).toBeFalsy()
    expect(
      validator({
        operator: 'greater_than_equal',
        value: '16:12:48'
      },
      null,
      Time)).toBeFalsy()
  })
  test('less_than', () => {
    expect(
      validator({
        operator: 'less_than',
        value: '16:12:48'
      },
      '16:12:47',
      Time)).toBeTruthy()
    expect(
      validator({
        operator: 'less_than',
        value: '16:12:48'
      },
      '16:12:48',
      Time)).toBeFalsy()
    expect(
      validator({
        operator: 'less_than',
        value: '16:12:48'
      },
      null,
      Time)).toBeFalsy()
    expect(
      validator({
        operator: 'less_than',
        value: '16:12:48'
      },
      '',
      Time)).toBeFalsy()
    expect(
      validator({
        operator: 'less_than',
        value: '16:12:48'
      },
      undefined,
      Time)).toBeFalsy()
  })
  test('less_than_equal', () => {
    expect(
      validator({
        operator: 'less_than_equal',
        value: '16:12:48'
      },
      '16:12:48',
      Time)).toBeTruthy()
    expect(
      validator({
        operator: 'less_than_equal',
        value: '16:12:48'
      },
      '16:12:47',
      Time)).toBeTruthy()
    expect(
      validator({
        operator: 'less_than_equal',
        value: '16:12:48'
      },
      '',
      Time)).toBeFalsy()
    expect(
      validator({
        operator: 'less_than_equal',
        value: '16:12:48'
      },
      null,
      Time)).toBeFalsy()
    expect(
      validator({
        operator: 'less_than_equal',
        value: '16:12:48'
      },
      undefined,
      Time)).toBeFalsy()
  })
  test('between', () => {
    expect(
      validator({
        operator: 'between',
        value: [
          '16:12:48',
          '16:12:49'
        ]
      },
      '16:12:48',
      Time)).toBeTruthy()
    expect(
      validator({
        operator: 'between',
        value: [
          '16:12:48',
          '16:12:49'
        ]
      },
      '16:12:49',
      Time)).toBeTruthy()
    expect(
      validator({
        operator: 'between',
        value: [
          '16:12:48',
          '16:12:49'
        ]
      },
      '16:12:50',
      Time)).toBeFalsy()
    expect(
      validator({
        operator: 'between',
        value: [
          '16:12:48',
          '16:12:49'
        ]
      },
      '',
      Time)).toBeFalsy()
    expect(
      validator({
        operator: 'between',
        value: [
          '16:12:48',
          '16:12:49'
        ]
      },
      null,
      Time)).toBeFalsy()
    expect(
      validator({
        operator: 'between',
        value: [
          '16:12:48',
          '16:12:49'
        ]
      },
      '',
      Time)).toBeFalsy()
    expect(
      validator({
        operator: 'between',
        value: [
          '16:12:48',
          '16:12:49'
        ]
      },
      undefined,
      Time)).toBeFalsy()
  })
})

import { describe, assert, expect, test } from 'vitest'
import { validator } from '@ER/hooks/use-logic'
const field = { type: 'slider', label: 'Slider', icon: 'slider', key: 'slider_DnNgjeX1vs6MTUd8IuMqO', id: 'DnNgjeX1vs6MTUd8IuMqO', options: { min: 0, max: 100, step: 1, defaultValue: 0, placeholder: '', labelWidth: 100, isShowLabel: true, required: false, disabled: false }, style: { width: { pc: '100%', mobile: '100%' } } }
describe('Slider', () => {
  test('equal', () => {
    expect(
      validator({
        operator: 'equal',
        value: 4
      },
      4,
      field)).toBeTruthy()
  })
  test('not_equal', () => {
    expect(
      validator({
        operator: 'not_equal',
        value: 4
      },
      4,
      field)).toBeFalsy()
  })
  test('greater_than', () => {
    expect(
      validator({
        operator: 'greater_than',
        value: 2
      },
      null,
      field)).toBeFalsy()
    expect(
      validator({
        operator: 'greater_than',
        value: 2
      },
      '',
      field)).toBeFalsy()
    expect(
      validator({
        operator: 'greater_than',
        value: 2
      },
      undefined,
      field)).toBeFalsy()
    expect(
      validator({
        operator: 'greater_than',
        value: 2
      },
      2.0,
      field)).toBeFalsy()
    expect(
      validator({
        operator: 'greater_than',
        value: 2
      },
      2.1,
      field)).toBeTruthy()
  })
  test('greater_than_equal', () => {
    expect(
      validator({
        operator: 'greater_than_equal',
        value: 2
      },
      2.1,
      field)).toBeTruthy()
  })
  test('less_than', () => {
    expect(
      validator({
        operator: 'less_than',
        value: 2
      },
      null,
      field)).toBeTruthy()
    expect(
      validator({
        operator: 'less_than',
        value: 2
      },
      '',
      field)).toBeTruthy()
    expect(
      validator({
        operator: 'less_than',
        value: 2
      },
      undefined,
      field)).toBeTruthy()
    expect(
      validator({
        operator: 'less_than',
        value: 2
      },
      2.0,
      field)).toBeFalsy()
    expect(
      validator({
        operator: 'less_than',
        value: 2
      },
      2.1,
      field)).toBeFalsy()
  })
  test('less_than_equal', () => {
    expect(
      validator({
        operator: 'less_than_equal',
        value: 2
      },
      2.0,
      field)).toBeTruthy()
    expect(
      validator({
        operator: 'less_than_equal',
        value: 2
      },
      1.9,
      field)).toBeTruthy()
  })
  test('between', () => {
    expect(
      validator({
        operator: 'between',
        value: [1, 2]
      },
      1,
      field)).toBeTruthy()
    expect(
      validator({
        operator: 'between',
        value: [1, 2]
      },
      2.0,
      field)).toBeTruthy()
    expect(
      validator({
        operator: 'between',
        value: [1, 2]
      },
      null,
      field)).toBeFalsy()
    expect(
      validator({
        operator: 'between',
        value: [1, 2]
      },
      '',
      field)).toBeFalsy()
    expect(
      validator({
        operator: 'between',
        value: [1, 2]
      },
      undefined,
      field)).toBeFalsy()
  })
})

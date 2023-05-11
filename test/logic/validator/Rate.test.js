import { describe, assert, expect, test } from 'vitest'
import { validator } from '@ER/hooks/use-logic'
describe('validator', () => {
  test('Rate', () => {
    const field = { type: 'rate', label: 'Rate', icon: 'rating', key: 'rate_h3rw6be0P5V5ciSTbD6Yx', id: 'h3rw6be0P5V5ciSTbD6Yx', options: { max: 5, allowHalf: true, defaultValue: 0, labelWidth: 100, isShowLabel: true, disabled: false }, style: { width: { pc: '100%', mobile: '100%' } } }
    expect(
      validator({
        operator: 'equal',
        value: 3.5
      },
      3.5,
      field)).toBeTruthy()
    field.options.allowHalf = false
    expect(
      validator({
        operator: 'equal',
        value: 3
      },
      3,
      field)).toBeTruthy()
    field.options.allowHalf = true
    expect(
      validator({
        operator: 'not_equal',
        value: 3.5
      },
      3.5,
      field)).toBeFalsy()
    field.options.allowHalf = false
    expect(
      validator({
        operator: 'not_equal',
        value: 3
      },
      3,
      field)).toBeFalsy()
    expect(
      validator({
        operator: 'empty'
      },
      '',
      field)).toBeTruthy()
    expect(
      validator({
        operator: 'empty'
      },
      undefined,
      field)).toBeTruthy()
    expect(
      validator({
        operator: 'empty'
      },
      null,
      field)).toBeTruthy()
    expect(
      validator({
        operator: 'empty'
      },
      0,
      field)).toBeTruthy()
    expect(
      validator({
        operator: 'not_empty'
      },
      '',
      field)).toBeFalsy()
    expect(
      validator({
        operator: 'not_empty'
      },
      undefined,
      field)).toBeFalsy()
    expect(
      validator({
        operator: 'not_empty'
      },
      null,
      field)).toBeFalsy()
    expect(
      validator({
        operator: 'not_empty'
      },
      0,
      field)).toBeFalsy()
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
    expect(
      validator({
        operator: 'greater_than_equal',
        value: 2
      },
      2.1,
      field)).toBeTruthy()
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

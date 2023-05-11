import { describe, assert, expect, test } from 'vitest'
import { validator } from '@ER/hooks/use-logic'
const field = { type: 'input', label: 'Input', icon: 'input', key: 'input_D7ijHbzIJUJ8THOhHqGXK', id: 'D7ijHbzIJUJ8THOhHqGXK', options: { clearable: true, isShowWordLimit: false, renderType: 1, disabled: false, showPassword: false, defaultValue: '', placeholder: 'Please enter', labelWidth: 100, isShowLabel: true, required: false, min: null, max: null }, style: { width: { pc: '100%', mobile: '100%' } } }
describe('Input', () => {
  test('equal', () => {
    expect(
      validator({
        operator: 'equal',
        value: '123'
      },
      '123',
      field)).toBeTruthy()
  })
  test('not_equal', () => {
    expect(
      validator({
        operator: 'not_equal',
        value: '123'
      },
      '123',
      field)).toBeFalsy()
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
      field)).toBeTruthy()
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
      field)).toBeFalsy()
  })
  test('empty', () => {
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
  })
  test('not_empty', () => {
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
  })
})

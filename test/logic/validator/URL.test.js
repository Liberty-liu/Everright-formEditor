import { describe, assert, expect, test } from 'vitest'
import { validator } from '@ER/hooks/use-logic'
describe('validator', () => {
  test('URL', () => {
    const field = { type: 'input', label: 'URL', icon: 'url', key: 'input_8Des6TBcAhe5zmEl7x83q', id: '8Des6TBcAhe5zmEl7x83q', options: { clearable: true, renderType: 5, disabled: false, showPassword: false, defaultValue: '', placeholder: 'Please enter', labelWidth: 100, isShowLabel: true, required: false }, style: { width: { pc: '100%', mobile: '100%' } } }
    expect(
      validator({
        operator: 'equal',
        value: 'https://everright.site/'
      },
      'https://everright.site/',
      field)).toBeTruthy()
    expect(
      validator({
        operator: 'not_equal',
        value: 'https://everright.site/'
      },
      'https://everright.site/',
      field)).toBeFalsy()
    expect(
      validator({
        operator: 'contains',
        value: [
          'https://everright.site/'
        ]
      },
      'https://everright.site/',
      field)).toBeTruthy()
    expect(
      validator({
        operator: 'not_contain',
        value: [
          'https://everright.site/'
        ]
      },
      'https://everright.site/',
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

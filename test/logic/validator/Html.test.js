import { describe, assert, expect, test } from 'vitest'
import { validator } from '@ER/hooks/use-logic'
describe('validator', () => {
  test('Html', () => {
    const field = { type: 'html', label: 'Html', icon: 'html', key: 'html_cBsbj6NW7wNicW2umHzsE', id: 'cBsbj6NW7wNicW2umHzsE', options: { defaultValue: '<p>123</p>', placeholder: 'Please enter', action: 'http://localhost:8001/Everright-api/lowCode/uploads', size: 1, labelWidth: 100, isShowLabel: true, required: false, disabled: false }, style: { width: { pc: '100%', mobile: '100%' } } }
    expect(
      validator({
        operator: 'equal',
        value: '<p>123</p>'
      },
      '<p>123</p>',
      field)).toBeTruthy()
    expect(
      validator({
        operator: 'not_equal',
        value: '<p>123</p>'
      },
      '<p>123</p>',
      field)).toBeFalsy()
    expect(
      validator({
        operator: 'contains',
        value: [
          '<p>123</p>'
        ]
      },
      '<p>123</p>',
      field)).toBeTruthy()
    expect(
      validator({
        operator: 'not_contain',
        value: [
          '<p>123</p>'
        ]
      },
      '<p>123</p>',
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

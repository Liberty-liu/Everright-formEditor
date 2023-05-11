import { describe, assert, expect, test } from 'vitest'
import { validator } from '@ER/hooks/use-logic'
describe('validator', () => {
  test('Switch', () => {
    const field = { type: 'switch', label: 'Switch', icon: 'switch', key: 'switch_XpvOZGZjVMTVdHWZiuehy', id: 'XpvOZGZjVMTVdHWZiuehy', options: { defaultValue: true, labelWidth: 100, isShowLabel: true, disabled: false }, style: { width: { pc: '100%', mobile: '100%' } } }
    expect(
      validator({
        operator: 'equal',
        value: 1
      },
      true,
      field)).toBeTruthy()
    expect(
      validator({
        operator: 'equal',
        value: 0
      },
      false,
      field)).toBeTruthy()
    expect(
      validator({
        operator: 'not_equal',
        value: 1
      },
      true,
      field)).toBeFalsy()
    expect(
      validator({
        operator: 'not_equal',
        value: 0
      },
      false,
      field)).toBeFalsy()
  })
})

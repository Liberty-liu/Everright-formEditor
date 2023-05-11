import { describe, assert, expect, test } from 'vitest'
import { validator } from '@ER/hooks/use-logic'
const field = { type: 'switch', label: 'Switch', icon: 'switch', key: 'switch_XpvOZGZjVMTVdHWZiuehy', id: 'XpvOZGZjVMTVdHWZiuehy', options: { defaultValue: true, labelWidth: 100, isShowLabel: true, disabled: false }, style: { width: { pc: '100%', mobile: '100%' } } }
describe('Switch', () => {
  test('equal', () => {
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
  })
  test('not_equal', () => {
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

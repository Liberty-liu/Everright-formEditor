import { describe, assert, expect, test } from 'vitest'
import { validator } from '@ER/hooks/use-logic'
describe('validator', () => {
  test('Signature', () => {
    const field = { type: 'signature', label: 'Signature', icon: 'signature', key: 'signature_TBB-T_V2Gkt-BwinGdG4f', id: 'TBB-T_V2Gkt-BwinGdG4f', options: { required: false, isShowLabel: true, labelWidth: 100, defaultValue: '', penColor: 'rgb(0, 0, 0)', action: 'http://localhost:8001/Everright-api/lowCode/uploads', disabled: false }, style: { width: { pc: '100%', mobile: '100%' } } }
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

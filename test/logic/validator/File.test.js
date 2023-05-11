import { describe, assert, expect, test } from 'vitest'
import { validator } from '@ER/hooks/use-logic'
describe('validator', () => {
  test('File', () => {
    const field = { type: 'uploadfile', label: 'File', icon: 'upload', key: 'uploadfile_FSDpM3CGDUP7-GioNkFLn', id: 'FSDpM3CGDUP7-GioNkFLn', options: { isShowLabel: true, labelWidth: 100, defaultValue: [], multiple: false, action: 'http://localhost:8001/Everright-api/lowCode/uploads', limit: 1, size: 1, accept: '.png,.jpg,.gif', disabled: false, required: false }, style: { width: { pc: '100%', mobile: '100%' } } }
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
      [],
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
      [],
      field)).toBeFalsy()
  })
})

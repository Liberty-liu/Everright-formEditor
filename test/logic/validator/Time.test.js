import { describe, assert, expect, test } from 'vitest'
import { validator } from '@ER/hooks/use-logic'
describe('validator', () => {
  test('Time', () => {
    const field = { type: 'time', label: 'Time', icon: 'time', key: 'time_JfeEFqHMQbVI424FbFEHw', id: 'JfeEFqHMQbVI424FbFEHw', options: { clearable: true, format: 'HH时mm分ss秒', valueFormat: 'HH:mm:ss', defaultValue: null, placeholder: 'Please select', labelWidth: 100, isShowLabel: true, required: false, disabled: false }, style: { width: { pc: '100%', mobile: '100%' } } }
    expect(
      validator({
        operator: 'equal',
        value: '16:12:46'
      },
      '16:12:46',
      field)).toBeTruthy()
    expect(
      validator({
        operator: 'not_equal',
        value: '16:12:46'
      },
      '16:12:46',
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
    expect(
      validator({
        operator: 'greater_than',
        value: '16:12:47'
      },
      '16:12:48',
      field)).toBeTruthy()
    expect(
      validator({
        operator: 'greater_than',
        value: '16:12:47'
      },
      '16:12:46',
      field)).toBeFalsy()
    expect(
      validator({
        operator: 'greater_than',
        value: '16:12:47'
      },
      '',
      field)).toBeFalsy()
    expect(
      validator({
        operator: 'greater_than',
        value: '16:12:47'
      },
      null,
      field)).toBeFalsy()
    expect(
      validator({
        operator: 'greater_than',
        value: '16:12:47'
      },
      undefined,
      field)).toBeFalsy()
    expect(
      validator({
        operator: 'greater_than_equal',
        value: '16:12:48'
      },
      '16:12:48',
      field)).toBeTruthy()
    expect(
      validator({
        operator: 'greater_than_equal',
        value: '16:12:48'
      },
      '',
      field)).toBeFalsy()
    expect(
      validator({
        operator: 'greater_than_equal',
        value: '16:12:48'
      },
      undefined,
      field)).toBeFalsy()
    expect(
      validator({
        operator: 'greater_than_equal',
        value: '16:12:48'
      },
      null,
      field)).toBeFalsy()
    expect(
      validator({
        operator: 'less_than',
        value: '16:12:48'
      },
      '16:12:47',
      field)).toBeTruthy()
    expect(
      validator({
        operator: 'less_than',
        value: '16:12:48'
      },
      '16:12:48',
      field)).toBeFalsy()
    expect(
      validator({
        operator: 'less_than',
        value: '16:12:48'
      },
      null,
      field)).toBeFalsy()
    expect(
      validator({
        operator: 'less_than',
        value: '16:12:48'
      },
      '',
      field)).toBeFalsy()
    expect(
      validator({
        operator: 'less_than',
        value: '16:12:48'
      },
      undefined,
      field)).toBeFalsy()
    expect(
      validator({
        operator: 'less_than_equal',
        value: '16:12:48'
      },
      '16:12:48',
      field)).toBeTruthy()
    expect(
      validator({
        operator: 'less_than_equal',
        value: '16:12:48'
      },
      '16:12:47',
      field)).toBeTruthy()
    expect(
      validator({
        operator: 'less_than_equal',
        value: '16:12:48'
      },
      '',
      field)).toBeFalsy()
    expect(
      validator({
        operator: 'less_than_equal',
        value: '16:12:48'
      },
      null,
      field)).toBeFalsy()
    expect(
      validator({
        operator: 'less_than_equal',
        value: '16:12:48'
      },
      undefined,
      field)).toBeFalsy()
    expect(
      validator({
        operator: 'between',
        value: [
          '16:12:48',
          '16:12:49'
        ]
      },
      '16:12:48',
      field)).toBeTruthy()
    expect(
      validator({
        operator: 'between',
        value: [
          '16:12:48',
          '16:12:49'
        ]
      },
      '16:12:49',
      field)).toBeTruthy()
    expect(
      validator({
        operator: 'between',
        value: [
          '16:12:48',
          '16:12:49'
        ]
      },
      '16:12:50',
      field)).toBeFalsy()
    expect(
      validator({
        operator: 'between',
        value: [
          '16:12:48',
          '16:12:49'
        ]
      },
      '',
      field)).toBeFalsy()
    expect(
      validator({
        operator: 'between',
        value: [
          '16:12:48',
          '16:12:49'
        ]
      },
      null,
      field)).toBeFalsy()
    expect(
      validator({
        operator: 'between',
        value: [
          '16:12:48',
          '16:12:49'
        ]
      },
      '',
      field)).toBeFalsy()
    expect(
      validator({
        operator: 'between',
        value: [
          '16:12:48',
          '16:12:49'
        ]
      },
      undefined,
      field)).toBeFalsy()
  })
})

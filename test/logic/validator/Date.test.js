import { describe, assert, expect, test } from 'vitest'
import { validator } from '@ER/hooks/use-logic'
const field = { type: 'date', label: 'Date', icon: 'calendar', key: 'date_mczJoB7trWElolPW48BEm', id: 'mczJoB7trWElolPW48BEm', options: { isShowWordLimit: false, clearable: true, format: 'YYYY-MM-DD', defaultValue: null, startTime: null, endTime: null, placeholder: 'Please select', labelWidth: 100, isShowLabel: true, type: 'date', required: false, disabled: false }, style: { width: { pc: '100%', mobile: '100%' } } }
describe('Date', () => {
  test('equal: date/datetime', () => {
    expect(
      validator({
        operator: 'equal',
        value: {
          dateType: 'static',
          value: 1683648000
        }
      },
      1683648000,
      field)).toBeTruthy()
    expect(
      validator({
        operator: 'equal',
        value: {
          dateType: 'static',
          value: 1683648000
        }
      },
      '',
      field)).toBeFalsy()
    expect(
      validator({
        operator: 'equal',
        value: {
          dateType: 'static',
          value: 1683648000
        }
      },
      null,
      field)).toBeFalsy()
    expect(
      validator({
        operator: 'equal',
        value: {
          dateType: 'static',
          value: 1683648000
        }
      },
      undefined,
      field)).toBeFalsy()
    field.options.type = 'datetime'
    expect(
      validator({
        operator: 'equal',
        value: {
          dateType: 'static',
          value: 1683648000
        }
      },
      1683648000,
      field)).toBeTruthy()
  })
  test('not_equal: date/datetime', () => {
    expect(
      validator({
        operator: 'not_equal',
        value: {
          dateType: 'static',
          value: 1683648000
        }
      },
      1683648000,
      field)).toBeFalsy()
  })
  test('empty: date/datetime', () => {
    expect(
      validator({
        operator: 'empty',
        value: {
          dateType: 'static',
          value: 1683648000
        }
      },
      '',
      field)).toBeTruthy()
    expect(
      validator({
        operator: 'empty',
        value: {
          dateType: 'static',
          value: 1683648000
        }
      },
      undefined,
      field)).toBeTruthy()
    expect(
      validator({
        operator: 'empty',
        value: {
          dateType: 'static',
          value: 1683648000
        }
      },
      null,
      field)).toBeTruthy()
    expect(
      validator({
        operator: 'empty',
        value: {
          dateType: 'static',
          value: 1683648000
        }
      },
      [],
      field)).toBeTruthy()
  })
  test('greater_than: date/datetime', () => {
    expect(
      validator({
        operator: 'greater_than',
        value: {
          dateType: 'static',
          value: 1683648000
        }
      },
      1683734400,
      field)).toBeTruthy()
    expect(
      validator({
        operator: 'greater_than',
        value: {
          dateType: 'static',
          value: 1683648000
        }
      },
      '',
      field)).toBeFalsy()
    expect(
      validator({
        operator: 'greater_than',
        value: {
          dateType: 'static',
          value: 1683648000
        }
      },
      undefined,
      field)).toBeFalsy()
    expect(
      validator({
        operator: 'greater_than',
        value: {
          dateType: 'static',
          value: 1683648000
        }
      },
      null,
      field)).toBeFalsy()
  })
  test('greater_than_equal: date/datetime', () => {
    expect(
      validator({
        operator: 'greater_than_equal',
        value: {
          dateType: 'static',
          value: 1683648000
        }
      },
      1683648000,
      field)).toBeTruthy()
  })
  test('less_than: date/datetime', () => {
    expect(
      validator({
        operator: 'less_than',
        value: {
          dateType: 'static',
          value: 1683734400
        }
      },
      1683648000,
      field)).toBeTruthy()
  })
  test('less_than_equal: date/datetime', () => {
    expect(
      validator({
        operator: 'less_than_equal',
        value: {
          dateType: 'static',
          value: 1683734400
        }
      },
      1683734400,
      field)).toBeTruthy()
  })
  test('between: date/datetime', () => {
    expect(
      validator({
        operator: 'between',
        value: {
          dateType: 'static',
          value: [
            1683561600,
            1683734400
          ]
        }
      },
      1683561600,
      field)).toBeTruthy()
    expect(
      validator({
        operator: 'between',
        value: {
          dateType: 'static',
          value: [
            1683561600,
            1683734400
          ]
        }
      },
      1683648000,
      field)).toBeTruthy()
    expect(
      validator({
        operator: 'between',
        value: {
          dateType: 'static',
          value: [
            1683561600,
            1683734400
          ]
        }
      },
      1683734400,
      field)).toBeTruthy()
    expect(
      validator({
        operator: 'between',
        value: {
          dateType: 'static',
          value: [
            1683561600,
            1683734400
          ]
        }
      },
      '',
      field)).toBeFalsy()
  })
  test('equal: dates', () => {
    field.options.type = 'dates'
    expect(
      validator({
        operator: 'equal',
        value: {
          dateType: 'static',
          value: [
            1683561600,
            1683734400
          ]
        }
      },
      [
        1683561600,
        1683734400
      ],
      field)).toBeTruthy()
    expect(
      validator({
        operator: 'equal',
        value: {
          dateType: 'static',
          value: [
            1683561600,
            1683734400
          ]
        }
      },
      [],
      field)).toBeFalsy()
  })
  test('not_equal: dates', () => {
    field.options.type = 'dates'
    expect(
      validator({
        operator: 'not_equal',
        value: {
          dateType: 'static',
          value: [
            1683561600,
            1683734400
          ]
        }
      },
      [
        1683561600,
        1683734400
      ],
      field)).toBeFalsy()
  })
  test('contains: dates', () => {
    field.options.type = 'dates'
    expect(
      validator({
        operator: 'contains',
        value: {
          dateType: 'static',
          value: [
            1683561600,
            1683734400
          ]
        }
      },
      [
        1683561600
      ],
      field)).toBeTruthy()
  })
  test('not_contain: dates', () => {
    field.options.type = 'dates'
    expect(
      validator({
        operator: 'not_contain',
        value: {
          dateType: 'static',
          value: [
            1683561600,
            1683734400
          ]
        }
      },
      [
        1683561600,
        1683734400
      ],
      field)).toBeFalsy()
  })
  test('equal: daterange', () => {
    field.options.type = 'daterange'
    expect(
      validator({
        operator: 'equal',
        value: {
          dateType: 'static',
          value: [
            1683561600,
            1683734400
          ]
        }
      },
      [
        1683561600,
        1683734400
      ],
      field)).toBeTruthy()
    expect(
      validator({
        operator: 'equal',
        value: {
          dateType: 'static',
          value: [
            1683561600,
            1683734400
          ]
        }
      },
      [
        1683561600,
        1684339200
      ],
      field)).toBeFalsy()
  })
  test('not_equal: daterange', () => {
    field.options.type = 'daterange'
    expect(
      validator({
        operator: 'not_equal',
        value: {
          dateType: 'static',
          value: [
            1683561600,
            1683734400
          ]
        }
      },
      [
        1683561600,
        1684339200
      ],
      field)).toBeTruthy()
    expect(
      validator({
        operator: 'not_equal',
        value: {
          dateType: 'static',
          value: [
            1683561600,
            1683734400
          ]
        }
      },
      [
        1683561600,
        1683734400
      ],
      field)).toBeFalsy()
  })
})

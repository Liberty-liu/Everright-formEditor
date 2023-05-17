import { describe, assert, expect, test } from 'vitest'
import { validator } from '@ER/hooks/use-logic'
import { Date } from '@ER-test/data/fields.js'
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
      Date)).toBeTruthy()
    expect(
      validator({
        operator: 'equal',
        value: {
          dateType: 'static',
          value: 1683648000
        }
      },
      '',
      Date)).toBeFalsy()
    expect(
      validator({
        operator: 'equal',
        value: {
          dateType: 'static',
          value: 1683648000
        }
      },
      null,
      Date)).toBeFalsy()
    expect(
      validator({
        operator: 'equal',
        value: {
          dateType: 'static',
          value: 1683648000
        }
      },
      undefined,
      Date)).toBeFalsy()
    Date.options.type = 'datetime'
    expect(
      validator({
        operator: 'equal',
        value: {
          dateType: 'static',
          value: 1683648000
        }
      },
      1683648000,
      Date)).toBeTruthy()
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
      Date)).toBeFalsy()
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
      Date)).toBeTruthy()
    expect(
      validator({
        operator: 'empty',
        value: {
          dateType: 'static',
          value: 1683648000
        }
      },
      undefined,
      Date)).toBeTruthy()
    expect(
      validator({
        operator: 'empty',
        value: {
          dateType: 'static',
          value: 1683648000
        }
      },
      null,
      Date)).toBeTruthy()
    expect(
      validator({
        operator: 'empty',
        value: {
          dateType: 'static',
          value: 1683648000
        }
      },
      [],
      Date)).toBeTruthy()
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
      Date)).toBeTruthy()
    expect(
      validator({
        operator: 'greater_than',
        value: {
          dateType: 'static',
          value: 1683648000
        }
      },
      '',
      Date)).toBeFalsy()
    expect(
      validator({
        operator: 'greater_than',
        value: {
          dateType: 'static',
          value: 1683648000
        }
      },
      undefined,
      Date)).toBeFalsy()
    expect(
      validator({
        operator: 'greater_than',
        value: {
          dateType: 'static',
          value: 1683648000
        }
      },
      null,
      Date)).toBeFalsy()
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
      Date)).toBeTruthy()
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
      Date)).toBeTruthy()
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
      Date)).toBeTruthy()
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
      Date)).toBeTruthy()
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
      Date)).toBeTruthy()
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
      Date)).toBeTruthy()
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
      Date)).toBeFalsy()
  })
  test('equal: dates', () => {
    Date.options.type = 'dates'
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
      Date)).toBeTruthy()
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
      Date)).toBeFalsy()
  })
  test('not_equal: dates', () => {
    Date.options.type = 'dates'
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
      Date)).toBeFalsy()
  })
  test('contains: dates', () => {
    Date.options.type = 'dates'
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
      Date)).toBeTruthy()
  })
  test('not_contain: dates', () => {
    Date.options.type = 'dates'
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
      Date)).toBeFalsy()
  })
  test('equal: daterange', () => {
    Date.options.type = 'daterange'
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
      Date)).toBeTruthy()
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
      Date)).toBeFalsy()
  })
  test('not_equal: daterange', () => {
    Date.options.type = 'daterange'
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
      Date)).toBeTruthy()
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
      Date)).toBeFalsy()
  })
})

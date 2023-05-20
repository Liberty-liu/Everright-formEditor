import { describe, assert, expect, test } from 'vitest'
import { validator } from '@ER/hooks/use-logic'
import { Select } from '@ER-test/data/fields.js'
describe('Select', () => {
  test('equal: multiple false', () => {
    expect(
      validator({
        operator: 'equal',
        value: '0bZN9TQ0bePdjOewythuj'
      },
      '0bZN9TQ0bePdjOewythuj',
      Select)).toBeTruthy()
  })
  test('equal: multiple true', () => {
    expect(
      validator({
        operator: 'equal',
        value: '0bZN9TQ0bePdjOewythuj'
      },
      '0bZN9TQ0bePdjOewythuj',
      Select)).toBeTruthy()
  })
  test('equal: multiple true', () => {
    Select.options.multiple = true
    expect(
      validator({
        operator: 'equal',
        value: [
          '0bZN9TQ0bePdjOewythuj'
        ]
      },
      [
        '0bZN9TQ0bePdjOewythuj'
      ],
      Select)).toBeTruthy()
    expect(
      validator({
        operator: 'equal',
        value: [
          '0bZN9TQ0bePdjOewythuj'
        ]
      },
      [
        '0bZN9TQ0bePdjOewythuj',
        'OzUgt2_0be-2f97bPu0yJ'
      ],
      Select)).toBeFalsy()
  })
  test('not_equal: multiple false', () => {
    Select.options.multiple = false
    expect(
      validator({
        operator: 'not_equal',
        value: '0bZN9TQ0bePdjOewythuj'
      },
      '0bZN9TQ0bePdjOewythuj',
      Select)).toBeFalsy()
  })
  test('not_equal: multiple true', () => {
    Select.options.multiple = true
    expect(
      validator({
        operator: 'not_equal',
        value: [
          '0bZN9TQ0bePdjOewythuj'
        ]
      },
      [
        '0bZN9TQ0bePdjOewythuj'
      ],
      Select)).toBeFalsy()
    expect(
      validator({
        operator: 'not_equal',
        value: [
          '0bZN9TQ0bePdjOewythuj'
        ]
      },
      [
        '0bZN9TQ0bePdjOewythuj',
        'OzUgt2_0be-2f97bPu0yJ'
      ],
      Select)).toBeTruthy()
  })
  test('contains: multiple false', () => {
    Select.options.multiple = false
    expect(
      validator({
        operator: 'contains',
        value: [
          '0bZN9TQ0bePdjOewythuj'
        ]
      },
      '0bZN9TQ0bePdjOewythuj',
      Select)).toBeTruthy()
  })
  test('contains: multiple true', () => {
    Select.options.multiple = true
    expect(
      validator({
        operator: 'contains',
        value: [
          '0bZN9TQ0bePdjOewythuj'
        ]
      },
      [
        '0bZN9TQ0bePdjOewythuj'
      ],
      Select)).toBeTruthy()
  })
  test('not_contain: multiple false', () => {
    Select.options.multiple = false
    expect(
      validator({
        operator: 'not_contain',
        value: [
          '0bZN9TQ0bePdjOewythuj'
        ]
      },
      '0bZN9TQ0bePdjOewythuj',
      Select)).toBeFalsy()
  })
  test('not_contain: multiple true', () => {
    Select.options.multiple = true
    expect(
      validator({
        operator: 'not_contain',
        value: [
          '0bZN9TQ0bePdjOewythuj'
        ]
      },
      [
        '0bZN9TQ0bePdjOewythuj'
      ],
      Select)).toBeFalsy()
  })
  test('empty', () => {
    expect(
      validator({
        operator: 'empty'
      },
      '',
      Select)).toBeTruthy()
    expect(
      validator({
        operator: 'empty'
      },
      undefined,
      Select)).toBeTruthy()
    expect(
      validator({
        operator: 'empty'
      },
      null,
      Select)).toBeTruthy()
    expect(
      validator({
        operator: 'empty'
      },
      [],
      Select)).toBeTruthy()
  })
  test('not_empty', () => {
    expect(
      validator({
        operator: 'not_empty'
      },
      '',
      Select)).toBeFalsy()
    expect(
      validator({
        operator: 'not_empty'
      },
      undefined,
      Select)).toBeFalsy()
    expect(
      validator({
        operator: 'not_empty'
      },
      null,
      Select)).toBeFalsy()
    expect(
      validator({
        operator: 'not_empty'
      },
      [],
      Select)).toBeFalsy()
  })
})

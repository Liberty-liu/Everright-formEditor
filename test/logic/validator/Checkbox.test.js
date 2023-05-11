import { describe, assert, expect, test } from 'vitest'
import { validator } from '@ER/hooks/use-logic'
const field = { type: 'checkbox', label: 'Checkbox', icon: 'checkbox', key: 'checkbox_qE0oMb42msqQ1M4N35F6P', id: 'qE0oMb42msqQ1M4N35F6P', options: { dataKey: 'qE0oMb42msqQ1M4N35F6P', displayStyle: 'block', defaultValue: [], labelWidth: 100, isShowLabel: true, required: false, disabled: false }, style: { width: { pc: '100%', mobile: '100%' } } }
describe('Checkbox', () => {
  test('equal', () => {
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
      field)).toBeTruthy()
    expect(
      validator({
        operator: 'equal',
        value: [
          '0bZN9TQ0bePdjOewythuj',
          'OzUgt2_0be-2f97bPu0yJ'
        ]
      },
      [
        '0bZN9TQ0bePdjOewythuj'
      ],
      field)).toBeFalsy()
  })
  test('not_equal', () => {
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
      field)).toBeFalsy()
    expect(
      validator({
        operator: 'not_equal',
        value: [
          '0bZN9TQ0bePdjOewythuj',
          'OzUgt2_0be-2f97bPu0yJ'
        ]
      },
      [
        '0bZN9TQ0bePdjOewythuj'
      ],
      field)).toBeTruthy()
  })
  test('contains', () => {
    expect(
      validator({
        operator: 'contains',
        value: [
          '0bZN9TQ0bePdjOewythuj',
          'OzUgt2_0be-2f97bPu0yJ'
        ]
      },
      [
        '0bZN9TQ0bePdjOewythuj'
      ],
      field)).toBeTruthy()
    expect(
      validator({
        operator: 'contains',
        value: [
          '0bZN9TQ0bePdjOewythuj',
          'OzUgt2_0be-2f97bPu0yJ'
        ]
      },
      [
        '0bZN9TQ0bePdjOewythuj1'
      ],
      field)).toBeFalsy()
  })
  test('not_contain', () => {
    expect(
      validator({
        operator: 'not_contain',
        value: [
          '0bZN9TQ0bePdjOewythuj',
          'OzUgt2_0be-2f97bPu0yJ'
        ]
      },
      [
        '0bZN9TQ0bePdjOewythuj'
      ],
      field)).toBeFalsy()
    expect(
      validator({
        operator: 'not_contain',
        value: [
          '0bZN9TQ0bePdjOewythuj',
          'OzUgt2_0be-2f97bPu0yJ'
        ]
      },
      [
        '0bZN9TQ0bePdjOewythuj1'
      ],
      field)).toBeTruthy()
  })
  test('empty', () => {
    expect(
      validator({
        operator: 'empty'
      },
      [],
      field)).toBeTruthy()
  })
  test('not_empty', () => {
    expect(
      validator({
        operator: 'not_empty'
      },
      [],
      field)).toBeFalsy()
  })
})

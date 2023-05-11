import { describe, assert, expect, test } from 'vitest'
import { validator } from '@ER/hooks/use-logic'
describe('validator', () => {
  test('Select', () => {
    const field = { type: 'select', label: 'Select', icon: 'dropdown0', key: 'select_lLyhZ6ThDBd2_O5JKOjzN', id: 'lLyhZ6ThDBd2_O5JKOjzN', options: { dataKey: 'lLyhZ6ThDBd2_O5JKOjzN', filterable: true, multiple: false, defaultValue: [], placeholder: 'Please select', labelWidth: 100, isShowLabel: true, disabled: false, clearable: true, required: false }, style: { width: { pc: '100%', mobile: '100%' } } }
    expect(
      validator({
        operator: 'equal',
        value: '0bZN9TQ0bePdjOewythuj'
      },
      '0bZN9TQ0bePdjOewythuj',
      field)).toBeTruthy()
    field.options.multiple = true
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
          '0bZN9TQ0bePdjOewythuj'
        ]
      },
      [
        '0bZN9TQ0bePdjOewythuj',
        'OzUgt2_0be-2f97bPu0yJ'
      ],
      field)).toBeFalsy()
    field.options.multiple = false
    expect(
      validator({
        operator: 'not_equal',
        value: '0bZN9TQ0bePdjOewythuj'
      },
      '0bZN9TQ0bePdjOewythuj',
      field)).toBeFalsy()
    field.options.multiple = true
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
          '0bZN9TQ0bePdjOewythuj'
        ]
      },
      [
        '0bZN9TQ0bePdjOewythuj',
        'OzUgt2_0be-2f97bPu0yJ'
      ],
      field)).toBeTruthy()
    field.options.multiple = false
    expect(
      validator({
        operator: 'contains',
        value: [
          '0bZN9TQ0bePdjOewythuj'
        ]
      },
      '0bZN9TQ0bePdjOewythuj',
      field)).toBeTruthy()
    field.options.multiple = true
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
      field)).toBeTruthy()
    field.options.multiple = false
    expect(
      validator({
        operator: 'not_contain',
        value: [
          '0bZN9TQ0bePdjOewythuj'
        ]
      },
      '0bZN9TQ0bePdjOewythuj',
      field)).toBeFalsy()
    field.options.multiple = true
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
      field)).toBeFalsy()
    field.options.multiple = false
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
    field.options.multiple = true
    expect(
      validator({
        operator: 'empty'
      },
      [],
      field)).toBeTruthy()
    field.options.multiple = false
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
    field.options.multiple = true
    expect(
      validator({
        operator: 'not_empty'
      },
      [],
      field)).toBeFalsy()
  })
})

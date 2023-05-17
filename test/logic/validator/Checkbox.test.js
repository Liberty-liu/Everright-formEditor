import { describe, assert, expect, test } from 'vitest'
import { validator } from '@ER/hooks/use-logic'
import { Checkbox } from '@ER-test/data/fields.js'
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
      Checkbox)).toBeTruthy()
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
      Checkbox)).toBeFalsy()
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
      Checkbox)).toBeFalsy()
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
      Checkbox)).toBeTruthy()
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
      Checkbox)).toBeTruthy()
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
      Checkbox)).toBeFalsy()
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
      Checkbox)).toBeFalsy()
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
      Checkbox)).toBeTruthy()
  })
  test('empty', () => {
    expect(
      validator({
        operator: 'empty'
      },
      [],
      Checkbox)).toBeTruthy()
  })
  test('not_empty', () => {
    expect(
      validator({
        operator: 'not_empty'
      },
      [],
      Checkbox)).toBeFalsy()
  })
})

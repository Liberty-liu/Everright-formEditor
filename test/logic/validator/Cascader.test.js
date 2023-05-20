import { describe, assert, expect, test } from 'vitest'
import { validator } from '@ER/hooks/use-logic'
import { Cascader } from '@ER-test/data/fields.js'
describe('Cascader', () => {
  test('equal', () => {
    expect(
      validator({
        operator: 'equal',
        value: [
          'MA47BXTJLl0Uf6dsw3hcI',
          '132RPqxAbuGTp-ZW-_Lav'
        ]
      },
      [
        'MA47BXTJLl0Uf6dsw3hcI',
        '132RPqxAbuGTp-ZW-_Lav'
      ],
      Cascader)).toBeTruthy()
    expect(
      validator({
        operator: 'equal',
        value: [
          'MA47BXTJLl0Uf6dsw3hcI',
          '132RPqxAbuGTp-ZW-_Lav'
        ]
      },
      [
        'MA47BXTJLl0Uf6dsw3hcI'
      ],
      Cascader)).toBeFalsy()
    Cascader.options.multiple = true
    expect(
      validator({
        operator: 'equal',
        value: [
          ['MA47BXTJLl0Uf6dsw3hcI', 'u-980ifeIW4HcE6JgUl5s'],
          ['MA47BXTJLl0Uf6dsw3hcI', '132RPqxAbuGTp-ZW-_Lav']
        ]
      },
      [
        ['MA47BXTJLl0Uf6dsw3hcI', 'u-980ifeIW4HcE6JgUl5s'],
        ['MA47BXTJLl0Uf6dsw3hcI', '132RPqxAbuGTp-ZW-_Lav']
      ],
      Cascader)).toBeTruthy()
    expect(
      validator({
        operator: 'equal',
        value: [
          ['MA47BXTJLl0Uf6dsw3hcI', 'u-980ifeIW4HcE6JgUl5s'],
          ['MA47BXTJLl0Uf6dsw3hcI', '132RPqxAbuGTp-ZW-_Lav']
        ]
      },
      [
        ['MA47BXTJLl0Uf6dsw3hcI', 'u-980ifeIW4HcE6JgUl5s']
      ],
      Cascader)).toBeFalsy()
  })
  test('not_equal', () => {
    Cascader.options.multiple = false
    expect(
      validator({
        operator: 'not_equal',
        value: [
          'MA47BXTJLl0Uf6dsw3hcI',
          '132RPqxAbuGTp-ZW-_Lav'
        ]
      },
      [
        'MA47BXTJLl0Uf6dsw3hcI',
        '132RPqxAbuGTp-ZW-_Lav'
      ],
      Cascader)).toBeFalsy()
    expect(
      validator({
        operator: 'not_equal',
        value: [
          'MA47BXTJLl0Uf6dsw3hcI',
          '132RPqxAbuGTp-ZW-_Lav'
        ]
      },
      [
        'MA47BXTJLl0Uf6dsw3hcI'
      ],
      Cascader)).toBeTruthy()
    Cascader.options.multiple = true
    expect(
      validator({
        operator: 'not_equal',
        value: [
          ['MA47BXTJLl0Uf6dsw3hcI', 'u-980ifeIW4HcE6JgUl5s'],
          ['MA47BXTJLl0Uf6dsw3hcI', '132RPqxAbuGTp-ZW-_Lav']
        ]
      },
      [
        ['MA47BXTJLl0Uf6dsw3hcI', 'u-980ifeIW4HcE6JgUl5s'],
        ['MA47BXTJLl0Uf6dsw3hcI', '132RPqxAbuGTp-ZW-_Lav']
      ],
      Cascader)).toBeFalsy()
    expect(
      validator({
        operator: 'not_equal',
        value: [
          ['MA47BXTJLl0Uf6dsw3hcI', 'u-980ifeIW4HcE6JgUl5s'],
          ['MA47BXTJLl0Uf6dsw3hcI', '132RPqxAbuGTp-ZW-_Lav']
        ]
      },
      [
        ['MA47BXTJLl0Uf6dsw3hcI', 'u-980ifeIW4HcE6JgUl5s']
      ],
      Cascader)).toBeTruthy()
  })
})

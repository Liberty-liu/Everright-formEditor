import { describe, assert, expect, test } from 'vitest'
import { validator } from '@ER/hooks/use-logic'
const field = { type: 'cascader', label: 'Cascader', icon: 'cascader', key: 'cascader_KFrOTULCQ0EAcMcIQTd_v', id: 'KFrOTULCQ0EAcMcIQTd_v', options: { filterable: true, multiple: false, checkStrictly: true, defaultValue: [], placeholder: 'Please select', labelWidth: 100, isShowLabel: true, required: false, disabled: false, clearable: true, dataKey: 'KFrOTULCQ0EAcMcIQTd_v' }, style: { width: { pc: '100%', mobile: '100%' } } }
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
      field)).toBeTruthy()
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
      field)).toBeFalsy()
    field.options.multiple = true
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
      field)).toBeTruthy()
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
      field)).toBeFalsy()
  })
  test('not_equal', () => {
    field.options.multiple = false
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
      field)).toBeFalsy()
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
      field)).toBeTruthy()
    field.options.multiple = true
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
      field)).toBeFalsy()
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
      field)).toBeTruthy()
  })
})

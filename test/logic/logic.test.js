import { describe, assert, expect, test } from 'vitest'
import { validator } from '@ER/hooks/use-logic'
describe('validator', () => {
  test('Email', () => {
    const filed = { type: 'input', label: 'Email', icon: 'email', key: 'input_dkY3cEvdfnJ-2Y6IP9pkf', id: 'dkY3cEvdfnJ-2Y6IP9pkf', options: { clearable: true, renderType: 2, disabled: false, showPassword: false, defaultValue: '', placeholder: 'Please enter', labelWidth: 100, isShowLabel: true, required: false }, style: { width: { pc: '100%', mobile: '100%' } } }
    expect(
      validator({
        operator: 'equal',
        value: '123'
      },
      '123',
      filed)).toBeTruthy()
    expect(
      validator({
        operator: 'not_equal',
        value: '123'
      },
      '123',
      filed)).toBeFalsy()
    expect(
      validator({
        operator: 'contains',
        value: [
          '123'
        ]
      },
      '123',
      filed)).toBeTruthy()
    expect(
      validator({
        operator: 'not_contain',
        value: [
          '123'
        ]
      },
      '123',
      filed)).toBeFalsy()
    expect(
      validator({
        operator: 'not_contain',
        value: [
          '123'
        ]
      },
      '456',
      filed)).toBeTruthy()
  })
  test('Cellphone', () => {
    const filed = { type: 'input', label: 'Cellphone', icon: 'cellphone', key: 'input_feokPGo0uqPDPGvcbbkrB', id: 'feokPGo0uqPDPGvcbbkrB', options: { clearable: true, renderType: 4, disabled: false, showPassword: false, defaultValue: '', placeholder: 'Please enter', labelWidth: 100, isShowLabel: true, required: false }, style: { width: { pc: '100%', mobile: '100%' } } }
    expect(
      validator({
        operator: 'equal',
        value: '123'
      },
      '123',
      filed)).toBeTruthy()
    expect(
      validator({
        operator: 'not_equal',
        value: '123'
      },
      '123',
      filed)).toBeFalsy()
    expect(
      validator({
        operator: 'contains',
        value: [
          '123'
        ]
      },
      '123',
      filed)).toBeTruthy()
    expect(
      validator({
        operator: 'not_contain',
        value: [
          '123'
        ]
      },
      '123',
      filed)).toBeFalsy()
  })
  test('URL', () => {
    const filed = { type: 'input', label: 'URL', icon: 'url', key: 'input_8Des6TBcAhe5zmEl7x83q', id: '8Des6TBcAhe5zmEl7x83q', options: { clearable: true, renderType: 5, disabled: false, showPassword: false, defaultValue: '', placeholder: 'Please enter', labelWidth: 100, isShowLabel: true, required: false }, style: { width: { pc: '100%', mobile: '100%' } } }
    expect(
      validator({
        operator: 'equal',
        value: 'https://everright.site/'
      },
      'https://everright.site/',
      filed)).toBeTruthy()
    expect(
      validator({
        operator: 'not_equal',
        value: 'https://everright.site/'
      },
      'https://everright.site/',
      filed)).toBeFalsy()
    expect(
      validator({
        operator: 'contains',
        value: [
          'https://everright.site/'
        ]
      },
      'https://everright.site/',
      filed)).toBeTruthy()
    expect(
      validator({
        operator: 'not_contain',
        value: [
          'https://everright.site/'
        ]
      },
      'https://everright.site/',
      filed)).toBeFalsy()
  })
  // test('Region', () => {
  //   const filed = { type: 'region', label: 'Region', icon: 'location', key: 'region_Yqz1snVkubaX2WG8xCEFs', id: 'Yqz1snVkubaX2WG8xCEFs', options: { placeholder: 'Please select', required: false, isShowLabel: true, labelWidth: 100, defaultValue: '', selectType: 3, filterable: true }, style: { width: { pc: '100%', mobile: '100%' } } }
  //   expect(
  //     validator({
  //       operator: 'equal',
  //       value: [
  //         '110000'
  //       ]
  //     },
  //     '110000',
  //     filed)).toBeTruthy()
  //   expect(
  //     validator({
  //       operator: 'not_equal',
  //       value: [
  //         '110000'
  //       ]
  //     },
  //     '110000',
  //     filed)).toBeTruthy()
  // })
  test('ID number', () => {
    const filed = { type: 'input', label: 'ID number', icon: 'ID', key: 'input_KElgoYLKSLp8rkKQA5CP-', id: 'KElgoYLKSLp8rkKQA5CP-', options: { clearable: true, renderType: 3, disabled: false, showPassword: false, defaultValue: '', placeholder: 'Please enter', labelWidth: 100, isShowLabel: true, required: false }, style: { width: { pc: '100%', mobile: '100%' } } }
    expect(
      validator({
        operator: 'equal',
        value: '123'
      },
      '123',
      filed)).toBeTruthy()
    expect(
      validator({
        operator: 'not_equal',
        value: '123'
      },
      '123',
      filed)).toBeFalsy()
    expect(
      validator({
        operator: 'contains',
        value: [
          '123'
        ]
      },
      '123',
      filed)).toBeTruthy()
    expect(
      validator({
        operator: 'not_contain',
        value: [
          '123'
        ]
      },
      '123',
      filed)).toBeFalsy()
  })
  test('Input', () => {
    const filed = { type: 'input', label: 'Input', icon: 'input', key: 'input_D7ijHbzIJUJ8THOhHqGXK', id: 'D7ijHbzIJUJ8THOhHqGXK', options: { clearable: true, isShowWordLimit: false, renderType: 1, disabled: false, showPassword: false, defaultValue: '', placeholder: 'Please enter', labelWidth: 100, isShowLabel: true, required: false, min: null, max: null }, style: { width: { pc: '100%', mobile: '100%' } } }
    expect(
      validator({
        operator: 'equal',
        value: '123'
      },
      '123',
      filed)).toBeTruthy()
    expect(
      validator({
        operator: 'not_equal',
        value: '123'
      },
      '123',
      filed)).toBeFalsy()
    expect(
      validator({
        operator: 'contains',
        value: [
          '123'
        ]
      },
      '123',
      filed)).toBeTruthy()
    expect(
      validator({
        operator: 'not_contain',
        value: [
          '123'
        ]
      },
      '123',
      filed)).toBeFalsy()
  })
  test('Textarea', () => {
    const filed = { type: 'textarea', label: 'Textarea', icon: 'textarea', key: 'textarea_ZPRzSVZkMHOMYgWZBmrvR', id: 'ZPRzSVZkMHOMYgWZBmrvR', options: { clearable: true, isShowWordLimit: false, rows: 6, defaultValue: '', placeholder: 'Please enter', disabled: false, labelWidth: 100, isShowLabel: true, required: false, min: null, max: null }, style: { width: { pc: '100%', mobile: '100%' } } }
    expect(
      validator({
        operator: 'equal',
        value: '123'
      },
      '123',
      filed)).toBeTruthy()
    expect(
      validator({
        operator: 'not_equal',
        value: '123'
      },
      '123',
      filed)).toBeFalsy()
    expect(
      validator({
        operator: 'contains',
        value: [
          '123'
        ]
      },
      '123',
      filed)).toBeTruthy()
    expect(
      validator({
        operator: 'not_contain',
        value: [
          '123'
        ]
      },
      '123',
      filed)).toBeFalsy()
  })
  test('Number', () => {
    const filed = { type: 'number', label: 'Number', icon: 'numbers', key: 'number_3bdLUMFSVB7_YujfBJhBB', id: '3bdLUMFSVB7_YujfBJhBB', options: { min: 0, max: null, step: 1, precision: 0, disabled: false, controls: true, controlsPosition: true, defaultValue: null, labelWidth: 100, isShowLabel: true, required: false, minlength: null, maxlength: null }, style: { width: { pc: '100%', mobile: '100%' } } }
    expect(
      validator({
        operator: 'equal',
        value: 123
      },
      123.00,
      filed)).toBeTruthy()
    expect(
      validator({
        operator: 'not_equal',
        value: 123
      },
      123.00,
      filed)).toBeFalsy()
  })
  test('Radio', () => {
    const filed = { type: 'radio', label: 'Radio', icon: 'radio', key: 'radio_FQWZ5Tf_KQryjLOj_-Oso', id: 'FQWZ5Tf_KQryjLOj_-Oso', options: { dataKey: 'FQWZ5Tf_KQryjLOj_-Oso', displayStyle: 'block', defaultValue: '', labelWidth: 100, isShowLabel: true, disabled: false, required: false }, style: { width: { pc: '100%', mobile: '100%' } } }
    expect(
      validator({
        operator: 'equal',
        value: 'CrvWR4TVdNRxvxty5iAT2'
      },
      'CrvWR4TVdNRxvxty5iAT2',
      filed)).toBeTruthy()
    expect(
      validator({
        operator: 'not_equal',
        value: 'CrvWR4TVdNRxvxty5iAT2'
      },
      'CrvWR4TVdNRxvxty5iAT2',
      filed)).toBeFalsy()
    expect(
      validator({
        operator: 'contains',
        value: ['CrvWR4TVdNRxvxty5iAT2']
      },
      'CrvWR4TVdNRxvxty5iAT2',
      filed)).toBeTruthy()
    expect(
      validator({
        operator: 'toBeFalsy',
        value: ['CrvWR4TVdNRxvxty5iAT2']
      },
      'CrvWR4TVdNRxvxty5iAT2',
      filed)).toBeFalsy()
  })
  test('Checkbox', () => {
    const filed = { type: 'checkbox', label: 'Checkbox', icon: 'checkbox', key: 'checkbox_qE0oMb42msqQ1M4N35F6P', id: 'qE0oMb42msqQ1M4N35F6P', options: { dataKey: 'qE0oMb42msqQ1M4N35F6P', displayStyle: 'block', defaultValue: [], labelWidth: 100, isShowLabel: true, required: false, disabled: false }, style: { width: { pc: '100%', mobile: '100%' } } }
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
      filed)).toBeTruthy()
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
      filed)).toBeFalsy()
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
      filed)).toBeFalsy()
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
      filed)).toBeTruthy()
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
      filed)).toBeTruthy()
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
      filed)).toBeFalsy()
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
      filed)).toBeFalsy()
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
      filed)).toBeTruthy()
  })
  test('Select', () => {
    const filed = { type: 'select', label: 'Select', icon: 'dropdown0', key: 'select_lLyhZ6ThDBd2_O5JKOjzN', id: 'lLyhZ6ThDBd2_O5JKOjzN', options: { dataKey: 'lLyhZ6ThDBd2_O5JKOjzN', filterable: true, multiple: false, defaultValue: [], placeholder: 'Please select', labelWidth: 100, isShowLabel: true, disabled: false, clearable: true, required: false }, style: { width: { pc: '100%', mobile: '100%' } } }
    expect(
      validator({
        operator: 'equal',
        value: '0bZN9TQ0bePdjOewythuj'
      },
      '0bZN9TQ0bePdjOewythuj',
      filed)).toBeTruthy()
    filed.options.multiple = true
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
      filed)).toBeTruthy()
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
      filed)).toBeFalsy()
    filed.options.multiple = false
    expect(
      validator({
        operator: 'not_equal',
        value: '0bZN9TQ0bePdjOewythuj'
      },
      '0bZN9TQ0bePdjOewythuj',
      filed)).toBeFalsy()
    filed.options.multiple = true
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
      filed)).toBeFalsy()
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
      filed)).toBeTruthy()
    filed.options.multiple = false
    expect(
      validator({
        operator: 'contains',
        value: [
          '0bZN9TQ0bePdjOewythuj'
        ]
      },
      '0bZN9TQ0bePdjOewythuj',
      filed)).toBeTruthy()
    filed.options.multiple = true
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
      filed)).toBeTruthy()
    filed.options.multiple = false
    expect(
      validator({
        operator: 'not_contain',
        value: [
          '0bZN9TQ0bePdjOewythuj'
        ]
      },
      '0bZN9TQ0bePdjOewythuj',
      filed)).toBeFalsy()
    filed.options.multiple = true
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
      filed)).toBeFalsy()
  })
  test('Time', () => {
    const filed = { type: 'time', label: 'Time', icon: 'time', key: 'time_JfeEFqHMQbVI424FbFEHw', id: 'JfeEFqHMQbVI424FbFEHw', options: { clearable: true, format: 'HH时mm分ss秒', defaultValue: null, placeholder: 'Please select', labelWidth: 100, isShowLabel: true, required: false, disabled: false }, style: { width: { pc: '100%', mobile: '100%' } } }
    expect(
      validator({
        operator: 'equal',
        value: '16:12:46'
      },
      '16:12:46',
      filed)).toBeTruthy()
    expect(
      validator({
        operator: 'not_equal',
        value: '16:12:46'
      },
      '16:12:46',
      filed)).toBeFalsy()
  })
  // test('Date', () => {
  //   const filed = { type: 'time', label: 'Time', icon: 'time', key: 'time_JfeEFqHMQbVI424FbFEHw', id: 'JfeEFqHMQbVI424FbFEHw', options: { clearable: true, format: 'HH时mm分ss秒', defaultValue: null, placeholder: 'Please select', labelWidth: 100, isShowLabel: true, required: false, disabled: false }, style: { width: { pc: '100%', mobile: '100%' } } }
  //   expect(
  //     validator({
  //       operator: 'equal',
  //       value: '16:12:46'
  //     },
  //     '16:12:46',
  //     filed)).toBeTruthy()
  // })
  test('Rate', () => {
    const filed = { type: 'rate', label: 'Rate', icon: 'rating', key: 'rate_h3rw6be0P5V5ciSTbD6Yx', id: 'h3rw6be0P5V5ciSTbD6Yx', options: { max: 5, allowHalf: true, defaultValue: 0, labelWidth: 100, isShowLabel: true, disabled: false }, style: { width: { pc: '100%', mobile: '100%' } } }
    expect(
      validator({
        operator: 'equal',
        value: 3.5
      },
      3.5,
      filed)).toBeTruthy()
    filed.options.allowHalf = false
    expect(
      validator({
        operator: 'equal',
        value: 3
      },
      3,
      filed)).toBeTruthy()
    filed.options.allowHalf = true
    expect(
      validator({
        operator: 'not_equal',
        value: 3.5
      },
      3.5,
      filed)).toBeFalsy()
    filed.options.allowHalf = false
    expect(
      validator({
        operator: 'not_equal',
        value: 3
      },
      3,
      filed)).toBeFalsy()
  })
  test('Switch', () => {
    const filed = { type: 'switch', label: 'Switch', icon: 'switch', key: 'switch_XpvOZGZjVMTVdHWZiuehy', id: 'XpvOZGZjVMTVdHWZiuehy', options: { defaultValue: true, labelWidth: 100, isShowLabel: true, disabled: false }, style: { width: { pc: '100%', mobile: '100%' } } }
    expect(
      validator({
        operator: 'equal',
        value: 1
      },
      true,
      filed)).toBeTruthy()
    expect(
      validator({
        operator: 'equal',
        value: 0
      },
      false,
      filed)).toBeTruthy()
    expect(
      validator({
        operator: 'not_equal',
        value: 1
      },
      true,
      filed)).toBeFalsy()
    expect(
      validator({
        operator: 'not_equal',
        value: 0
      },
      false,
      filed)).toBeFalsy()
  })
  test('Slider', () => {
    const filed = { type: 'slider', label: 'Slider', icon: 'slider', key: 'slider_DnNgjeX1vs6MTUd8IuMqO', id: 'DnNgjeX1vs6MTUd8IuMqO', options: { min: 0, max: 100, step: 1, defaultValue: 0, placeholder: '', labelWidth: 100, isShowLabel: true, required: false, disabled: false }, style: { width: { pc: '100%', mobile: '100%' } } }
    expect(
      validator({
        operator: 'equal',
        value: 4
      },
      4,
      filed)).toBeTruthy()
    expect(
      validator({
        operator: 'not_equal',
        value: 4
      },
      4,
      filed)).toBeFalsy()
  })
  test('Html', () => {
    const filed = { type: 'html', label: 'Html', icon: 'html', key: 'html_cBsbj6NW7wNicW2umHzsE', id: 'cBsbj6NW7wNicW2umHzsE', options: { defaultValue: '<p>123</p>', placeholder: 'Please enter', action: 'http://localhost:8001/Everright-api/lowCode/uploads', size: 1, labelWidth: 100, isShowLabel: true, required: false, disabled: false }, style: { width: { pc: '100%', mobile: '100%' } } }
    expect(
      validator({
        operator: 'equal',
        value: '<p>123</p>'
      },
      '<p>123</p>',
      filed)).toBeTruthy()
    expect(
      validator({
        operator: 'not_equal',
        value: '<p>123</p>'
      },
      '<p>123</p>',
      filed)).toBeFalsy()
    expect(
      validator({
        operator: 'contains',
        value: [
          '<p>123</p>'
        ]
      },
      '<p>123</p>',
      filed)).toBeTruthy()
    expect(
      validator({
        operator: 'not_contain',
        value: [
          '<p>123</p>'
        ]
      },
      '<p>123</p>',
      filed)).toBeFalsy()
  })
  test('Cascader', () => {
    const filed = { type: 'cascader', label: 'Cascader', icon: 'cascader', key: 'cascader_KFrOTULCQ0EAcMcIQTd_v', id: 'KFrOTULCQ0EAcMcIQTd_v', options: { filterable: true, multiple: false, checkStrictly: true, defaultValue: [], placeholder: 'Please select', labelWidth: 100, isShowLabel: true, required: false, disabled: false, clearable: true, dataKey: 'KFrOTULCQ0EAcMcIQTd_v' }, style: { width: { pc: '100%', mobile: '100%' } } }
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
      filed)).toBeTruthy()
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
      filed)).toBeFalsy()
    filed.options.multiple = true
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
      filed)).toBeTruthy()
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
      filed)).toBeFalsy()
    filed.options.multiple = false
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
      filed)).toBeFalsy()
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
      filed)).toBeTruthy()
    filed.options.multiple = true
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
      filed)).toBeFalsy()
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
      filed)).toBeTruthy()
  })
  // test('File', () => {
  //   const filed = { type: 'uploadfile', label: 'File', icon: 'upload', key: 'uploadfile_FSDpM3CGDUP7-GioNkFLn', id: 'FSDpM3CGDUP7-GioNkFLn', options: { isShowLabel: true, labelWidth: 100, defaultValue: [], multiple: false, action: 'http://localhost:8001/Everright-api/lowCode/uploads', limit: 1, size: 1, accept: '.png,.jpg,.gif', disabled: false, required: false }, style: { width: { pc: '100%', mobile: '100%' } } }
  //   expect(
  //     validator({
  //       operator: 'equal',
  //       value: '<p>123</p>'
  //     },
  //     '<p>123</p>',
  //     filed)).toBeTruthy()
  // })
  // test('Signature', () => {
  //   const filed = { type: 'signature', label: 'Signature', icon: 'signature', key: 'signature_TBB-T_V2Gkt-BwinGdG4f', id: 'TBB-T_V2Gkt-BwinGdG4f', options: { required: false, isShowLabel: true, labelWidth: 100, defaultValue: '', penColor: 'rgb(0, 0, 0)', action: 'http://localhost:8001/Everright-api/lowCode/uploads', disabled: false }, style: { width: { pc: '100%', mobile: '100%' } } }
  //   expect(
  //     validator({
  //       operator: 'equal',
  //       value: '<p>123</p>'
  //     },
  //     '<p>123</p>',
  //     filed)).toBeTruthy()
  // })
})

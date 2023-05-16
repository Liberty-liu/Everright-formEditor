import { describe, assert, expect, test } from 'vitest'
import { validator, getAreaType } from '@ER/hooks/use-logic'
import { areaList } from '@vant/area-data'
const field = { type: 'region', label: 'Region', icon: 'location', key: 'region_Yqz1snVkubaX2WG8xCEFs', id: 'Yqz1snVkubaX2WG8xCEFs', options: { placeholder: 'Please select', required: false, isShowLabel: true, labelWidth: 100, defaultValue: '', selectType: 1, filterable: true }, style: { width: { pc: '100%', mobile: '100%' } } }
describe('Region', () => {
  test.each([
    { codes: areaList.province_list, expected: 1 },
    { codes: areaList.city_list, expected: 2 },
    { codes: areaList.county_list, expected: 3 }
  ])('getAreaType should return expected for %p', ({ codes, expected }) => {
    Object.keys(codes).forEach(code => {
      const result = getAreaType(code)
      expect(result).toBe(expected)
    })
  })
  test('one_of: selectType 1', () => {
    field.options.selectType = 1
    expect(
      validator({
        operator: 'one_of',
        value: [
          '110000',
          '120000',
          '320000'
        ]
      },
      '110000',
      field)).toBeTruthy()
    expect(
      validator({
        operator: 'one_of',
        value: [
          '110000',
          '120000',
          '320000'
        ]
      },
      '',
      field)).toBeFalsy()
  })
  test('one_of: selectType 2', () => {
    field.options.selectType = 2
    expect(
      validator({
        operator: 'one_of',
        value: [
          '110100',
          '120100'
        ]
      },
      '110100',
      field)).toBeTruthy()
    expect(
      validator({
        operator: 'one_of',
        value: [
          '110100',
          '120100'
        ]
      },
      '',
      field)).toBeFalsy()
  })
  test('one_of: selectType 3', () => {
    field.options.selectType = 3
    expect(
      validator({
        operator: 'one_of',
        value: [
          '110101',
          '130102'
        ]
      },
      '110101',
      field)).toBeTruthy()
    expect(
      validator({
        operator: 'one_of',
        value: [
          '110100',
          '120100'
        ]
      },
      '',
      field)).toBeFalsy()
  })
  test('not_one_of: selectType 1', () => {
    field.options.selectType = 1
    expect(
      validator({
        operator: 'not_one_of',
        value: [
          '110000',
          '120000',
          '320000'
        ]
      },
      '110000',
      field)).toBeFalsy()
    expect(
      validator({
        operator: 'not_one_of',
        value: [
          '110000',
          '120000',
          '320000'
        ]
      },
      '',
      field)).toBeTruthy()
  })
  test('not_one_of: selectType 2', () => {
    field.options.selectType = 2
    expect(
      validator({
        operator: 'not_one_of',
        value: [
          '110100',
          '120100'
        ]
      },
      '110100',
      field)).toBeFalsy()
    expect(
      validator({
        operator: 'not_one_of',
        value: [
          '110100',
          '120100'
        ]
      },
      '',
      field)).toBeTruthy()
  })
  test('not_one_of: selectType 3', () => {
    field.options.selectType = 3
    expect(
      validator({
        operator: 'not_one_of',
        value: [
          '110101',
          '130102'
        ]
      },
      '110101',
      field)).toBeFalsy()
    expect(
      validator({
        operator: 'not_one_of',
        value: [
          '110100',
          '120100'
        ]
      },
      '',
      field)).toBeTruthy()
  })
  test('belong_one_of: selectType 1', () => {
    field.options.selectType = 1
    expect(
      validator({
        operator: 'belong_one_of',
        value: [
          '110000',
          '130000'
        ]
      },
      '110000',
      field)).toBeTruthy()
    expect(
      validator({
        operator: 'belong_one_of',
        value: [
          '110000',
          '130000'
        ]
      },
      '110001',
      field)).toBeTruthy()
    expect(
      validator({
        operator: 'belong_one_of',
        value: [
          '110000',
          '130000'
        ]
      },
      '',
      field)).toBeFalsy()
    expect(
      validator({
        operator: 'belong_one_of',
        value: [
          '110000',
          '130000'
        ]
      },
      undefined,
      field)).toBeFalsy()
    expect(
      validator({
        operator: 'belong_one_of',
        value: [
          '110000',
          '130000'
        ]
      },
      null,
      field)).toBeFalsy()
  })
  test('belong_one_of: selectType 2', () => {
    field.options.selectType = 2
    expect(
      validator({
        operator: 'belong_one_of',
        value: [
          '110000',
          '130000'
        ]
      },
      '110100',
      field)).toBeTruthy()
    expect(
      validator({
        operator: 'belong_one_of',
        value: [
          '110100'
        ]
      },
      '110100',
      field)).toBeTruthy()
    expect(
      validator({
        operator: 'belong_one_of',
        value: [
          '110000',
          '130000'
        ]
      },
      '110101',
      field)).toBeTruthy()
    expect(
      validator({
        operator: 'belong_one_of',
        value: [
          '110000',
          '130000'
        ]
      },
      '',
      field)).toBeFalsy()
    expect(
      validator({
        operator: 'belong_one_of',
        value: [
          '110000',
          '130000'
        ]
      },
      undefined,
      field)).toBeFalsy()
    expect(
      validator({
        operator: 'belong_one_of',
        value: [
          '110000',
          '130000'
        ]
      },
      null,
      field)).toBeFalsy()
  })
  test('belong_one_of: selectType 3', () => {
    field.options.selectType = 3
    expect(
      validator({
        operator: 'belong_one_of',
        value: [
          '110000',
          '130100'
        ]
      },
      '110101',
      field)).toBeTruthy()
    expect(
      validator({
        operator: 'belong_one_of',
        value: [
          '110000',
          '130100'
        ]
      },
      '130100',
      field)).toBeTruthy()
    expect(
      validator({
        operator: 'belong_one_of',
        value: [
          '110100'
        ]
      },
      '110100',
      field)).toBeTruthy()
    expect(
      validator({
        operator: 'belong_one_of',
        value: [
          '110000',
          '130000'
        ]
      },
      '110101',
      field)).toBeTruthy()
    expect(
      validator({
        operator: 'belong_one_of',
        value: [
          '110000',
          '130000'
        ]
      },
      '',
      field)).toBeFalsy()
    expect(
      validator({
        operator: 'belong_one_of',
        value: [
          '110000',
          '130000'
        ]
      },
      undefined,
      field)).toBeFalsy()
    expect(
      validator({
        operator: 'belong_one_of',
        value: [
          '110000',
          '130000'
        ]
      },
      null,
      field)).toBeFalsy()
  })
  test('not_belong_one_of: selectType 1', () => {
    field.options.selectType = 1
    expect(
      validator({
        operator: 'not_belong_one_of',
        value: [
          '110000',
          '130000'
        ]
      },
      '110000',
      field)).toBeFalsy()
    expect(
      validator({
        operator: 'not_belong_one_of',
        value: [
          '110000',
          '130000'
        ]
      },
      '110001',
      field)).toBeFalsy()
    expect(
      validator({
        operator: 'not_belong_one_of',
        value: [
          '110000',
          '130000'
        ]
      },
      '',
      field)).toBeTruthy()
    expect(
      validator({
        operator: 'not_belong_one_of',
        value: [
          '110000',
          '130000'
        ]
      },
      undefined,
      field)).toBeTruthy()
    expect(
      validator({
        operator: 'not_belong_one_of',
        value: [
          '110000',
          '130000'
        ]
      },
      null,
      field)).toBeTruthy()
  })
  test('not_belong_one_of: selectType 2', () => {
    field.options.selectType = 2
    expect(
      validator({
        operator: 'not_belong_one_of',
        value: [
          '110000',
          '130000'
        ]
      },
      '110100',
      field)).toBeFalsy()
    expect(
      validator({
        operator: 'not_belong_one_of',
        value: [
          '110100'
        ]
      },
      '110100',
      field)).toBeFalsy()
    expect(
      validator({
        operator: 'not_belong_one_of',
        value: [
          '110000',
          '130000'
        ]
      },
      '110101',
      field)).toBeFalsy()
    expect(
      validator({
        operator: 'not_belong_one_of',
        value: [
          '110000',
          '130000'
        ]
      },
      '',
      field)).toBeTruthy()
    expect(
      validator({
        operator: 'not_belong_one_of',
        value: [
          '110000',
          '130000'
        ]
      },
      undefined,
      field)).toBeTruthy()
    expect(
      validator({
        operator: 'not_belong_one_of',
        value: [
          '110000',
          '130000'
        ]
      },
      null,
      field)).toBeTruthy()
  })
  test('not_belong_one_of: selectType 3', () => {
    field.options.selectType = 3
    expect(
      validator({
        operator: 'not_belong_one_of',
        value: [
          '110000',
          '130100'
        ]
      },
      '110101',
      field)).toBeFalsy()
    expect(
      validator({
        operator: 'not_belong_one_of',
        value: [
          '110000',
          '130100'
        ]
      },
      '130100',
      field)).toBeFalsy()
    expect(
      validator({
        operator: 'not_belong_one_of',
        value: [
          '110100'
        ]
      },
      '110100',
      field)).toBeFalsy()
    expect(
      validator({
        operator: 'not_belong_one_of',
        value: [
          '110000',
          '130000'
        ]
      },
      '110101',
      field)).toBeFalsy()
    expect(
      validator({
        operator: 'not_belong_one_of',
        value: [
          '110000',
          '130000'
        ]
      },
      '',
      field)).toBeTruthy()
    expect(
      validator({
        operator: 'not_belong_one_of',
        value: [
          '110000',
          '130000'
        ]
      },
      undefined,
      field)).toBeTruthy()
    expect(
      validator({
        operator: 'not_belong_one_of',
        value: [
          '110000',
          '130000'
        ]
      },
      null,
      field)).toBeTruthy()
  })
})

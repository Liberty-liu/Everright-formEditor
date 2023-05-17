import { describe, assert, expect, test } from 'vitest'
import { validator, getAreaType } from '@ER/hooks/use-logic'
import { areaList } from '@vant/area-data'
import { Region } from '@ER-test/data/fields.js'
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
    Region.options.selectType = 1
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
      Region)).toBeTruthy()
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
      Region)).toBeFalsy()
  })
  test('one_of: selectType 2', () => {
    Region.options.selectType = 2
    expect(
      validator({
        operator: 'one_of',
        value: [
          '110100',
          '120100'
        ]
      },
      '110100',
      Region)).toBeTruthy()
    expect(
      validator({
        operator: 'one_of',
        value: [
          '110100',
          '120100'
        ]
      },
      '',
      Region)).toBeFalsy()
  })
  test('one_of: selectType 3', () => {
    Region.options.selectType = 3
    expect(
      validator({
        operator: 'one_of',
        value: [
          '110101',
          '130102'
        ]
      },
      '110101',
      Region)).toBeTruthy()
    expect(
      validator({
        operator: 'one_of',
        value: [
          '110100',
          '120100'
        ]
      },
      '',
      Region)).toBeFalsy()
  })
  test('not_one_of: selectType 1', () => {
    Region.options.selectType = 1
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
      Region)).toBeFalsy()
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
      Region)).toBeTruthy()
  })
  test('not_one_of: selectType 2', () => {
    Region.options.selectType = 2
    expect(
      validator({
        operator: 'not_one_of',
        value: [
          '110100',
          '120100'
        ]
      },
      '110100',
      Region)).toBeFalsy()
    expect(
      validator({
        operator: 'not_one_of',
        value: [
          '110100',
          '120100'
        ]
      },
      '',
      Region)).toBeTruthy()
  })
  test('not_one_of: selectType 3', () => {
    Region.options.selectType = 3
    expect(
      validator({
        operator: 'not_one_of',
        value: [
          '110101',
          '130102'
        ]
      },
      '110101',
      Region)).toBeFalsy()
    expect(
      validator({
        operator: 'not_one_of',
        value: [
          '110100',
          '120100'
        ]
      },
      '',
      Region)).toBeTruthy()
  })
  test('belong_one_of: selectType 1', () => {
    Region.options.selectType = 1
    expect(
      validator({
        operator: 'belong_one_of',
        value: [
          '110000',
          '130000'
        ]
      },
      '110000',
      Region)).toBeTruthy()
    expect(
      validator({
        operator: 'belong_one_of',
        value: [
          '110000',
          '130000'
        ]
      },
      '110001',
      Region)).toBeTruthy()
    expect(
      validator({
        operator: 'belong_one_of',
        value: [
          '110000',
          '130000'
        ]
      },
      '',
      Region)).toBeFalsy()
    expect(
      validator({
        operator: 'belong_one_of',
        value: [
          '110000',
          '130000'
        ]
      },
      undefined,
      Region)).toBeFalsy()
    expect(
      validator({
        operator: 'belong_one_of',
        value: [
          '110000',
          '130000'
        ]
      },
      null,
      Region)).toBeFalsy()
  })
  test('belong_one_of: selectType 2', () => {
    Region.options.selectType = 2
    expect(
      validator({
        operator: 'belong_one_of',
        value: [
          '110000',
          '130000'
        ]
      },
      '110100',
      Region)).toBeTruthy()
    expect(
      validator({
        operator: 'belong_one_of',
        value: [
          '110100'
        ]
      },
      '110100',
      Region)).toBeTruthy()
    expect(
      validator({
        operator: 'belong_one_of',
        value: [
          '110000',
          '130000'
        ]
      },
      '110101',
      Region)).toBeTruthy()
    expect(
      validator({
        operator: 'belong_one_of',
        value: [
          '110000',
          '130000'
        ]
      },
      '',
      Region)).toBeFalsy()
    expect(
      validator({
        operator: 'belong_one_of',
        value: [
          '110000',
          '130000'
        ]
      },
      undefined,
      Region)).toBeFalsy()
    expect(
      validator({
        operator: 'belong_one_of',
        value: [
          '110000',
          '130000'
        ]
      },
      null,
      Region)).toBeFalsy()
  })
  test('belong_one_of: selectType 3', () => {
    Region.options.selectType = 3
    expect(
      validator({
        operator: 'belong_one_of',
        value: [
          '110000',
          '130100'
        ]
      },
      '110101',
      Region)).toBeTruthy()
    expect(
      validator({
        operator: 'belong_one_of',
        value: [
          '110000',
          '130100'
        ]
      },
      '130100',
      Region)).toBeTruthy()
    expect(
      validator({
        operator: 'belong_one_of',
        value: [
          '110100'
        ]
      },
      '110100',
      Region)).toBeTruthy()
    expect(
      validator({
        operator: 'belong_one_of',
        value: [
          '110000',
          '130000'
        ]
      },
      '110101',
      Region)).toBeTruthy()
    expect(
      validator({
        operator: 'belong_one_of',
        value: [
          '110000',
          '130000'
        ]
      },
      '',
      Region)).toBeFalsy()
    expect(
      validator({
        operator: 'belong_one_of',
        value: [
          '110000',
          '130000'
        ]
      },
      undefined,
      Region)).toBeFalsy()
    expect(
      validator({
        operator: 'belong_one_of',
        value: [
          '110000',
          '130000'
        ]
      },
      null,
      Region)).toBeFalsy()
  })
  test('not_belong_one_of: selectType 1', () => {
    Region.options.selectType = 1
    expect(
      validator({
        operator: 'not_belong_one_of',
        value: [
          '110000',
          '130000'
        ]
      },
      '110000',
      Region)).toBeFalsy()
    expect(
      validator({
        operator: 'not_belong_one_of',
        value: [
          '110000',
          '130000'
        ]
      },
      '110001',
      Region)).toBeFalsy()
    expect(
      validator({
        operator: 'not_belong_one_of',
        value: [
          '110000',
          '130000'
        ]
      },
      '',
      Region)).toBeTruthy()
    expect(
      validator({
        operator: 'not_belong_one_of',
        value: [
          '110000',
          '130000'
        ]
      },
      undefined,
      Region)).toBeTruthy()
    expect(
      validator({
        operator: 'not_belong_one_of',
        value: [
          '110000',
          '130000'
        ]
      },
      null,
      Region)).toBeTruthy()
  })
  test('not_belong_one_of: selectType 2', () => {
    Region.options.selectType = 2
    expect(
      validator({
        operator: 'not_belong_one_of',
        value: [
          '110000',
          '130000'
        ]
      },
      '110100',
      Region)).toBeFalsy()
    expect(
      validator({
        operator: 'not_belong_one_of',
        value: [
          '110100'
        ]
      },
      '110100',
      Region)).toBeFalsy()
    expect(
      validator({
        operator: 'not_belong_one_of',
        value: [
          '110000',
          '130000'
        ]
      },
      '110101',
      Region)).toBeFalsy()
    expect(
      validator({
        operator: 'not_belong_one_of',
        value: [
          '110000',
          '130000'
        ]
      },
      '',
      Region)).toBeTruthy()
    expect(
      validator({
        operator: 'not_belong_one_of',
        value: [
          '110000',
          '130000'
        ]
      },
      undefined,
      Region)).toBeTruthy()
    expect(
      validator({
        operator: 'not_belong_one_of',
        value: [
          '110000',
          '130000'
        ]
      },
      null,
      Region)).toBeTruthy()
  })
  test('not_belong_one_of: selectType 3', () => {
    Region.options.selectType = 3
    expect(
      validator({
        operator: 'not_belong_one_of',
        value: [
          '110000',
          '130100'
        ]
      },
      '110101',
      Region)).toBeFalsy()
    expect(
      validator({
        operator: 'not_belong_one_of',
        value: [
          '110000',
          '130100'
        ]
      },
      '130100',
      Region)).toBeFalsy()
    expect(
      validator({
        operator: 'not_belong_one_of',
        value: [
          '110100'
        ]
      },
      '110100',
      Region)).toBeFalsy()
    expect(
      validator({
        operator: 'not_belong_one_of',
        value: [
          '110000',
          '130000'
        ]
      },
      '110101',
      Region)).toBeFalsy()
    expect(
      validator({
        operator: 'not_belong_one_of',
        value: [
          '110000',
          '130000'
        ]
      },
      '',
      Region)).toBeTruthy()
    expect(
      validator({
        operator: 'not_belong_one_of',
        value: [
          '110000',
          '130000'
        ]
      },
      undefined,
      Region)).toBeTruthy()
    expect(
      validator({
        operator: 'not_belong_one_of',
        value: [
          '110000',
          '130000'
        ]
      },
      null,
      Region)).toBeTruthy()
  })
})

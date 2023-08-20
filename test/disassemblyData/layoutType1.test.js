import { describe, assert, expect, test, beforeEach, beforeAll, vi } from 'vitest'
import utils from '@ER/utils'
import erGeneratorData from '@ER/formEditor/generatorData.js'
import * as erComponentsConfig from '@ER/formEditor/componentsConfig.js'
import _ from 'lodash-es'
const wrapData = (data, field) => ({
  config: {},
  logic: {},
  data: {},
  list: [
    data
  ],
  fields: [
    field.columns[0]
  ]
})
describe('Fields and layout not separated', () => {
  beforeAll(() => {
    vi.stubEnv('TESTIDTYPE', 'nanoid')
    return () => {
      vi.stubEnv('TESTIDTYPE', '')
    }
  })
  const field = erGeneratorData(erComponentsConfig.fieldsConfig[0].list[0], true, 'en')
  test('Only fields without layout', async () => {
    const data = wrapData(field, field)
    expect(utils.combinationData1(utils.disassemblyData1(_.cloneDeep(data)))).toEqual(data)
  })
  test('Grid', async () => {
    const data = wrapData(erGeneratorData(_.cloneDeep(erComponentsConfig.fieldsConfig[2].list[0]), true, 'en'), field)
    data.list[0].columns[0].columns[0].list.push(field)
    expect(utils.combinationData1(utils.disassemblyData1(_.cloneDeep(data)))).toEqual(data)
  })
  test('Table', async () => {
    const data = wrapData(erGeneratorData(_.cloneDeep(erComponentsConfig.fieldsConfig[2].list[1]), true, 'en'), field)
    data.list[0].columns[0].rows[0].columns[0].list.push(field)
    expect(utils.combinationData1(utils.disassemblyData1(_.cloneDeep(data)))).toEqual(data)
  })
  test('Tabs', async () => {
    const data = wrapData(erGeneratorData(_.cloneDeep(erComponentsConfig.fieldsConfig[2].list[2]), true, 'en'), field)
    data.list[0].columns[0].columns[0].list.push(field)
    expect(utils.combinationData1(utils.disassemblyData1(_.cloneDeep(data)))).toEqual(data)
  })
  test('nested layout:Grid > Grid > field', async () => {
    const grid0 = erGeneratorData(_.cloneDeep(erComponentsConfig.fieldsConfig[2].list[0]), true, 'en')
    const grid1 = erGeneratorData(_.cloneDeep(erComponentsConfig.fieldsConfig[2].list[0]), true, 'en')
    grid0.columns[0].columns[0].list.push(grid1)
    grid1.columns[0].columns[0].list.push(field)
    const data = wrapData(grid0, field)
    expect(utils.combinationData1(utils.disassemblyData1(_.cloneDeep(data)))).toEqual(data)
  })
})

import { describe, assert, expect, test, beforeEach } from 'vitest'
import { removeLogicDataByid, checkIdExistInLogic } from '@ER/utils/logic.js'
import { dels } from '@ER-test/data/logic.js'
import _ from 'lodash-es'
describe('Delete logic data based by field id', () => {
  let testData = {}
  beforeEach(() => {
    testData = _.cloneDeep(dels)
  })
  test('Delete the data inside the if and then statement(1)', () => {
    expect(checkIdExistInLogic('6FobSGWf9gFBgK0MS7a3E', testData[0])).toBeTruthy()
    removeLogicDataByid('6FobSGWf9gFBgK0MS7a3E', testData[0])
    expect(testData[0]).toMatchSnapshot()
  })
  test('Delete the data inside the if and then statement(2)', () => {
    expect(checkIdExistInLogic('NLSfG6qSkyzXWfL82rW0E', testData[0])).toBeTruthy()
    removeLogicDataByid('NLSfG6qSkyzXWfL82rW0E', testData[0])
    expect(testData[0]).toMatchSnapshot()
  })
  test('Delete the data inside the if and then statement(3)', () => {
    expect(checkIdExistInLogic('315WAA5x2C6VvvL7kM1pF', testData[0])).toBeTruthy()
    removeLogicDataByid('315WAA5x2C6VvvL7kM1pF', testData[0])
    expect(testData[0]).toMatchSnapshot()
  })
  test('Delete the data inside the if and then statement(4)', () => {
    expect(checkIdExistInLogic('3EnU8Uc7e7gjyt0I_wkAl', testData[0])).toBeTruthy()
    removeLogicDataByid('3EnU8Uc7e7gjyt0I_wkAl', testData[0])
    expect(testData[0]).toMatchSnapshot()
  })
})

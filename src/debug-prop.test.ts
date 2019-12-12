'use strict'

/* -----------------------------------------------------------------------------
 * dependencies
 * -------------------------------------------------------------------------- */

// lib
import _debug from '@inventory/debug'
import debugProp from './debug-prop'

// mocks
jest.mock('@inventory/debug')
let debug = _debug as jest.Mock<any>

/* -----------------------------------------------------------------------------
 * test
 * -------------------------------------------------------------------------- */

let debugVals: string[] = []
debug.mockImplementation((name: string) => (val: number) =>
  debugVals.push(`${name}: ${val}`)
)

describe('debugProp', function () {
  beforeEach(() => {
    debugVals = []
  })

  test('Should debug state changes', () => {
    const target = { count: 1 }

    debugProp('count')(target, 'targetname')
    target.count++
    target.count++

    expect(debugVals).toEqual([
      'targetname: count = 2',
      'targetname: count = 3'
    ])
  })
})

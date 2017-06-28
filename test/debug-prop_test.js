/* eslint-env mocha */
'use strict'

/* -----------------------------------------------------------------------------
 * dependencies
 * -------------------------------------------------------------------------- */

// 3rd party
import { assert } from 'chai'
import { stub } from 'sinon'

// lib
import debugProp from '../src'

/* -----------------------------------------------------------------------------
 * test
 * -------------------------------------------------------------------------- */

describe('debug-prop', function () {
  beforeEach(function () {
    stub(console, 'log')
  })

  afterEach(function () {
    console.log.restore()
  })

  it('Should be disabled by default.', function () {
    const obj = debugProp('state', {})
    obj.state = 'value'

    assert.isTrue(console.log.notCalled)
  })

  it('Should not overwrite existing value.', function () {
    const obj = debugProp('state', { state: 'og' })
    assert.equal(obj.state, 'og')
  })

  it('Should log value changes.', function () {
    const obj = debugProp('state', { opts: { debug: true } })
    obj.state = 'value'

    assert.isTrue(console.log.calledOnce)
    assert.equal(console.log.getCall(0).args[0], 'state: value')
  })

  it('Should use custom logging function.', function (done) {
    const obj = { opts: { debug: true } }

    debugProp('state', obj, function (val) {
      assert.equal(val, 'value')
      assert.equal(this, obj)
      done()
    })

    obj.state = 'value'
  })
})

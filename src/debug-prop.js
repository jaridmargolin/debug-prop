'use strict'

/* -----------------------------------------------------------------------------
 * debugProp
 * -------------------------------------------------------------------------- */

/**
 * @module debugProp
 *
 * @desc Easily debug property changes on an object. By default debugging is
 *   disabled on the object. To enable debugging, the object must set
 *   `opts.debug` to true.
 *
 * @example
 * const obj = debugProp('state', {
 *   state: 'test',
 *   opts: { debug: true}
 * })
 *
 * obj.state = 'test2'
 * // logs => state: test2
 *
 * @example
 * const obj = debugProp('state', {
 *   uuid: '1',
 *   state: 'test',
 *   opts: { debug: true}
 * }, function (val) => console.log(`${this.uuid}-state: ${val}`))
 *
 * obj.state = 'test2'
 * // logs => 1-state: test2
 *
 * @param {string} prop - Name of property to begin logging changes for
 * @param {Object} obj - Target object to debug
 * @param {Function} log - Custom logging function
 *
 * @returns {Object} Target object with debugging injected.
 */
export const debugProp = function (prop, obj, log) {
  const logFn = log || ((val) => console.log(`${prop}: ${val}`))

  if (obj[prop] !== void 0) {
    obj[`_${prop}`] = obj[prop]
  }

  Object.defineProperty(obj, prop, {
    get () {
      return this[`_${prop}`]
    },
    set (val) {
      this[`_${prop}`] = val
      this.opts && this.opts.debug && logFn.call(this, val)
    }
  })

  return obj
}

export default debugProp

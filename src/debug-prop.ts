'use strict'

/* -----------------------------------------------------------------------------
 * dependencies
 * -------------------------------------------------------------------------- */

// 3rd party
import debug from '@inventory/debug'

/* -----------------------------------------------------------------------------
 * debugProp
 * -------------------------------------------------------------------------- */

/**
 * @desc Easily debug property changes on an object.
 *
 * @example
 * ```js
 * const debugCount = debugState('count')
 *
 * const obj1 = { count: 1 }
 * debugCount(obj1, 'debug-prop:obj1')
 * obj1.count++
 *
 * const obj2 = { count: 1 }
 * debugCount(obj2, 'debug-prop:obj2')
 * obj2.count++
 *
 * // logs => debug-prop:obj1 state = 2
 * // logs => debug-prop:obj2 state = 2
 *```
 *
 * @param prop - Name of property to begin logging changes for
 * @param target - Target object to debug
 * @param format - Format the value to be logged
 */
export default function debugProp<Prop extends string, ValType extends any> (
  prop: Prop,
  format: (val: ValType) => any = val => `${prop} = ${val}`
) {
  return function applyDebugger<Target extends { [k in Prop]: ValType }> (
    target: Target,
    debugName: string
  ) {
    let debugProp = debug(debugName)
    let curVal = target[prop]

    Object.defineProperty(target, prop, {
      get () {
        return curVal
      },
      set (val) {
        debugProp(format((curVal = val)))
        return curVal
      }
    })

    return target
  }
}

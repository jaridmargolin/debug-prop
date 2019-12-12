'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var debug = _interopDefault(require('@inventory/debug'));

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

function debugProp(prop) {
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (val) {
    return "".concat(prop, " = ").concat(val);
  };
  return function applyDebugger(target, debugName) {
    var debugProp = debug(debugName);
    var curVal = target[prop];
    Object.defineProperty(target, prop, {
      get: function get() {
        return curVal;
      },
      set: function set(val) {
        debugProp(format(curVal = val));
        return curVal;
      }
    });
    return target;
  };
}

exports.default = debugProp;

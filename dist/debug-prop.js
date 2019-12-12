(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.debugProp = {}));
}(this, (function (exports) { 'use strict';

  /* -----------------------------------------------------------------------------
   * debug
   * Modified concepts from: https://github.com/visionmedia/debug
   * -------------------------------------------------------------------------- */

  var loadDebugValue = function loadDebugValue() {
    // NOTE: This is necessary because safari throws when a user disables
    // cookies/localstorage and you attempt to access it.
    // NOTE: TVMLKit (Apple TV JS Runtime) does not have a window object, just
    // localStorage in the global context. The Browser also has localStorage in
    // the global context.
    var storage;

    try {
      storage = localStorage;
    } catch (e) {}

    try {
      // @ts-ignore: unknown environment. This is a known and captured error state
      return storage.getItem('debug');
    } catch (error) {}

    try {
      return process.env.DEBUG;
    } catch (error) {}
  };

  var parseDebugValue = function parseDebugValue(debugValue) {
    return debugValue ? debugValue.split(/[\s,]+/).map(function (val) {
      return new RegExp('^' + val.replace(/\*/g, '.*?') + '$');
    }) : [];
  };

  var namePatterns = parseDebugValue(loadDebugValue());
  function debug(name) {
    var log = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : console.debug || console.log || function () {
      return null;
    };
    return namePatterns.some(function (pattern) {
      return pattern.test(name);
    }) ? log : function () {
      return null;
    };
  }

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

  Object.defineProperty(exports, '__esModule', { value: true });

})));

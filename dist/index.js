'use strict';
var __spreadArrays =
  (this && this.__spreadArrays) ||
  function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];
    return r;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.useDimensions = void 0;
var react_1 = require('react');
var resize_observer_polyfill_1 = __importDefault(require('resize-observer-polyfill'));
var helpers_1 = require('./helpers');
// Export hook
function useDimensions(dependencies) {
  if (dependencies === void 0) {
    dependencies = [];
  }
  var ref = react_1.useRef(null);
  // Keep track of measurements
  var _a = react_1.useState({
      x: 0,
      y: 0,
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      width: 0,
      height: 0,
    }),
    dimensions = _a[0],
    setDimensions = _a[1];
  // Define measure function
  var updateDimensions = react_1.useCallback(
    function () {
      var element = ref.current;
      if (!element) {
        return;
      }
      var rect = element.getBoundingClientRect();
      setDimensions({
        x: rect.left,
        y: rect.top,
        left: rect.left,
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom,
        width: rect.width,
        height: rect.height,
      });
    },
    [ref.current]
  );
  helpers_1.useIsomorphicEffect(function () {
    var element = ref.current;
    if (!element) {
      return;
    }
    // Set initial measurements
    updateDimensions();
    // Observe resizing of element
    var resizeObserver = new resize_observer_polyfill_1.default(function () {
      updateDimensions();
    });
    resizeObserver.observe(element);
    // Cleanup
    return function () {
      resizeObserver.disconnect();
    };
  }, __spreadArrays([ref.current, updateDimensions], dependencies));
  return {
    ref: ref,
    dimensions: dimensions,
    updateDimensions: updateDimensions,
  };
}
exports.useDimensions = useDimensions;
//# sourceMappingURL=index.js.map

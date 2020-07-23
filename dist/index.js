"use strict";
var __spreadArrays =
  (this && this.__spreadArrays) ||
  function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++)
      s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
        r[k] = a[j];
    return r;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDimensions = void 0;
var react_1 = require("react");
var resize_observer_polyfill_1 = __importDefault(
  require("resize-observer-polyfill")
);
// Export hook
function useDimensions(dependencies) {
  if (dependencies === void 0) {
    dependencies = [];
  }
  var _a = react_1.useState(null),
    node = _a[0],
    setNode = _a[1];
  var ref = react_1.useCallback(function (newNode) {
    setNode(newNode);
  }, []);
  // Keep track of measurements
  var _b = react_1.useState({
      x: 0,
      y: 0,
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      width: 0,
      height: 0,
    }),
    dimensions = _b[0],
    setDimensions = _b[1];
  // Define measure function
  var updateDimensions = react_1.useCallback(
    function () {
      if (!node) {
        return;
      }
      var rect = node.getBoundingClientRect();
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
    [node]
  );
  react_1.useLayoutEffect(function () {
    if (!node) {
      return;
    }
    // Set initial measurements
    updateDimensions();
    // Observe resizing of element
    var resizeObserver = new resize_observer_polyfill_1.default(function () {
      updateDimensions();
    });
    resizeObserver.observe(node);
    // Cleanup
    return function () {
      resizeObserver.disconnect();
    };
  }, __spreadArrays([node, updateDimensions], dependencies));
  return {
    ref: ref,
    dimensions: dimensions,
    updateDimensions: updateDimensions,
  };
}
exports.useDimensions = useDimensions;
//# sourceMappingURL=index.js.map

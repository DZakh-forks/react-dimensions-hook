"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useIsomorphicEffect = exports.isServer = void 0;
var react_1 = require("react");
exports.isServer = typeof window === "undefined";
exports.useIsomorphicEffect = exports.isServer
  ? react_1.useEffect
  : react_1.useLayoutEffect;
//# sourceMappingURL=helpers.js.map

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadingFile = LoadingFile;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _styles = require("./styles");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function LoadingFile(_ref) {
  let {
    downloadProgress,
    width,
    height
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [_styles.styles.container, {
      width,
      height
    }]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.ActivityIndicator, {
    size: "large"
  }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: _styles.styles.text
  }, "Loading ", downloadProgress, "%"));
}
//# sourceMappingURL=index.js.map
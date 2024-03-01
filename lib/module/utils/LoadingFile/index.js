import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { styles } from './styles';
export function LoadingFile(_ref) {
  let {
    downloadProgress,
    width,
    height
  } = _ref;
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.container, {
      width,
      height
    }]
  }, /*#__PURE__*/React.createElement(ActivityIndicator, {
    size: "large"
  }), /*#__PURE__*/React.createElement(Text, {
    style: styles.text
  }, "Loading ", downloadProgress, "%"));
}
//# sourceMappingURL=index.js.map
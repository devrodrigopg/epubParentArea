import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { styles } from './styles';
export function OpeningBook(_ref) {
  let {
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
  }, "Opening"));
}
//# sourceMappingURL=index.js.map
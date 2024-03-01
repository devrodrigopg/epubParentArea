"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bookReducer = exports.Types = void 0;
let Types = /*#__PURE__*/function (Types) {
  Types["REGISTER_THEME"] = "REGISTER_THEME";
  Types["REGISTER_THEMES"] = "REGISTER_THEMES";
  Types["SELECT_THEME"] = "SELECT_THEME";
  return Types;
}({});
exports.Types = Types;
const bookReducer = (state, action) => {
  switch (action.type) {
    case Types.REGISTER_THEME:
      return {
        ...state.themes,
        ...action.payload
      };
    default:
      return state;
  }
};
exports.bookReducer = bookReducer;
//# sourceMappingURL=reducers.js.map
export let Types = /*#__PURE__*/function (Types) {
  Types["REGISTER_THEME"] = "REGISTER_THEME";
  Types["REGISTER_THEMES"] = "REGISTER_THEMES";
  Types["SELECT_THEME"] = "SELECT_THEME";
  return Types;
}({});
export const bookReducer = (state, action) => {
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
//# sourceMappingURL=reducers.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useReader = useReader;
var _react = require("react");
var _context = require("../context");
function useReader() {
  const {
    changeFontSize,
    changeFontFamily,
    changeTheme,
    goToLocation,
    goPrevious,
    goNext,
    getLocations,
    getCurrentLocation,
    getMeta,
    search,
    addMark,
    removeMark,
    theme,
    atStart,
    atEnd,
    totalLocations,
    currentLocation,
    progress,
    locations,
    isLoading,
    key,
    searchResults
  } = (0, _react.useContext)(_context.ReaderContext);
  return {
    changeFontSize,
    changeFontFamily,
    changeTheme,
    goToLocation,
    goPrevious,
    goNext,
    getLocations,
    getCurrentLocation,
    getMeta,
    search,
    addMark,
    removeMark,
    theme,
    atStart,
    atEnd,
    totalLocations,
    currentLocation,
    progress,
    locations,
    isLoading,
    key,
    searchResults
  };
}
//# sourceMappingURL=useReader.js.map
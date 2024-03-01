"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReaderContext = void 0;
exports.ReaderProvider = ReaderProvider;
exports.defaultTheme = void 0;
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var Types = /*#__PURE__*/function (Types) {
  Types["CHANGE_THEME"] = "CHANGE_THEME";
  Types["CHANGE_FONT_SIZE"] = "CHANGE_FONT_SIZE";
  Types["CHANGE_FONT_FAMILY"] = "CHANGE_FONT_FAMILY";
  Types["SET_AT_START"] = "SET_AT_START";
  Types["SET_AT_END"] = "SET_AT_END";
  Types["SET_KEY"] = "SET_KEY";
  Types["SET_TOTAL_LOCATIONS"] = "SET_TOTAL_LOCATIONS";
  Types["SET_CURRENT_LOCATION"] = "SET_CURRENT_LOCATION";
  Types["SET_META"] = "SET_META";
  Types["SET_PROGRESS"] = "SET_PROGRESS";
  Types["SET_LOCATIONS"] = "SET_LOCATIONS";
  Types["SET_IS_LOADING"] = "SET_IS_LOADING";
  Types["SET_IS_RENDERING"] = "SET_IS_RENDERING";
  Types["SET_SEARCH_RESULTS"] = "SET_SEARCH_RESULTS";
  return Types;
}(Types || {});
const defaultTheme = {
  'body': {
    background: '#fff'
  },
  'span': {
    color: '#000 !important'
  },
  'p': {
    color: '#000 !important'
  },
  'li': {
    color: '#000 !important'
  },
  'h1': {
    color: '#000 !important'
  },
  'a': {
    'color': '#000 !important',
    'pointer-events': 'auto',
    'cursor': 'pointer'
  },
  '::selection': {
    background: 'lightskyblue'
  }
};
exports.defaultTheme = defaultTheme;
const initialState = {
  theme: defaultTheme,
  fontFamily: 'Helvetica',
  fontSize: '12pt',
  atStart: false,
  atEnd: false,
  key: '',
  totalLocations: 0,
  currentLocation: null,
  meta: {
    cover: '',
    author: '',
    title: '',
    description: '',
    language: '',
    publisher: '',
    rights: ''
  },
  progress: 0,
  locations: [],
  isLoading: true,
  isRendering: true,
  searchResults: []
};
function bookReducer(state, action) {
  switch (action.type) {
    case Types.CHANGE_THEME:
      return {
        ...state,
        theme: action.payload
      };
    case Types.CHANGE_FONT_SIZE:
      return {
        ...state,
        fontSize: action.payload
      };
    case Types.CHANGE_FONT_FAMILY:
      return {
        ...state,
        fontFamily: action.payload
      };
    case Types.SET_AT_START:
      return {
        ...state,
        atStart: action.payload
      };
    case Types.SET_AT_END:
      return {
        ...state,
        atEnd: action.payload
      };
    case Types.SET_KEY:
      return {
        ...state,
        key: action.payload
      };
    case Types.SET_TOTAL_LOCATIONS:
      return {
        ...state,
        totalLocations: action.payload
      };
    case Types.SET_CURRENT_LOCATION:
      return {
        ...state,
        currentLocation: action.payload
      };
    case Types.SET_META:
      return {
        ...state,
        meta: action.payload
      };
    case Types.SET_PROGRESS:
      return {
        ...state,
        progress: action.payload
      };
    case Types.SET_LOCATIONS:
      return {
        ...state,
        locations: action.payload
      };
    case Types.SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case Types.SET_IS_RENDERING:
      return {
        ...state,
        isRendering: action.payload
      };
    case Types.SET_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: action.payload
      };
    default:
      return state;
  }
}
const ReaderContext = /*#__PURE__*/(0, _react.createContext)({
  registerBook: () => {},
  setAtStart: () => {},
  setAtEnd: () => {},
  setTotalLocations: () => {},
  setCurrentLocation: () => {},
  setMeta: () => {},
  setProgress: () => {},
  setLocations: () => {},
  setIsLoading: () => {},
  setIsRendering: () => {},
  goToLocation: () => {},
  goPrevious: () => {},
  goNext: () => {},
  getLocations: () => [],
  getCurrentLocation: () => null,
  getMeta: () => ({
    cover: '',
    author: '',
    title: '',
    description: '',
    language: '',
    publisher: '',
    rights: ''
  }),
  search: () => {},
  changeTheme: () => {},
  changeFontFamily: () => {},
  changeFontSize: () => {},
  addMark: () => {},
  removeMark: () => {},
  setKey: () => {},
  key: '',
  theme: defaultTheme,
  atStart: false,
  atEnd: false,
  totalLocations: 0,
  currentLocation: null,
  meta: {
    cover: '',
    author: '',
    title: '',
    description: '',
    language: '',
    publisher: '',
    rights: ''
  },
  progress: 0,
  locations: [],
  isLoading: true,
  isRendering: true,
  searchResults: [],
  setSearchResults: () => {}
});
exports.ReaderContext = ReaderContext;
function ReaderProvider(_ref) {
  let {
    children
  } = _ref;
  const [state, dispatch] = (0, _react.useReducer)(bookReducer, initialState);
  const book = (0, _react.useRef)(null);
  const registerBook = (0, _react.useCallback)(bookRef => {
    book.current = bookRef;
  }, []);
  const changeTheme = (0, _react.useCallback)(theme => {
    var _book$current;
    (_book$current = book.current) === null || _book$current === void 0 ? void 0 : _book$current.injectJavaScript(`
      rendition.themes.register({ theme: ${JSON.stringify(theme)} });
      rendition.themes.select('theme');
      rendition.views().forEach(view => view.pane ? view.pane.render() : null); true;
    `);
    dispatch({
      type: Types.CHANGE_THEME,
      payload: theme
    });
  }, []);
  const changeFontFamily = (0, _react.useCallback)(fontFamily => {
    var _book$current2;
    (_book$current2 = book.current) === null || _book$current2 === void 0 ? void 0 : _book$current2.injectJavaScript(`
      rendition.themes.font('${fontFamily}');
    `);
    dispatch({
      type: Types.CHANGE_FONT_FAMILY,
      payload: fontFamily
    });
  }, []);
  const changeFontSize = (0, _react.useCallback)(size => {
    var _book$current3;
    (_book$current3 = book.current) === null || _book$current3 === void 0 ? void 0 : _book$current3.injectJavaScript(`
      rendition.themes.fontSize('${size}'); true
    `);
    dispatch({
      type: Types.CHANGE_FONT_SIZE,
      payload: size
    });
  }, []);
  const setAtStart = (0, _react.useCallback)(atStart => {
    dispatch({
      type: Types.SET_AT_START,
      payload: atStart
    });
  }, []);
  const setAtEnd = (0, _react.useCallback)(atEnd => {
    dispatch({
      type: Types.SET_AT_END,
      payload: atEnd
    });
  }, []);
  const setTotalLocations = (0, _react.useCallback)(totalLocations => {
    dispatch({
      type: Types.SET_TOTAL_LOCATIONS,
      payload: totalLocations
    });
  }, []);
  const setCurrentLocation = (0, _react.useCallback)(location => {
    dispatch({
      type: Types.SET_CURRENT_LOCATION,
      payload: location
    });
  }, []);
  const setMeta = (0, _react.useCallback)(meta => {
    dispatch({
      type: Types.SET_META,
      payload: meta
    });
  }, []);
  const setProgress = (0, _react.useCallback)(progress => {
    dispatch({
      type: Types.SET_PROGRESS,
      payload: progress
    });
  }, []);
  const setLocations = (0, _react.useCallback)(locations => {
    dispatch({
      type: Types.SET_LOCATIONS,
      payload: locations
    });
  }, []);
  const setIsLoading = (0, _react.useCallback)(isLoading => {
    dispatch({
      type: Types.SET_IS_LOADING,
      payload: isLoading
    });
  }, []);
  const setIsRendering = (0, _react.useCallback)(isRendering => {
    dispatch({
      type: Types.SET_IS_RENDERING,
      payload: isRendering
    });
  }, []);
  const goToLocation = (0, _react.useCallback)(targetCfi => {
    var _book$current4;
    (_book$current4 = book.current) === null || _book$current4 === void 0 ? void 0 : _book$current4.injectJavaScript(`rendition.display('${targetCfi}'); true`);
  }, []);
  const goPrevious = (0, _react.useCallback)(() => {
    var _book$current5;
    (_book$current5 = book.current) === null || _book$current5 === void 0 ? void 0 : _book$current5.injectJavaScript(`rendition.prev(); true`);
  }, []);
  const goNext = (0, _react.useCallback)(() => {
    var _book$current6;
    (_book$current6 = book.current) === null || _book$current6 === void 0 ? void 0 : _book$current6.injectJavaScript(`rendition.next(); true`);
  }, []);
  const getLocations = (0, _react.useCallback)(() => state.locations, [state.locations]);
  const getCurrentLocation = (0, _react.useCallback)(() => state.currentLocation, [state.currentLocation]);
  const getMeta = (0, _react.useCallback)(() => state.meta, [state.meta]);
  const search = (0, _react.useCallback)(query => {
    var _book$current7;
    (_book$current7 = book.current) === null || _book$current7 === void 0 ? void 0 : _book$current7.injectJavaScript(`
      Promise.all(
        book.spine.spineItems.map((item) => {
          return item.load(book.load.bind(book)).then(() => {
            let results = item.find('${query}'.trim());
            item.unload();
            return Promise.resolve(results);
          });
        })
      ).then((results) =>
        window.ReactNativeWebView.postMessage(
          JSON.stringify({ type: 'onSearch', results: [].concat.apply([], results) })
        )
      ); true
    `);
  }, []);
  const setSearchResults = (0, _react.useCallback)(results => {
    dispatch({
      type: Types.SET_SEARCH_RESULTS,
      payload: results
    });
  }, []);
  const addMark = (0, _react.useCallback)((type, cfiRange, data, callback, className, styles) => {
    var _book$current8;
    const defaultStyles = {
      fill: 'yellow'
    };
    (_book$current8 = book.current) === null || _book$current8 === void 0 ? void 0 : _book$current8.injectJavaScript(`
      rendition.annotations.add('${type}', '${cfiRange}', ${JSON.stringify(data ?? {})}, ${JSON.stringify(callback ? callback() : () => {})}, '${className}', ${JSON.stringify(styles ?? defaultStyles)}); true
    `);
  }, []);
  const removeMark = (0, _react.useCallback)((cfiRange, type) => {
    var _book$current9;
    (_book$current9 = book.current) === null || _book$current9 === void 0 ? void 0 : _book$current9.injectJavaScript(`
      rendition.annotations.remove('${cfiRange}', '${type}'); true
    `);
  }, []);
  const setKey = (0, _react.useCallback)(key => {
    dispatch({
      type: Types.SET_KEY,
      payload: key
    });
  }, []);
  const contextValue = (0, _react.useMemo)(() => ({
    registerBook,
    setAtStart,
    setAtEnd,
    setTotalLocations,
    setCurrentLocation,
    setMeta,
    setProgress,
    setLocations,
    setIsLoading,
    setIsRendering,
    goToLocation,
    goPrevious,
    goNext,
    getLocations,
    getCurrentLocation,
    getMeta,
    search,
    addMark,
    removeMark,
    setKey,
    key: state.key,
    changeTheme,
    changeFontFamily,
    changeFontSize,
    theme: state.theme,
    atStart: state.atStart,
    atEnd: state.atEnd,
    totalLocations: state.totalLocations,
    currentLocation: state.currentLocation,
    meta: state.meta,
    progress: state.progress,
    locations: state.locations,
    isLoading: state.isLoading,
    isRendering: state.isRendering,
    searchResults: state.searchResults,
    setSearchResults
  }), [addMark, changeFontFamily, changeFontSize, changeTheme, getCurrentLocation, getMeta, getLocations, goNext, goPrevious, goToLocation, registerBook, removeMark, search, setAtEnd, setAtStart, setCurrentLocation, setMeta, setIsLoading, setIsRendering, setKey, setLocations, setProgress, setSearchResults, setTotalLocations, state.atEnd, state.atStart, state.currentLocation, state.meta, state.isLoading, state.isRendering, state.key, state.locations, state.progress, state.searchResults, state.theme, state.totalLocations]);
  return /*#__PURE__*/_react.default.createElement(ReaderContext.Provider, {
    value: contextValue
  }, children);
}
//# sourceMappingURL=context.js.map
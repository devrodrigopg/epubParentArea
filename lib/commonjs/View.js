"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.View = View;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeGestureHandler = require("react-native-gesture-handler");
var _reactNativeWebview = require("react-native-webview");
var _context = require("./context");
var _OpeningBook = require("./utils/OpeningBook");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function View(_ref) {
  let {
    templateUri,
    allowedUris,
    onStarted = () => {},
    onReady = () => {},
    onDisplayError = () => {},
    onResized = () => {},
    onLocationChange = () => {},
    onRendered = () => {},
    onSearch = () => {},
    onLocationsReady = () => {},
    onSelected = () => {},
    onMarkPressed = () => {},
    onOrientationChange = () => {},
    onLayout = () => {},
    onNavigationLoaded = () => {},
    onBeginning = () => {},
    onFinish = () => {},
    onPress = () => {},
    onDoublePress = () => {},
    width,
    height,
    initialLocation,
    enableSwipe = true,
    onSwipeLeft = () => {},
    onSwipeRight = () => {},
    defaultTheme = _context.defaultTheme,
    renderOpeningBookComponent = () => /*#__PURE__*/_react.default.createElement(_OpeningBook.OpeningBook, {
      width: width,
      height: height
    })
  } = _ref;
  const {
    registerBook,
    setTotalLocations,
    setCurrentLocation,
    setMeta,
    setProgress,
    setLocations,
    setAtStart,
    setAtEnd,
    goNext,
    goPrevious,
    isRendering,
    setIsRendering,
    goToLocation,
    changeTheme,
    setKey,
    setSearchResults,
    theme
  } = (0, _react.useContext)(_context.ReaderContext);
  const [renderedOnce, setRenderedOnce] = (0, _react.useState)(false);
  const updateSource = () => {
    setRenderedOnce(true);
  };
  const book = (0, _react.useRef)(null);
  const onMessage = event => {
    const parsedEvent = JSON.parse(event.nativeEvent.data);
    const {
      type
    } = parsedEvent;
    delete parsedEvent.type;
    if (type === 'meta') {
      const {
        metadata
      } = parsedEvent;
      setMeta(metadata);
    }
    if (type === 'onStarted') {
      setIsRendering(true);
      changeTheme(defaultTheme);
      return onStarted();
    }
    if (type === 'onReady') {
      const {
        totalLocations,
        currentLocation,
        progress
      } = parsedEvent;
      setIsRendering(false);
      setTotalLocations(totalLocations);
      setCurrentLocation(currentLocation);
      setProgress(progress);
      if (initialLocation) {
        goToLocation(initialLocation);
      }
      return onReady(totalLocations, currentLocation, progress);
    }
    if (type === 'onDisplayError') {
      const {
        reason
      } = parsedEvent;
      setIsRendering(false);
      return onDisplayError(reason);
    }
    if (type === 'onResized') {
      const {
        layout
      } = parsedEvent;
      return onResized(layout);
    }
    if (type === 'onLocationChange') {
      const {
        totalLocations,
        currentLocation,
        progress
      } = parsedEvent;
      setTotalLocations(totalLocations);
      setCurrentLocation(currentLocation);
      setProgress(progress);
      if (currentLocation.atStart) setAtStart(true);else if (currentLocation.atEnd) setAtEnd(true);else {
        setAtStart(false);
        setAtEnd(false);
      }
      return onLocationChange(totalLocations, currentLocation, progress);
    }
    if (type === 'onSearch') {
      const {
        results
      } = parsedEvent;
      setSearchResults(results);
      return onSearch(results);
    }
    if (type === 'onLocationsReady') {
      const {
        epubKey
      } = parsedEvent;
      setLocations(parsedEvent.locations);
      setKey(epubKey);
      return onLocationsReady(epubKey, parsedEvent.locations);
    }
    if (type === 'onSelected') {
      const {
        cfiRange,
        text
      } = parsedEvent;
      return onSelected(text, cfiRange);
    }
    if (type === 'onMarkPressed') {
      const {
        cfiRange,
        text
      } = parsedEvent;
      return onMarkPressed(cfiRange, text);
    }
    if (type === 'onOrientationChange') {
      const {
        orientation
      } = parsedEvent;
      return onOrientationChange(orientation);
    }
    if (type === 'onBeginning') {
      setAtStart(true);
      return onBeginning();
    }
    if (type === 'onFinish') {
      setAtEnd(true);
      return onFinish();
    }
    if (type === 'onRendered') {
      const {
        section,
        currentSection
      } = parsedEvent;
      return onRendered(section, currentSection);
    }
    if (type === 'onLayout') {
      const {
        layout
      } = parsedEvent;
      return onLayout(layout);
    }
    if (type === 'onNavigationLoaded') {
      const {
        toc
      } = parsedEvent;
      return onNavigationLoaded(toc);
    }
    return () => {};
  };
  (0, _react.useEffect)(() => {
    if (book.current) registerBook(book.current);
  }, [registerBook]);
  let lastTap = null;
  let timer;
  const handleDoublePress = () => {
    if (lastTap) {
      onDoublePress();
      clearTimeout(timer);
      lastTap = null;
    } else {
      lastTap = Date.now();
      timer = setTimeout(() => {
        onPress();
        lastTap = null;
        clearTimeout(timer);
      }, 300);
    }
  };
  return /*#__PURE__*/_react.default.createElement(_reactNativeGestureHandler.GestureHandlerRootView, {
    style: {
      width,
      height
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNativeGestureHandler.FlingGestureHandler, {
    direction: _reactNative.I18nManager.isRTL ? _reactNativeGestureHandler.Directions.LEFT : _reactNativeGestureHandler.Directions.RIGHT,
    onHandlerStateChange: _ref2 => {
      let {
        nativeEvent
      } = _ref2;
      if (nativeEvent.state === _reactNativeGestureHandler.State.ACTIVE && enableSwipe) {
        goPrevious();
        onSwipeRight();
      }
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNativeGestureHandler.FlingGestureHandler, {
    direction: _reactNative.I18nManager.isRTL ? _reactNativeGestureHandler.Directions.RIGHT : _reactNativeGestureHandler.Directions.LEFT,
    onHandlerStateChange: _ref3 => {
      let {
        nativeEvent
      } = _ref3;
      if (nativeEvent.state === _reactNativeGestureHandler.State.ACTIVE && enableSwipe) {
        goNext();
        onSwipeLeft();
      }
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center'
    }
  }, isRendering && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      zIndex: 2
    }
  }, renderOpeningBookComponent()), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableWithoutFeedback, {
    onPress: handleDoublePress
  }, /*#__PURE__*/_react.default.createElement(_reactNativeWebview.WebView, {
    ref: book,
    source: renderedOnce ? {
      uri: templateUri
    } : undefined,
    showsVerticalScrollIndicator: false,
    javaScriptEnabled: true,
    originWhitelist: ['*'],
    scrollEnabled: false,
    mixedContentMode: "compatibility",
    onMessage: onMessage,
    allowingReadAccessToURL: allowedUris,
    allowUniversalAccessFromFileURLs: true,
    allowFileAccessFromFileURLs: true,
    allowFileAccess: true,
    onLoad: updateSource,
    onShouldStartLoadWithRequest: request => {
      if (!isRendering && request.mainDocumentURL && request.url !== request.mainDocumentURL) {
        goToLocation(request.url.replace(request.mainDocumentURL, ''));
      }
      return true;
    },
    style: {
      width,
      backgroundColor: theme.body.background,
      height
    }
  }))))));
}
//# sourceMappingURL=View.js.map
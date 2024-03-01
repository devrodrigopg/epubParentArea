import React, { useContext, useEffect, useRef, useState } from 'react';
import { TouchableWithoutFeedback, I18nManager, View as RNView } from 'react-native';
import { Directions, FlingGestureHandler, GestureHandlerRootView, State } from 'react-native-gesture-handler';
import { WebView } from 'react-native-webview';
import { defaultTheme as initialTheme, ReaderContext } from './context';
import { OpeningBook } from './utils/OpeningBook';
export function View(_ref) {
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
    defaultTheme = initialTheme,
    renderOpeningBookComponent = () => /*#__PURE__*/React.createElement(OpeningBook, {
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
  } = useContext(ReaderContext);
  const [renderedOnce, setRenderedOnce] = useState(false);
  const updateSource = () => {
    setRenderedOnce(true);
  };
  const book = useRef(null);
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
  useEffect(() => {
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
  return /*#__PURE__*/React.createElement(GestureHandlerRootView, {
    style: {
      width,
      height
    }
  }, /*#__PURE__*/React.createElement(FlingGestureHandler, {
    direction: I18nManager.isRTL ? Directions.LEFT : Directions.RIGHT,
    onHandlerStateChange: _ref2 => {
      let {
        nativeEvent
      } = _ref2;
      if (nativeEvent.state === State.ACTIVE && enableSwipe) {
        goPrevious();
        onSwipeRight();
      }
    }
  }, /*#__PURE__*/React.createElement(FlingGestureHandler, {
    direction: I18nManager.isRTL ? Directions.RIGHT : Directions.LEFT,
    onHandlerStateChange: _ref3 => {
      let {
        nativeEvent
      } = _ref3;
      if (nativeEvent.state === State.ACTIVE && enableSwipe) {
        goNext();
        onSwipeLeft();
      }
    }
  }, /*#__PURE__*/React.createElement(RNView, {
    style: {
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center'
    }
  }, isRendering && /*#__PURE__*/React.createElement(RNView, {
    style: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      zIndex: 2
    }
  }, renderOpeningBookComponent()), /*#__PURE__*/React.createElement(TouchableWithoutFeedback, {
    onPress: handleDoublePress
  }, /*#__PURE__*/React.createElement(WebView, {
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
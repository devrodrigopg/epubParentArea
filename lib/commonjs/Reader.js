"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Reader = Reader;
var _react = _interopRequireWildcard(require("react"));
var FileSystem = _interopRequireWildcard(require("expo-file-system"));
var _LoadingFile = require("./utils/LoadingFile");
var _View = require("./View");
var _useInjectWebviewVariables = require("./hooks/useInjectWebviewVariables");
var _context = require("./context");
var _isURL = require("./utils/isURL");
var _getSourceType = require("./utils/getSourceType");
var _getPathname = require("./utils/getPathname");
var _sourceType = require("./utils/enums/source-type.enum");
var _isFsUri = require("./utils/isFsUri");
var _jszip = _interopRequireDefault(require("./jszip"));
var _epubjs = _interopRequireDefault(require("./epubjs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
// ...
function Reader(_ref) {
  let {
    src,
    width,
    height,
    defaultTheme = _context.defaultTheme,
    initialLocations,
    renderLoadingFileComponent = props => /*#__PURE__*/_react.default.createElement(_LoadingFile.LoadingFile, _extends({}, props, {
      width: width,
      height: height
    })),
    fileSystem: useFileSystem,
    ...rest
  } = _ref;
  const {
    downloadFile,
    size: fileSize,
    progress: downloadProgress,
    success: downloadSuccess,
    error: downloadError
  } = useFileSystem();
  const {
    setIsLoading,
    isLoading
  } = (0, _react.useContext)(_context.ReaderContext);
  const {
    injectWebVieWVariables
  } = (0, _useInjectWebviewVariables.useInjectWebVieWVariables)();
  const [template, setTemplate] = (0, _react.useState)(null);
  const [templateUrl, setTemplateUrl] = (0, _react.useState)(null);
  const [allowedUris, setAllowedUris] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    (async () => {
      setIsLoading(true);
      const jszipFileUri = `${FileSystem.documentDirectory}jszip.min.js`;
      const epubjsFileUri = `${FileSystem.documentDirectory}epub.min.js`;
      try {
        await FileSystem.writeAsStringAsync(jszipFileUri, _jszip.default);
      } catch (e) {
        throw new Error('failed to write jszip js file');
      }
      try {
        await FileSystem.writeAsStringAsync(epubjsFileUri, _epubjs.default);
      } catch (e) {
        throw new Error('failed to write epubjs js file');
      }
      setAllowedUris(`${jszipFileUri},${epubjsFileUri}`);
      if (src) {
        const sourceType = (0, _getSourceType.getSourceType)(src);
        const isExternalSource = (0, _isURL.isURL)(src);
        const isSrcInFs = (0, _isFsUri.isFsUri)(src);
        if (!sourceType) {
          throw new Error(`Invalid source type: ${src}`);
        }
        if (!isExternalSource) {
          if (isSrcInFs) {
            setAllowedUris(`${src}${jszipFileUri},${epubjsFileUri}`);
          }
          if (sourceType === _sourceType.SourceType.BASE64) {
            setTemplate(injectWebVieWVariables({
              jszip: jszipFileUri,
              epubjs: epubjsFileUri,
              type: _sourceType.SourceType.BASE64,
              book: src,
              theme: defaultTheme,
              locations: initialLocations,
              enableSelection: true
            }));
            setIsLoading(false);
          } else {
            setTemplate(injectWebVieWVariables({
              jszip: jszipFileUri,
              epubjs: epubjsFileUri,
              type: _sourceType.SourceType.BINARY,
              book: src,
              theme: defaultTheme,
              locations: initialLocations,
              enableSelection: true
            }));
            setIsLoading(false);
          }
        }
        if (isExternalSource) {
          const sourceName = (0, _getPathname.getSourceName)(src);
          if (!sourceName) {
            throw new Error(`Invalid source name: ${src}`);
          }
          if (sourceType === _sourceType.SourceType.OPF || sourceType === _sourceType.SourceType.EPUB) {
            setTemplate(injectWebVieWVariables({
              jszip: jszipFileUri,
              epubjs: epubjsFileUri,
              type: sourceType,
              book: src,
              theme: defaultTheme,
              locations: initialLocations,
              enableSelection: true
            }));
            setIsLoading(false);
          } else {
            const {
              uri: bookFileUri
            } = await downloadFile(src, sourceName);
            if (!bookFileUri) throw new Error("Couldn't download book");
            setAllowedUris(`${bookFileUri},${jszipFileUri},${epubjsFileUri}`);
            setTemplate(injectWebVieWVariables({
              jszip: jszipFileUri,
              epubjs: epubjsFileUri,
              type: sourceType,
              book: bookFileUri,
              theme: defaultTheme,
              locations: initialLocations,
              enableSelection: true
            }));
            setIsLoading(false);
          }
        }
      }
    })();
  }, [defaultTheme, downloadFile, initialLocations, injectWebVieWVariables, setIsLoading, src]);
  (0, _react.useEffect)(() => {
    const saveTemplateFileToDoc = async () => {
      try {
        if (template) {
          const content = template;
          const fileUri = `${FileSystem.documentDirectory}index.html`;
          await FileSystem.writeAsStringAsync(fileUri, content);
          setTemplateUrl(fileUri);
        }
      } catch (error) {
        throw new Error('Error saving index.html file:');
      }
    };
    if (template) {
      saveTemplateFileToDoc();
    }
  }, [template]);
  if (isLoading) {
    return renderLoadingFileComponent({
      fileSize,
      downloadProgress,
      downloadSuccess,
      downloadError
    });
  }
  if (!templateUrl || !allowedUris) {
    return renderLoadingFileComponent({
      fileSize,
      downloadProgress,
      downloadSuccess,
      downloadError
    });
  }
  return /*#__PURE__*/_react.default.createElement(_View.View, _extends({
    templateUri: templateUrl,
    allowedUris: allowedUris,
    width: width,
    height: height
  }, rest));
}
//# sourceMappingURL=Reader.js.map
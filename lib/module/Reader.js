function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { useContext, useEffect, useState } from 'react';
import * as FileSystem from 'expo-file-system';
import { LoadingFile } from './utils/LoadingFile';
import { View } from './View';
import { useInjectWebVieWVariables } from './hooks/useInjectWebviewVariables';
import { ReaderContext, defaultTheme as initialTheme } from './context';
import { isURL } from './utils/isURL';
import { getSourceType } from './utils/getSourceType';
import { getSourceName } from './utils/getPathname';
import { SourceType } from './utils/enums/source-type.enum';
import { isFsUri } from './utils/isFsUri';
import jszip from './jszip';
import epubjs from './epubjs';

// ...
export function Reader(_ref) {
  let {
    src,
    width,
    height,
    defaultTheme = initialTheme,
    initialLocations,
    renderLoadingFileComponent = props => /*#__PURE__*/React.createElement(LoadingFile, _extends({}, props, {
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
  } = useContext(ReaderContext);
  const {
    injectWebVieWVariables
  } = useInjectWebVieWVariables();
  const [template, setTemplate] = useState(null);
  const [templateUrl, setTemplateUrl] = useState(null);
  const [allowedUris, setAllowedUris] = useState(null);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const jszipFileUri = `${FileSystem.documentDirectory}jszip.min.js`;
      const epubjsFileUri = `${FileSystem.documentDirectory}epub.min.js`;
      try {
        await FileSystem.writeAsStringAsync(jszipFileUri, jszip);
      } catch (e) {
        throw new Error('failed to write jszip js file');
      }
      try {
        await FileSystem.writeAsStringAsync(epubjsFileUri, epubjs);
      } catch (e) {
        throw new Error('failed to write epubjs js file');
      }
      setAllowedUris(`${jszipFileUri},${epubjsFileUri}`);
      if (src) {
        const sourceType = getSourceType(src);
        const isExternalSource = isURL(src);
        const isSrcInFs = isFsUri(src);
        if (!sourceType) {
          throw new Error(`Invalid source type: ${src}`);
        }
        if (!isExternalSource) {
          if (isSrcInFs) {
            setAllowedUris(`${src}${jszipFileUri},${epubjsFileUri}`);
          }
          if (sourceType === SourceType.BASE64) {
            setTemplate(injectWebVieWVariables({
              jszip: jszipFileUri,
              epubjs: epubjsFileUri,
              type: SourceType.BASE64,
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
              type: SourceType.BINARY,
              book: src,
              theme: defaultTheme,
              locations: initialLocations,
              enableSelection: true
            }));
            setIsLoading(false);
          }
        }
        if (isExternalSource) {
          const sourceName = getSourceName(src);
          if (!sourceName) {
            throw new Error(`Invalid source name: ${src}`);
          }
          if (sourceType === SourceType.OPF || sourceType === SourceType.EPUB) {
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
  useEffect(() => {
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
  return /*#__PURE__*/React.createElement(View, _extends({
    templateUri: templateUrl,
    allowedUris: allowedUris,
    width: width,
    height: height
  }, rest));
}
//# sourceMappingURL=Reader.js.map
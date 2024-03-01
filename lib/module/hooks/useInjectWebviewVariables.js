import { useCallback } from 'react';
import template from '../template';
export function useInjectWebVieWVariables() {
  const injectWebVieWVariables = useCallback(_ref => {
    let {
      jszip,
      epubjs,
      type,
      book,
      theme,
      enableSelection,
      locations
    } = _ref;
    return template.replace(/<script id="jszip"><\/script>/, `<script src="${jszip}"></script>`).replace(/<script id="epubjs"><\/script>/, `<script src="${epubjs}"></script>`).replace(/const type = window.type;/, `const type = '${type}';`).replace(/const file = window.book;/, `const file = '${book}';`).replace(/const theme = window.theme;/, `const theme = ${JSON.stringify(theme)};`).replace(/const initialLocations = window.locations;/, `const initialLocations = ${locations};`).replace(/const enableSelection = window.enable_selection;/, `const enableSelection = ${enableSelection};`);
  }, []);
  return {
    injectWebVieWVariables
  };
}
//# sourceMappingURL=useInjectWebviewVariables.js.map
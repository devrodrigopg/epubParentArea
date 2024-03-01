import type { Theme, ePubCfi } from '../types';
import type { SourceType } from '../utils/enums/source-type.enum';
export declare function useInjectWebVieWVariables(): {
    injectWebVieWVariables: ({ jszip, epubjs, type, book, theme, enableSelection, locations, }: {
        jszip: string;
        epubjs: string;
        type: SourceType;
        book: string;
        theme: Theme;
        enableSelection: boolean;
        locations?: string[] | undefined;
    }) => string;
};

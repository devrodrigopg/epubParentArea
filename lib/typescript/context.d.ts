import React from 'react';
import type WebView from 'react-native-webview';
import type { ePubCfi, FontSize, Location, Mark, SearchResult, Theme } from './types';
export declare const defaultTheme: Theme;
export interface ReaderContextProps {
    registerBook: (bookRef: WebView) => void;
    setAtStart: (atStart: boolean) => void;
    setAtEnd: (atEnd: boolean) => void;
    setTotalLocations: (totalLocations: number) => void;
    setCurrentLocation: (location: Location) => void;
    setMeta: (meta: {
        cover: string | ArrayBuffer | null | undefined;
        author: string;
        title: string;
        description: string;
        language: string;
        publisher: string;
        rights: string;
    }) => void;
    setProgress: (progress: number) => void;
    setLocations: (locations: ePubCfi[]) => void;
    setIsLoading: (isLoading: boolean) => void;
    setIsRendering: (isRendering: boolean) => void;
    /**
     * Go to specific location in the book
     * @param {ePubCfi} target {@link ePubCfi}
     */
    goToLocation: (cfi: ePubCfi) => void;
    /**
     * Go to previous page in the book
     */
    goPrevious: () => void;
    /**
     * Go to next page in the book
     */
    goNext: () => void;
    /**
     * Get the total locations of the book
     */
    getLocations: () => ePubCfi[];
    /**
     * Returns the current location of the book
     * @returns {Location} {@link Location}
     */
    getCurrentLocation: () => Location | null;
    /**
     * Returns an object containing the book's metadata
     * @returns { cover: string | ArrayBuffer | null | undefined, author: string, title: string, description: string, language: string, publisher: string, rights: string, }
     */
    getMeta: () => {
        cover: string | ArrayBuffer | null | undefined;
        author: string;
        title: string;
        description: string;
        language: string;
        publisher: string;
        rights: string;
    };
    /**
     * Search for a specific text in the book
     * @param {string} query {@link string} text to search
     */
    search: (query: string) => void;
    /**
     * @param theme {@link Theme}
     * @description Theme object.
     * @example
     * ```
     * selectTheme({ body: { background: '#fff' } });
     * ```
     */
    changeTheme: (theme: Theme) => void;
    /**
     * Change font size of all elements in the book
     * @param font
     * @see https://www.w3schools.com/cssref/css_websafe_fonts.asp
     */
    changeFontFamily: (fontFamily: string) => void;
    /**
     * Change font size of all elements in the book
     * @param {FontSize} size {@link FontSize}
     */
    changeFontSize: (size: FontSize) => void;
    /**
     * Add Mark a specific cfi in the book
     */
    addMark: (type: Mark, cfiRange: ePubCfi, data?: any, callback?: () => void, className?: string, styles?: any) => void;
    /**
     * Remove Mark a specific cfi in the book
     */
    removeMark: (cfiRange: ePubCfi, type: Mark) => void;
    setKey: (key: string) => void;
    /**
     * Works like a unique id for book
     */
    key: string;
    /**
     * A theme object.
     */
    theme: Theme;
    /**
     * Indicates if you are at the beginning of the book
     * @returns {boolean} {@link boolean}
     */
    atStart: boolean;
    /**
     * Indicates if you are at the end of the book
     * @returns {boolean} {@link boolean}
     */
    atEnd: boolean;
    /**
     * The total number of locations
     */
    totalLocations: number;
    /**
     * The current location of the book
     */
    currentLocation: Location | null;
    /**
     * An object containing the book's metadata
     * { cover: string | ArrayBuffer | null | undefined, author: string, title: string, description: string, language: string, publisher: string, rights: string, }
     */
    meta: {
        cover: string | ArrayBuffer | null | undefined;
        author: string;
        title: string;
        description: string;
        language: string;
        publisher: string;
        rights: string;
    };
    /**
     * The progress of the book
     * @returns {number} {@link number}
     */
    progress: number;
    locations: ePubCfi[];
    /**
     * Indicates if the book is loading
     * @returns {boolean} {@link boolean}
     */
    isLoading: boolean;
    /**
     * Indicates if the book is rendering
     * @returns {boolean} {@link boolean}
     */
    isRendering: boolean;
    /**
     * Search results
     * @returns {SearchResult[]} {@link SearchResult[]}
     */
    searchResults: SearchResult[];
    setSearchResults: (results: SearchResult[]) => void;
}
declare const ReaderContext: React.Context<ReaderContextProps>;
declare function ReaderProvider({ children }: {
    children: React.ReactNode;
}): JSX.Element;
export { ReaderProvider, ReaderContext };

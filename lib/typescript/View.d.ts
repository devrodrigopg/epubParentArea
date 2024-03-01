/// <reference types="react" />
import type { ReaderProps } from './types';
export type ViewProps = Omit<ReaderProps, 'src' | 'fileSystem'> & {
    templateUri: string;
    allowedUris: string;
};
export declare function View({ templateUri, allowedUris, onStarted, onReady, onDisplayError, onResized, onLocationChange, onRendered, onSearch, onLocationsReady, onSelected, onMarkPressed, onOrientationChange, onLayout, onNavigationLoaded, onBeginning, onFinish, onPress, onDoublePress, width, height, initialLocation, enableSwipe, onSwipeLeft, onSwipeRight, defaultTheme, renderOpeningBookComponent, }: ViewProps): JSX.Element;

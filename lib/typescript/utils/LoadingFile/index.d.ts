/// <reference types="react" />
import type { LoadingFileProps, ReaderProps } from 'src/types';
export declare function LoadingFile({ downloadProgress, width, height, }: LoadingFileProps & Pick<ReaderProps, 'width' | 'height'>): JSX.Element;

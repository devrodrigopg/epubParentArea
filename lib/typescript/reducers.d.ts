import type { Theme, Themes } from './types';
export type InitialStateType = {
    themes: Themes;
    activeTheme: string;
};
type ActionMap<M extends {
    [index: string]: any;
}> = {
    [Key in keyof M]: M[Key] extends undefined ? {
        type: Key;
    } : {
        type: Key;
        payload: M[Key];
    };
};
export declare enum Types {
    REGISTER_THEME = "REGISTER_THEME",
    REGISTER_THEMES = "REGISTER_THEMES",
    SELECT_THEME = "SELECT_THEME"
}
type BookPayload = {
    [Types.REGISTER_THEME]: Theme;
    [Types.REGISTER_THEMES]: Themes;
    [Types.SELECT_THEME]: string;
};
export type BookActions = ActionMap<BookPayload>[keyof ActionMap<BookPayload>];
export declare const bookReducer: (state: InitialStateType, action: BookActions) => InitialStateType | {
    [x: string]: Theme | {
        [key: string]: string;
    };
};
export {};

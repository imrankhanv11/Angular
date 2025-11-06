import { createReducer, on } from "@ngrx/store";
import { BookType } from "../../types/bookType";
import * as BookActions from './book.actions';

export interface BookState {
    books: BookType[],
    loading: boolean,
    error: string | null
}

export const initialState: BookState = {
    books: [],
    loading: false,
    error: null
}

export const bookReducer = createReducer(
    initialState,

    on(BookActions.loadBooks, state => ({ ...state, loading: true })),
    on(BookActions.loadBooksSuccess, (state, { books }) => ({
        ...state,
        loading: false,
        books: books,
    })),
    on(BookActions.loadBooksFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),
)
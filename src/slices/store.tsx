import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
    type TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook
} from 'react-redux';
import filtersReducer from './filtersSlice';
import cardsReducer from './cardsSlice';

export const rootReducer = combineReducers({
    cards: cardsReducer,
    filters: filtersReducer
});

export const store = configureStore({
    reducer: rootReducer,
    devTools: true
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;

import { createSlice } from '@reduxjs/toolkit';

export type TTag = 'хвойное' | 'лиственное';
export type TActiveFilter = 'все' | 'избранные';

interface FiltersState {
    activeFilter: TActiveFilter;
    tags: TTag[];
}

const initialState: FiltersState = {
    activeFilter: 'все',
    tags: []
};

export const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        toggleFilter: (state, action) => {
            const newState = action.payload;
            state.activeFilter = newState;
        },
        addTags: (state, action) => {
            const newTags = [...state.tags, action.payload as TTag];
            state.tags = newTags;
        },
        deleteTags: (state, action) => {
            const newTags = state.tags.filter(
                (it) => it !== (action.payload as string)
            );
            state.tags = newTags;
        },
        cleanFilters: () => {
            return initialState;
        }
    },
    selectors: {
        activeFilter: (state) => state.activeFilter,
        tags: (state) => state.tags
    }
});

export const { toggleFilter, addTags, deleteTags, cleanFilters } =
    filtersSlice.actions;
export const filtersSelectors = filtersSlice.selectors;
export default filtersSlice.reducer;

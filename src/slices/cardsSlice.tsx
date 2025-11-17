import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCardsApi, getCardByIdApi } from '../api/test-pj-api';
import { TCard } from '../components/ui/Card/Card';

export interface UsersCardsState {
    isLoading: boolean;
    cards: TCard[] | null;
    previewCard: TCard | null;
    error: string | null;
    likedCards: TCard[];
}

export const initialState: UsersCardsState = {
    isLoading: false,
    cards: null,
    previewCard: null,
    error: null,
    likedCards: []
};

export const getCardsThunk = createAsyncThunk<TCard[]>(
    'cards/getCards',
    getCardsApi
);

export const getCardsByIdThunk = createAsyncThunk<TCard, string>(
    'cards/getCardById',
    async (id: string) => {
        const response = await getCardByIdApi(id);
        return response;
    }
);

export const cardsSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        deleteCard: (state, action) => {
            const newCards = Array.isArray(state.cards)
                ? state.cards?.filter((it) => it.id !== action.payload)
                : state.cards;
            state.cards = newCards;
        },
        likeCard: (state, action) => {
            const cardId = action.payload;
            const cardToLike = state.cards?.find((card) => card.id === cardId);

            // Если карточка не найдена или уже в избранных — ничего не делаем
            if (
                !cardToLike ||
                state.likedCards?.some((card) => card.id === cardId)
            ) {
                return;
            }

            state.likedCards = [...state.likedCards, cardToLike];
        },
        dislikeCard: (state, action) => {
            const cardId = action.payload;

            // Если карточка не найдена — ничего не делаем
            if (!state.likedCards.some((card) => card.id === cardId)) {
                return;
            }

            state.likedCards = state.likedCards.filter(
                (card) => card.id !== cardId
            );
        },
        createCard: (state, action) => {
            const newCards = Array.isArray(state.cards)
                ? [...state.cards, action.payload as TCard]
                : state.cards;
            state.cards = newCards;
        },
        setPreviewCard: (state, action) => {
            const preview = state.cards?.find(
                (card) => card.id === action.payload
            );
            if (preview) {
                state.previewCard = preview;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCardsThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getCardsThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error =
                    action.error.message || 'ошибка при получении карточек';
            })
            .addCase(getCardsThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cards = action.payload;
            })
            .addCase(getCardsByIdThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getCardsByIdThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error =
                    action.error.message ||
                    'ошибка при получении карточки по ид';
            })
            .addCase(getCardsByIdThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.previewCard = action.payload;
            });
    },
    selectors: {
        cards: (state) => state.cards,
        previewCard: (state) => state.previewCard,
        isLoading: (state) => state.isLoading,
        error: (state) => state.error,
        likedCards: (state) => state.likedCards
    }
});

export const cardsSelectors = cardsSlice.selectors;
export const { deleteCard, createCard, likeCard, dislikeCard, setPreviewCard } =
    cardsSlice.actions;
export default cardsSlice.reducer;

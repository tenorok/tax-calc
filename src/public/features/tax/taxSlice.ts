import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { type TScale } from '../../const/scales';

export interface ITaxState {
    scale: TScale;
    income: string;
}

const initialState: ITaxState = {
    scale: 'progressive2024',
    income: '',
};

export const taxSlice = createSlice({
    name: 'tax',
    initialState,
    reducers: {
        changeScale: (state, action: PayloadAction<TScale>) => {
            state.scale = action.payload;
        },
    },
});

export const { changeScale } = taxSlice.actions;

export default taxSlice.reducer;

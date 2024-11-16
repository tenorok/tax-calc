import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { type TScale } from '../../const/scales';
import { lsTextareaValueKey } from '../../const/localStorage';

export interface ITaxState {
    scale: TScale;
    income: string;
}

const initialState: ITaxState = {
    scale: 'progressive2024',
    income: localStorage.getItem(lsTextareaValueKey) ?? '',
};

export const taxSlice = createSlice({
    name: 'tax',
    initialState,
    reducers: {
        changeScale: (state, action: PayloadAction<TScale>) => {
            state.scale = action.payload;
        },
        changeIncome: (state, action: PayloadAction<string>) => {
            state.income = action.payload;
        },
    },
});

export const { changeScale, changeIncome } = taxSlice.actions;

export default taxSlice.reducer;

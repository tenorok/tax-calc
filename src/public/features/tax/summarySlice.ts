import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface ISummaryState {
    cumulativeClearIncome: number;
    cumulativeTaxValue: number;
    averageTaxPercent: number;
}

const initialState: ISummaryState = {
    cumulativeClearIncome: 0,
    cumulativeTaxValue: 0,
    averageTaxPercent: 0,
};

export const summarySlice = createSlice({
    name: 'summary',
    initialState,
    reducers: {
        changeSummary: (state, { payload }: PayloadAction<ISummaryState>) => {
            state.cumulativeClearIncome = payload.cumulativeClearIncome;
            state.cumulativeTaxValue = payload.cumulativeTaxValue;
            state.averageTaxPercent = payload.averageTaxPercent;
        },
    },
});

export const { changeSummary } = summarySlice.actions;

export default summarySlice.reducer;

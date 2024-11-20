import { configureStore } from '@reduxjs/toolkit';
import taxReducer from './features/tax/taxSlice';
import summaryReducer from './features/tax/summarySlice';

export const store = configureStore({
    reducer: {
        tax: taxReducer,
        summary: summaryReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

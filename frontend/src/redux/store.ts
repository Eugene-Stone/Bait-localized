import { configureStore } from '@reduxjs/toolkit';
import commentReducer from './slices/commentSlice';
import reviewReducer from './slices/reviewSlice';

export const store = configureStore({
	reducer: {
		commentReducer: commentReducer,
		reviewReducer: reviewReducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

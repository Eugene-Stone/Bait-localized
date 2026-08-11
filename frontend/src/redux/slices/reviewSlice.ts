import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type ReviewState = {
	statusEditableReview: boolean;
	reviewEditableId: string | null;
};
const initialState: ReviewState = {
	statusEditableReview: false,
	reviewEditableId: null,
};

export const reviewSlice = createSlice({
	name: 'review',
	initialState,

	reducers: {
		addReviewEditableId: (state, action: PayloadAction<string>) => {
			state.reviewEditableId = action.payload;
			state.statusEditableReview = true;
		},

		clearReviewEditableId: (state) => {
			state.reviewEditableId = null;
			state.statusEditableReview = false;
		},
	},
});

export const { addReviewEditableId, clearReviewEditableId } = reviewSlice.actions;
export default reviewSlice.reducer;

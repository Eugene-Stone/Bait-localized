import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type CommentState = {
	statusEditableComment: boolean;
	commentEditableId: string | null;
};
const initialState: CommentState = {
	statusEditableComment: false,
	commentEditableId: null,
};

export const commentSlice = createSlice({
	name: 'comment',
	initialState,

	reducers: {
		addCommentEditableId: (state, action: PayloadAction<string>) => {
			state.commentEditableId = action.payload;
			state.statusEditableComment = true;
		},

		clearCommentEditableId: (state) => {
			state.commentEditableId = null;
			state.statusEditableComment = false;
		},
	},
});

export const { addCommentEditableId, clearCommentEditableId } = commentSlice.actions;
export default commentSlice.reducer;

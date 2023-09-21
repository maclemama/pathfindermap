import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
	modalContent: null,
};

export const modalSlice = createSlice({
	name: "modal",
	initialState: INITIAL_STATE,
	reducers: {
		setModal(state, action) {
			state.modalContent = action.payload;
		},
		clearModal(state) {
			state.modalContent = null;
		},
	},
});

export const { setModal, clearModal } = modalSlice.actions;

export const modalReducer = modalSlice.reducer;

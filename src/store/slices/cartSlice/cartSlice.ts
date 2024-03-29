import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import { CartItem } from 'store/types';

export const cartslice = createSlice({
	name: 'cartslice',
	initialState,
	reducers: {
		addItem: (state, action: PayloadAction<CartItem>) => {
			const findeItem = state.items.find(obj => obj.id === action.payload.id);
			if (findeItem) {
				findeItem.count++;
			} else {
				state.items.push({
					...action.payload,
					count: 1,
				});
			}
			state.totalPrice = state.items.reduce((sum, obj) => {
				return obj.price * obj.count + sum;
			}, 0);
		},
		minusItem: (state, action: PayloadAction<string>) => {
			const findeItem = state.items.find(obj => obj.id === action.payload);
			if (findeItem) {
				findeItem.count--;
			}
		},

		removeItem: (state, action: PayloadAction<string>) => {
			state.items = state.items.filter(obj => obj.id !== action.payload);
		},
		clearItems: state => {
			state.items = [];
			state.totalPrice = 0;
		},
	},
});

export const { addItem, removeItem, clearItems, minusItem } = cartslice.actions;

export default cartslice.reducer;

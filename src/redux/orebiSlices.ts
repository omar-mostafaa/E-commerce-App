import { createSlice } from '@reduxjs/toolkit';
import {ProductsProps} from '../../typs';

interface StoreState {
  productData: ProductsProps[];
}

const initialState: StoreState = {
  productData: [],
};

export const orebiSlices = createSlice({
  name: 'orebi',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.productData.find(
        (item: ProductsProps) => item._id === action.payload._id,
      );
      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.productData.push(action.payload);
      }
    },
    increaseQuantity: (state, action) => {
      const existingProduct = state.productData.find(
        (item: ProductsProps) => item._id === action.payload._id,
      );
      existingProduct && existingProduct.quantity++;
    },
    decreaseQuantity: (state, action) => {
      const existingProduct = state.productData.find(
        (item: ProductsProps) => item._id === action.payload._id,
      );

      if (existingProduct?.quantity === 1) {
        existingProduct.quantity = 1;
      } else {
        existingProduct && existingProduct.quantity--;
      }
    },
    deleteProduct: (state, action) => {
      state.productData = state.productData.filter(
        item => item._id !== action.payload,
      );
    },
    resetCart: state => {
      state.productData = [];
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  deleteProduct,
  resetCart,
} = orebiSlices.actions;
export default orebiSlices.reducer;

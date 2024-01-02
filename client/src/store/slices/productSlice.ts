import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import mockProducts from '../../mock/products.js'
import { Product } from '../../types/Product.js'

const productSlice = createSlice({
  name: 'product',
  initialState: {
    list: [...mockProducts] as Product[]
  },
  reducers: {
    addProduct(state, action: PayloadAction<Product>) {
      state.list.push(action.payload)
    },
    removeProduct(state, action: PayloadAction<number>) {
      state.list = state.list.filter(product => product.id !== action.payload)
    },
  }
})

export const { addProduct, removeProduct } = productSlice.actions

export default productSlice.reducer
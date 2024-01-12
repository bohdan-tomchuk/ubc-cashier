import { configureStore } from '@reduxjs/toolkit'
import productReducer from './slices/productSlice'
import checkReducer from './slices/checkSlice'

const store = configureStore({
  reducer: {
    products: productReducer,
    checks: checkReducer,
  }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
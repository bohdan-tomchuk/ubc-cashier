import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'

import { cashierApi } from './services/cashierApi'
import { authApi } from './services/authApi'
import userReducer from './slices/userSlice'

const store = configureStore({
  reducer: {
    [cashierApi.reducerPath]: cashierApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([cashierApi.middleware, authApi.middleware])
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
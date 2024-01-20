import { configureStore } from '@reduxjs/toolkit'

import { cashierApi } from './services/cashierApi'

const store = configureStore({
  reducer: {
    [cashierApi.reducerPath]: cashierApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cashierApi.middleware),
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
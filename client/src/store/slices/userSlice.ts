import { createSlice, type PayloadAction } from '@reduxjs/toolkit/react'
import { IUser } from '../../types/User'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: JSON.parse(localStorage.getItem('user') as string)?.email,
    token: JSON.parse(localStorage.getItem('user') as string)?.token
  } as IUser,
  reducers: {
    setCredentials(state, action: PayloadAction<IUser>) {
      state.email = action.payload.email
      state.token = action.payload.token
    },
    logout(state) {
      state.email = null
      state.token = null
    }
  }
})

export const { setCredentials, logout } = userSlice.actions
export default userSlice.reducer
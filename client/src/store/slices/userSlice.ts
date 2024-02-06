import { createSlice, type PayloadAction } from '@reduxjs/toolkit/react'
import { IUser } from '../../types/User'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null as IUser | null
  },
  reducers: {
    login(state, action: PayloadAction<IUser>) {
      state.user = action.payload
    },
    logout(state) {
      state.user = null
    }
  }
})

export const { login, logout } = userSlice.actions
export default userSlice.reducer
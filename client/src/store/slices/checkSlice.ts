import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import mockChecks from '../../mock/checks.ts'
import { Check } from '../../types/Check.ts'

const checkSlice = createSlice({
    name: 'check',
    initialState: {
        list: [...mockChecks] as Check[],
    },
    reducers: {
        addCheck(state, action: PayloadAction<Check>) {
            state.list.push(action.payload)
        },
        removeCheck(state, action) {
            state.list = state.list.filter(check => check.id !== action.payload)
        },
    }
})

export const { addCheck, removeCheck } = checkSlice.actions

export default checkSlice.reducer
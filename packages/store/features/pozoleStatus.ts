import { createSlice } from '@reduxjs/toolkit'

interface pozoleState {
    initialized: boolean
}

const initialState: pozoleState = {
    initialized: false
}

const pozolestatusSlice = createSlice({
    name: 'pozoleStatus',
    initialState,
    reducers: {
        pozoleIntialized(state) {
            state.initialized = true
        }
    }
})

export const { pozoleIntialized } = pozolestatusSlice.actions
export default pozolestatusSlice.reducer

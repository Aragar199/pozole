import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface web3State {
    status: string
    networkId: number,
    networkMismatch: boolean,
}

const initialState: web3State = {
    status: '',
    networkId: 0,
    networkMismatch: false
}

const web3Slice = createSlice({
    name: 'web3',
    initialState,
    reducers: {
        initializing(state) {
            state.status = 'initializing'
        },
        initialized(state) {
            state.status = 'initialized'
        },
        failed(state) {
            state.status = 'failed'
        },
        userDeniedAccess(state) {
            state.status = 'UserDeniedAccess'
        },
        networkIdFetched(state, action: PayloadAction<number>) {
            state.networkId = action.payload
        },
        networkIdFailed(state, action: PayloadAction<number>) {
            state.networkId = action.payload
        },
        networkMismatch(state, action: PayloadAction<number>) {
            state.networkMismatch = true
        }
    }
})

export const { initialized, initializing, failed, userDeniedAccess, networkIdFailed, networkIdFetched, networkMismatch } = web3Slice.actions
export default web3Slice.reducer
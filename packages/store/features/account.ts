import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AnyObject } from "immer/dist/internal"

interface accountState {
    accounts: Array<string>
}

const initialState: accountState = {
    accounts: []
}

const accountstateSlice = createSlice({
    name: 'accountStatus',
    initialState,
    reducers: {
        accountFetching(state) {
            state
        },
        accountFetched(state, action: PayloadAction<Array<string>>){
            state.accounts = action.payload
        },
        accountFailed(error) {
            error
        }
    }
})

export const { accountFetched, accountFetching, accountFailed } = accountstateSlice.actions
export default accountstateSlice.reducer
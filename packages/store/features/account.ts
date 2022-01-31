import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface accountsState {
    accountsSelected: Array<string>,
    accountsBalance: {[key: string]: number}
}

const initialState: accountsState = {
    accountsSelected: [],
    accountsBalance: {}
}

const accountstateSlice = createSlice({
    name: 'accounts',
    initialState,
    reducers: {
        accountFetching(state) {
            state
        },
        accountsFetched(state, action: PayloadAction<Array<string>>){
            state.accountsSelected = action.payload
        },
        accountBalanceFetched(state, action: PayloadAction<{account: string, balance: number}>){
            state.accountsBalance[action.payload.account] = action.payload.balance
        },
        accountFailed(error) {
            error
        }
    }
})

export const { accountsFetched, accountFetching, accountBalanceFetched, accountFailed } = accountstateSlice.actions
export default accountstateSlice.reducer
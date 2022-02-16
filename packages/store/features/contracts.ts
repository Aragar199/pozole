import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { generateContractInitialState } from '../../utils/contractState'

interface contracts {
    initialized: boolean,
    synced: boolean,
    [k: string]: any
}

interface contractsState {
    [k: string]: contracts
}

const initialState = {}

const contractsSlice = createSlice({
    name: 'contracts',
    initialState,
    reducers: {
        initialized(state, action: any) {
            [action.payload.contractConfig.contractName] = generateContractInitialState(action.contractConfig)
        }
    }
})

export const { initialized } = contractsSlice.actions
export default contractsSlice.reducer
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { generateContractInitialState } from '../../utils/contractState'

interface contracts {
    [k: string]: any
}

interface contractsState {
    [contractName: string]: contracts
}

const initialState: contractsState = { }

const contractsSlice = createSlice({
    name: 'contracts',
    initialState,
    reducers: {
        initializing(state, action: PayloadAction<{contractConfig: {[contractName: string]: any}}>) {
            [action.payload.contractConfig.contractName] = generateContractInitialState(action.payload.contractConfig)
        },
        initialized(state, action: PayloadAction<{name: string}>) {
            state[action.payload.name] = { 
                initialized: true, 
                synced: true, 
                events: [] }
        },
        deleted(state, action: PayloadAction<{name:string}>) {
            const { [action.payload.name]: omitted } = state
        },
        syncing(state, action: PayloadAction<{name: string}>) {
            state[action.payload.name] = { synced: true }
        },
        gotvars(state, action: any) {
            state[action.name][action.variable][action.argsHash] = { 
                args: action.args, 
                fnIndex: action.fnIndex, 
                value: action.value, 
                error: null }
        },
        gotvarserror(state, action: any) {
            state[action.name][action.variable][action.argsHash] = { 
                args: action.args, 
                fnIndex: action.fnIndex, 
                value: null, 
                error: action.error }
        },
        eventfired(state, action: PayloadAction<{name: string, event: Array<any>}>) {
            state[action.payload.name].events.push(action.payload.event)
        }
    }
})

export const { initializing } = contractsSlice.actions
export default contractsSlice.reducer
import { configureStore } from '@reduxjs/toolkit'
import web3Reducer from './features/web3'
import pozolestatusReducer from './features/pozoleStatus'
import accountstateReducer from './features/account'
import contractsReducer from './features/contracts'
import { rootSaga } from './sagas/rootSaga'
import createSagaMiddleware from 'redux-saga'
import { generateContractGroupInitialState } from '../utils/contractState'
import SimpleStorage from '../../build/contracts/SimpleStorage.json'

const options = {
    web3: {
        block: false,
        fallback: {
          type: "ws",
          url: "ws://127.0.0.1:7545",
        },
      },
      contracts: [SimpleStorage],
      events: {
        SimpleStorage: ["StorageSet"],
      },
      polls: {
        accounts: 1500,
      },
}

const sagaMiddleware = createSagaMiddleware()
const initialContractsState = {
    contracts: generateContractGroupInitialState(options)
}

export const store = configureStore({
    reducer: { 
        pozoleStatus: pozolestatusReducer,
        web3: web3Reducer,
        accounts: accountstateReducer,
        contracts: contractsReducer,
    },
    preloadedState: initialContractsState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
})

sagaMiddleware.run(rootSaga)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
import { configureStore } from '@reduxjs/toolkit'
import web3Reducer from './features/web3'
import { initializeWeb3 } from './sagas/web3Saga'
import createSagaMiddleware from 'redux-saga'

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
    reducer: { 
        web3: web3Reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
})

sagaMiddleware.run(initializeWeb3)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
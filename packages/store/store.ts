import { configureStore } from '@reduxjs/toolkit'
import web3Reducer from './features/web3'
import pozolestatusReducer from './features/pozoleStatus'
import accountstateReducer from './features/account'
import { rootSaga } from './sagas/rootSaga'
import createSagaMiddleware from 'redux-saga'

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
    reducer: { 
        pozoleStatus: pozolestatusReducer,
        web3: web3Reducer,
        accounts: accountstateReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
})

sagaMiddleware.run(rootSaga)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
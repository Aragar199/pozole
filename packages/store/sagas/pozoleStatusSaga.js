import { call, put } from 'redux-saga/effects'
import { getAccounts, getAccountBalance } from './accountSaga'
import { initializeWeb3 } from './web3Saga'
import { pozoleIntialized } from '../features/pozoleStatus'

export function* initializePozole () {
    try {
        const web3 = yield call(initializeWeb3)

        yield call(getAccounts, { web3 })
        yield call(getAccountBalance, { web3 })
        
    } catch (error) {

    }
    yield put({ type: pozoleIntialized.type })
}
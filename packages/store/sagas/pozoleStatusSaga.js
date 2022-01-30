import { call, put } from 'redux-saga/effects'
import { getAccount } from './accountSaga'
import { initializeWeb3, getNetworkId } from './web3Saga'
import { pozoleIntialized } from '../features/pozoleStatus'

export function* initializePozole () {
    try {
        const web3 = yield call(initializeWeb3)

        yield call(getAccount, { web3 })
        
    } catch (error) {

    }
    yield put({ type: pozoleIntialized.type })
}
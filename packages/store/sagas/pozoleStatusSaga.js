import { call, put } from 'redux-saga/effects'
import { initializeWeb3, getNetworkId } from './web3Saga'
import { pozoleIntialized } from '../features/pozoleStatus'
import { networkMismatch } from '../features/web3'

export function * initializePozole () {
    try {


        const web3 = yield call(initializeWeb3)
        
        return
    } catch (error) {

    }
    yield put({ type: pozoleIntialized })
}
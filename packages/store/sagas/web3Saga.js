import Eth from 'web3-eth'
import * as web3Actions from '../features/web3'
// import { initialized, failed, userDeniedAccess, networkIdFetched, networkIdFailed } from '../features/web3'
import { call, put } from 'redux-saga/effects'

export function* initializeWeb3 () {
    try {

        if (window.ethereum) {
            web3 = new Eth(Eth.givenProvider)
            try {
                const selectedAccount = yield call([ethereum, 'request'], {method: 'eth_requestAccounts'})

                yield put({ type: web3Actions.initialized.type })

                if(!selectedAccount) {
                    yield put({type: web3Actions.userDeniedAccess.type})
                    return
                }
                return web3
            } catch (error) {
                console.error(error)
                yield put({type: web3Actions.failed.type})
                return
            }
        }
    } catch (error) {
        yield put({ type: failed })
        console.error('Error initializing web3-eth:', error)
    }
}

export function* getNetworkId({ web3 }) {
    try {
        const networkId = yield call(web3.eth.net.getId)

        yield put({ type: web3Actions.networkIdFetched.type })
        return networkId
    } catch (error) {
        yield put({ type: web3Actions.networkIdFailed.type })

        console.error('Error fetching network ID: ', error)
    }
}

import Eth from 'web3-eth'
import { initialized, failed, userDeniedAccess, networkIdFetched, networkIdFailed } from '../features/web3'
import { call, put } from 'redux-saga/effects'

export function * initializeWeb3 () {
    try {

        if (window.ethereum) {
            web3 = new Eth(Eth.givenProvider)
            try {
                const selectedAccount = yield call([ethereum, 'request'], {method: 'eth_requestAccounts'})

                yield put({ type: initialized })

                if(!selectedAccount) {
                    yield put({type: userDeniedAccess})
                    return
                }
                return web3
            } catch (error) {
                console.error(error)
                yield put({type: failed})
                return
            }
        }
    } catch (error) {
        yield put({ type: failed })
        console.error('Error initializing web3-eth:', error)
    }
}

export function * getNetworkId({ web3 }) {
    try {
        const networkId = yield call(web3.eth.net.getId)

        yield put({ type: networkIdFetched })
        return networkId
    } catch (error) {
        yield put({ type: networkIdFailed })

        console.error('Error fetching network ID: ', error)
    }
}

import { call, put } from 'redux-saga/effects'
import {accountFetched, accountFetching, accountFailed } from '../features/account'

export function* getAccount(action) {
    const web3 = action.web3

    try {
        const accounts = yield call(web3.getAccounts)

        yield put({ type: accountFetched.type, accounts })
    } catch (error) {
        yield put({ type: accountFailed.type, error })
        console.error('Error fetching accounts: ', error)
    }
}
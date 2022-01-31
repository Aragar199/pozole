import { call, put, select } from 'redux-saga/effects'
import {accountsFetched, accountBalanceFetched, accountFailed } from '../features/account'

export function* getAccounts(action) {
    const web3 = action.web3

    try {
        const selectedAccounts = yield call(web3.getAccounts)

        yield put({ type: accountsFetched.type, payload: selectedAccounts })
    } catch (error) {
        yield put({ type: accountFailed.type, error })
        console.error('Error fetching accounts: ', error)
    }
}

export function* getAccountBalance(action) {
    const accounts = yield select(getSelectedAccounts)
    const web3 = action.web3

    try {
        for (var i in accounts) {
            var id = accounts[i]
            var accountBalance = yield call(web3.getBalance, id)

            yield put({type: accountBalanceFetched.type, payload: {account: id, balance: accountBalance }})
        }
    } catch (error) {
        console.error('Error fetching account', id)
    }
}

export const getSelectedAccounts = (state) => state.accounts.accountsSelected
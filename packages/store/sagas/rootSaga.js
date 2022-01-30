import { all, fork } from 'redux-saga/effects'
import { initializePozole } from './pozoleStatusSaga'

export function* rootSaga() {
    yield all([fork(initializePozole)])
}


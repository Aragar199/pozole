import { actionChannel, call, put, take } from '@redux-saga/core/effects'
import { END, eventChannel } from 'redux-saga'
import * as ContractActions from '../features/contracts'

export function createContractEventChannel ({
    contract,
    eventName,
    eventOptions
}) {
    const name = contract.contractName

    return eventChannel(emit => {
        const eventListener = contract.events[eventName](eventOptions)
        .on('data', event => {
            emit({ type: ContractActions.eventfired({ type: ContractActions.eventfired.type, payload: event})
        })
        .on('changed', event => {
            emit({ type: ContractActions.eventchanged({ type: ContractActions.eventchanged.type, payload: event })})
        })
        .on('error', error => {
            emit({ type: ContractActions.eventerror({ type: ContractActions.eventerror.type, payload: event })})
            emit(END)
        })

        const unsubscribe = () => {
            eventListener.removeListener(eventName)
        }

        return unsubscribe
        })
    })
}

function* callListenForContractEvent({
    contract,
    eventName,
    eventOptions
}) {
    const contractEventChannel = yield call(createContractEventChannel, {
        contract,
        eventName,
        eventOptions
    })

    while (true) {
        var event = yield take(contractEventChannel)
        yield put(event)
    }
}


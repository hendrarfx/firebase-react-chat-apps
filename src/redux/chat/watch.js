import * as authSaga from './saga';
import * as actionType from './actions';
import {all,takeLatest} from 'redux-saga/effects';

function* watchChats() {
    yield all([
        takeLatest(actionType.CHAT.SEND_CHAT, authSaga.sendChat)
    ]);
}

export default watchChats;
import {put} from 'redux-saga/effects';
import fireBase from '../../common/firebase.config';
import {setChatId} from './actions';

export function* sendChat(action) {
    try {
        let msg = {
            cid: action.id,
            person1:action.from.userId,
            person2:action.to.userId,
            from: action.from,
            to: action.to,
            times: new Date().getTime(),
            text: action.message
        };

        const newMsgRef = yield fireBase.database().ref(action.id).push().set(msg);
        yield put(setChatId(action.id));
    } catch (error) {
        yield console.log(error)
    }
}
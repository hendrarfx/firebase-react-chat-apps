import {put} from 'redux-saga/effects';
import fireBase from '../../common/firebase.config';
import * as chatActionType from '../chat/actions';
import * as actionType from './actions';

export function* saveSelectedContactAsRecentChats(action) {
    try {

        const json = [];
        const id = yield action.from.userId + '_' + action.contact.userId;

        const newObj = {
            chatId: id,
            to: {
                uid: action.contact.userId,
                displayName: action.contact.displayName,
                email: action.contact.email
            },
            times: new Date().getTime()
        };

        yield fireBase.database().ref(action.from.userId).child(id).set(newObj);
        yield put(actionType.setSelectedContact(action.contact));
        yield put(chatActionType.initChatId(action.from,action.contact));
    } catch (error) {
        yield console.log(error);
    }
}

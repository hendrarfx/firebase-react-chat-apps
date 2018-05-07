import * as authSaga from './saga';
import * as actionType from './actions';
import {all,takeEvery} from 'redux-saga/effects';

function* watchContacts() {
    yield all([
        takeEvery(actionType.CONTACT.INIT_SET_SELECTED_CONTACT, authSaga.saveSelectedContactAsRecentChats)
    ]);
}

export default watchContacts;
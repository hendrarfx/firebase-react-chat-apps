import fireBase from '../../common/firebase.config';
import * as actionType from '../contacts/actions';

export const CHAT = {
    SET_SELECTED_CHAT: 'SET_SELECTED_CHAT',
    FETCH_RECENT_CHATS: 'FETCH_RECENT_CHATS',
    FETCH_RECENT_CHATS_IN_PROCESS: 'FETCH_RECENT_CHATS_IN_PROCESS',
    FETCH_RECENT_CHATS_IN_SERVER: 'FETCH_RECENT_CHATS_IN_SERVER',
    FETCH_DETAIL_CHATS_FROM_SERVER: 'FETCH_DETAIL_CHATS_FROM_SERVER',
    SEND_CHAT: 'SEND_CHAT',
    SET_CHAT_ID: 'SET_CHAT_ID'
};

export const setChatId = (object) => {
    return {
        type: CHAT.SET_CHAT_ID,
        chatId: object
    }
};

export const setSelectedChat = (object) => {
    return {
        type: CHAT.SET_SELECTED_CHAT,
        chat: object
    }
};

export const fetchRecentChats = (value) => {
    return {
        type: CHAT.FETCH_RECENT_CHATS,
        chats: value
    }
};

export const fetchRecentChatsInProcess = () => {
    return {
        type: CHAT.FETCH_RECENT_CHATS_IN_PROCESS
    };
};

export const fetchRecentChatsInServer = () => {
    return {
        type: CHAT.FETCH_RECENT_CHATS_IN_SERVER
    };
};

export const fetchDetailChatsFromServer = () => {
    console.log('FETCG DETAIL');
    return {
        type: CHAT.FETCH_DETAIL_CHATS_FROM_SERVER
    };
};


export const sendChat = (message, from, to) => {
    return dispatch => {
        const firstId = to.userId + '_' + from.userId;
        const secondId = from.userId + '_' + to.userId;
        console.log('FIRST_ID',firstId);
        fireBase.database().ref('recent').child(firstId)
            .once('value')
            .then(function (snapshot) {
                var value = snapshot.val();
                console.log('VALUE', value);
                if (value === undefined || value === null) {

                    fireBase.database().ref('recent').child(secondId)
                        .once('value')
                        .then(function (snapshot) {
                            var value2 = snapshot.val();
                            console.log('VALUE2', value2);
                            if (value2 === undefined || value2 === null) {
                                dispatch(sendChatToServer(firstId, from, to, message));
                            } else {
                                dispatch(sendChatToServer(secondId, from, to, message));
                            }
                        });
                } else {
                    dispatch(sendChatToServer(firstId, from, to, message));
                }
            });
    }


};

export const sendChatToServer = (id, from, to, message) => {
    return {
        type: CHAT.SEND_CHAT,
        id: id,
        from: from,
        to: to,
        message: message
    }
}
export const initChatId = (from, to) => {
    return dispatch => {
        const firstId = to.userId + '_' + from.userId;
        const secondId = from.userId + '_' + to.userId;
        fireBase.database().ref('recent').child(firstId)
            .once('value')
            .then(function (snapshot) {
                var value = snapshot.val();
                console.log('VALUE', value);
                if (value === undefined || value === null) {

                    fireBase.database().ref('recent').child(secondId)
                        .once('value')
                        .then(function (snapshot) {
                            var value2 = snapshot.val();
                            console.log('VALUE2', value2);
                            if (value2 === undefined || value2 === null) {
                                dispatch(setChatId(firstId));
                                dispatch(actionType.setSelectedContact(to));
                            } else {
                                dispatch(setChatId(secondId));
                                dispatch(actionType.setSelectedContact(to));
                            }
                        });
                } else {
                    dispatch(setChatId(firstId));
                    dispatch(actionType.setSelectedContact(to));
                }
            });
    }
};


import * as actionType from './actions';
import {utility} from '../../common/helper/utility';

const initializeState = {
    selectedChat: {},
    chats: [],
    page: 0,
    rows:10,
    inProcess: false,
    error: false,
    errorMessage: '',
    chatId:''
}

const reducer = (state = initializeState, action) => {
    switch (action.type) {
        case actionType.CHAT.SET_SELECTED_CHAT:
            const selectedChat = {...action.chat};
            return utility(state, selectedChat);
        case actionType.CHAT.FETCH_RECENT_CHATS:
            return utility(state, {error: true, chats: action.chats,errorMessage:''});
        case actionType.CHAT.FETCH_RECENT_CHATS_IN_PROCESS:
            return utility(state, {error: false, inProcess: true, errorMessage: ''});
        case actionType.CHAT.SET_CHAT_ID:
            return utility(state, {chatId:action.chatId});
        default:
            return state;
    }
}

export default reducer;
import * as actionType from './actions';
import {utility} from '../../common/helper/utility';

const initializeState = {
    selectedContact: {
        displayName:'',
        email:'',
        userId:'',
        photoURL:''
    },
    chatId:''
}

const reducer = (state = initializeState, action) => {
    switch (action.type) {
        case actionType.CONTACT.SET_SELECTED_CONTACT:
            const selectedContact = {
                displayName:action.contact.displayName,
                email:action.contact.email,
                userId:action.contact.userId,
                photoURL:''
            };
            return utility(state, {selectedContact:selectedContact,chatId:action.chatId});
        default:
            return state;
    }
}

export default reducer;
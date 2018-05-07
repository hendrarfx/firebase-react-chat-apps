import fireBase from '../../common/firebase.config';

export const CONTACT = {
    SET_SELECTED_CONTACT: 'SET_SELECTED_CONTACT',
    INIT_SET_SELECTED_CONTACT: 'INIT_SET_SELECTED_CONTACT'
};

export const setSelectedContact = (object) => {
    return {
        type: CONTACT.SET_SELECTED_CONTACT,
        contact: object
    }
};

export const successSelectedContact = (object,chatId) => {
    return {
        type: CONTACT.SET_SELECTED_CONTACT,
        contact: object,
        chatId:chatId
    }
};

export const initSetSelectedContact = (object, from) => {
    return {
        type: CONTACT.INIT_SET_SELECTED_CONTACT,
        contact: object,
        from: from
    }
};

/*
export const saveSelectedContactToFirebase = (object, from) => {
    return {
        type: CONTACT.INIT_SET_SELECTED_CONTACT,
        contact: object,
        from: from
    }
}*/

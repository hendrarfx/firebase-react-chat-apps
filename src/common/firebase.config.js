import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyB_bFTLp_AWxgb2Ow66HL_tx51Mjq8FBGE",
    authDomain: "kumparan-firechat.firebaseapp.com",
    databaseURL: "https://kumparan-firechat.firebaseio.com",
    projectId: "kumparan-firechat",
    storageBucket: "kumparan-firechat.appspot.com",
    messagingSenderId: "873205161714"
}

let fireBaseInit = firebase.initializeApp(config);;

export default fireBaseInit;
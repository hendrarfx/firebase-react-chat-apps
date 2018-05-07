import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actionType from '../../../redux/chat/actions';
import {withFirebase} from 'firekit-provider';
import {ChatWindow} from '../../../components/Apps/DetailChat';


class DetailChat extends Component {

    state = {
        message: '',
        key:''
    }

    watchListFromFireBase = () => {
        const id = this.props.chatId;
        if (id !== null && id !== undefined && id !== '' && id!==this.state.key) {
            console.log('OKE masuk SINI')
            const {watchList, firebaseApp} = this.props;
            let messages = firebaseApp.database().ref(this.props.chatId).limitToLast(50);
            watchList(messages);
            this.setState({key:id});
        }
    }

    componentDidUpdate(){
        console.log('PROPS CHAT ID',this.props.chatId);
        console.log('PROPS',this.props.messages);
        this.watchListFromFireBase();
    }

    messageChangeHandler = (event) => {
        this.setState({message: event.target.value});
    }

    sendMessage = () => {
        this.props.sendMessages(this.state.message, this.props.user, this.props.selectedContact);
        this.setState({message:''});
    }

    render() {

        return <div>
            <ChatWindow selectedContact={this.props.selectedContact}
                        message={this.state.message}
                        messages={this.props.messages[this.state.key]}
                        onChangeHandler={this.messageChangeHandler}
                        sendMessage={() => this.sendMessage()}
            />
        </div>

    }
}

const mapStateToProps = (state) => {
    return {
        messages: state.lists,
        selectedContact: state.contact.selectedContact,
        user: state.authReducer.user,
        chatId:state.chatsReducer.chatId
    }
};

const mapsStateToDispatch = (dispatch) => {
    return {
        sendMessages: (data,from,to) => dispatch(actionType.sendChat(data,from,to)),
        init: (from,to) => dispatch(actionType.initChatId(from,to))
    }
}

export default connect(mapStateToProps, mapsStateToDispatch)(withFirebase(DetailChat));
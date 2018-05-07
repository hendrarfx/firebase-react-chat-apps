import React, {Component} from 'react';
import {Card, CardText, CardHeader} from 'material-ui/Card';
import {RaisedButton, CircularProgress} from 'material-ui';
import {styling} from '../../../common/themes';
import {connect} from 'react-redux';
import RecentChats from '../../../components/Apps/RecentChat/RecentChats';
import {withFirebase} from 'firekit-provider';
import * as contactActionType from '../../../redux/chat/actions';
import {NavLink} from 'react-router-dom';
import fireBase from '../../../common/firebase.config';

class MyChat extends Component {

    state = {
        firstLoad: true,
        recentChats: [],
        key: ''
    };

    componentWillMount() {
        const key = this.props.user.userId;
        this.setState({key: key});
    }

    componentDidMount() {
        const {watchList, firebaseApp, watchDoc} = this.props;
        let recent = fireBase.database().ref(this.state.key);
        watchList(recent);
        this.setState({firstLoad: true});
    }

    componentDidUpdate() {

    }

    selectContactFromRecentChats = (data) => {
        this.props.selectContact(this.props.user,data);
    }

    render() {
        let contacts = null;

        if (this.props.recent !== undefined) {
            contacts = <RecentChats recentChats={this.props.recent[this.state.key]}
                                    user={this.props.user}
                                    onClick={this.selectContactFromRecentChats}
            />
        } else {
            contacts = (<div align="center"><br/><br/><CircularProgress/></div>);
        }

        return (<div>
            <Card>
                <CardHeader
                    style={{backgroundColor: styling.palette.primary1Color}}
                    title={this.props.user.displayName}
                    titleColor="white"
                    subtitle={this.props.user.email}
                    subtitleColor="white"
                    avatar="https://gazettereview.com/wp-content/uploads/2016/03/facebook-avatar.jpg"
                />
                <CardText>
                    {contacts}
                </CardText>
                <CardText align="center">
                    <hr/>
                    <NavLink to="/chat/contact">
                        <RaisedButton label="SELECT CONTACT" primary={true}/>
                    </NavLink>

                </CardText>
            </Card>
        </div>);
    }
}

const mapsStateToProps = (state) => {
    return {
        chats: [],
        recent: state.lists,
        user: state.authReducer.user
    };
};


const mapsStateToDispatch = (dispatch) => {
    return {
        selectContact: (from,to) => dispatch(contactActionType.initChatId(from,to))
    };
};

export default connect(mapsStateToProps, mapsStateToDispatch)(withFirebase(MyChat));
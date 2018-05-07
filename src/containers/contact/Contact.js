import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withFirebase} from 'firekit-provider';
import * as contactActionType from '../../redux/contacts/actions';
import {Card, CardText} from 'material-ui/Card';
import {Row, Col, Grid} from 'react-bootstrap';
import {FlatButton, Paper, CircularProgress} from 'material-ui';

class Contact extends Component {

    componentDidMount() {
        const {watchList, firebaseApp} = this.props;
        let contacts = firebaseApp.database().ref('contacts');
        watchList(contacts);
    }

    render() {

        let contacts = <Card><CardText align="center"><h4>Load Data</h4><br/><CircularProgress/></CardText></Card>;
        const classes = {
            padding: '10px'
        };

        const style = {
            height: '64px',
            width: '64px',
            margin: '0px 10px 0px 5px',
            textAlign: 'center',
            display: 'inline-block',
            overflow: 'hidden'
        };

        if (this.props.contacts !== undefined) {
            if (this.props.contacts.length > 0) {
                contacts = this.props.contacts.map((data, index) => {
                    return (<Card key={index} containerStyle={classes}>
                        <Row>
                            <Col xs={2} sm={2} md={2} lg={2}>
                                <Paper style={style} zDepth={1} circle={true}>
                                    <img alt="profile"
                                         src="https://gazettereview.com/wp-content/uploads/2016/03/facebook-avatar.jpg"
                                         style={{width: '64px', height: '64px'}}/>
                                </Paper>
                            </Col>
                            <Col xs={8} sm={8} md={8} lg={8}>
                                <h5>{data.val.displayName}</h5>
                                {data.val.email}
                            </Col>
                            <Col xs={2} sm={2} md={2} lg={2}>
                                <FlatButton label={'SELECT'} onClick={() => {
                                    this.props.selectedContact(data.val, this.props.user);
                                    this.props.history.push('/chat');
                                }}/>
                            </Col>
                        </Row>
                    </Card>)
                });
            }
        }

        return <Grid>
            <Row>
                <Col xs={12} sm={12} md={12} lg={12}>
                    <div style={{marginTop: '15px'}}>
                        <h3 align="center">CONTACTS</h3>
                        <hr/>
                        {contacts}
                    </div>
                </Col>
            </Row>
        </Grid>;
    }
}

const mapStateToProps = (state) => {
    return {
        contacts: state.lists.contacts,
        list: state.lists,
        user: state.authReducer.user
    }
};

const mapsStateToDispatch = (dispatch) => {
    return {
        selectedContact: (contact, from) => {
            dispatch(contactActionType.initSetSelectedContact(contact, from));
        }
    }
}

export default connect(mapStateToProps, mapsStateToDispatch)(withFirebase(Contact));
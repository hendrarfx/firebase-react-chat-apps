import React, {Component} from 'react';
import classes from './DetailChat.css';
import image from '../../../assets/images/woman-in-chat.png';
import {TextField, RaisedButton, Card, CardHeader, CardText} from 'material-ui';
import {Row, Col} from 'react-bootstrap';
import {styling} from '../../../common/themes';
import ScrollBar from '../../UI/ScrollBar/ScrollBar';
import PropType from 'prop-types';
import Scroll from 'react-scroll';

const scroll = Scroll.animateScroll;

export const DetailChatWithoutContact = (props) => {
    return <div>
        <div className={classes.Container} align="middle">
            <img alt="woman-in-chat" src={image}/>
            <h2>No Selected Contact</h2>
        </div>
    </div>
};

export class ChatWindow extends Component {


    static propTypes = {
        selectedContact: PropType.object.isRequired,
        message: PropType.string.isRequired,
        onChangeHandler:PropType.func.isRequired,
        sendMessage:PropType.func.isRequired
    };
    componentDidMount(){
        this.scrollToBottom();
    }

    componentDidUpdate(){
        this.scrollToBottom();
    }

    scrollToBottom = () => {
        const options = {
            spy: true,
            to: 'lastElement',
            containerId: 'containerElement',
            duration: 1000
        };
        scroll.scrollToBottom(options);
    }

    render() {
        let renderedMessage = <h5 align="center">No Messages</h5>
        if (this.props.messages !== undefined) {
            if (this.props.messages.length > 0) {
                renderedMessage = <div>{
                    this.props.messages.map((data) => {

                        let colors = classes.talkBubblePerson2;

                        if (data.val.from.userId === data.val.person1) colors = classes.talkBubblePerson1;

                        return <div key={data.key} className={classes.talkBubbleContainer}>
                            <div className={[classes.talkBubble, colors].join(' ')}>
                                <div className={classes.talktext}>
                                    <b>{data.val.from.displayName}</b>
                                    <p>{data.val.text}</p>
                                </div>
                            </div>
                        </div>
                    })
                }</div>
            }
        }
        let rendered = <DetailChatWithoutContact/>
        if (this.props.selectedContact.displayName!==undefined
            && this.props.selectedContact.displayName!==null
            && this.props.selectedContact.displayName!==''){
            rendered = (<div>
                    <Card containerStyle={{color: 'white'}}>
                        <CardHeader
                            style={{backgroundColor: styling.palette.primary1Color}}
                            title={this.props.selectedContact.displayName}
                            titleColor="white"
                            subtitle={this.props.selectedContact.email}
                            subtitleColor="white"
                            avatar="https://gazettereview.com/wp-content/uploads/2016/03/facebook-avatar.jpg"
                        />
                    </Card>
                    <Card>
                        <ScrollBar id="containerElement" height="350px" backgroundColor="#fcfcfc">
                            <div>
                                {renderedMessage}
                            </div>
                            <div name="lastElement"></div>
                        </ScrollBar>
                    </Card>
                    <Card>
                        <CardText style={{width: '100%'}}>
                            <Row>
                                <Col xs={10} sm={10} md={10} lg={10}>
                                    <TextField
                                        value={this.props.message}
                                        fullWidth={true}
                                        hintText="Send Your Message"
                                        onKeyPress={(ev) => {
                                            if (ev.key === 'Enter') {
                                                this.props.sendMessage();
                                            }
                                        }}
                                        onChange={(event) => {this.props.onChangeHandler(event)}}
                                    />
                                </Col>
                                <Col xs={2} sm={2} md={2} lg={2}>
                                    <b><RaisedButton secondary={true}
                                                     onClick={() => this.props.sendMessage()}
                                                     label="SEND"/></b>
                                </Col>
                            </Row>

                        </CardText>
                    </Card></div>
            );
        }

        return (<div>{rendered}</div>)
    }
}
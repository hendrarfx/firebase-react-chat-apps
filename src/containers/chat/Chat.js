import React, {Component} from 'react';
import {Row, Col, Grid} from 'react-bootstrap';
import MyChat from './MyChat/MyChat';
import DetailChat from './DetailChat/DetailChat';

class Chat extends Component {
    render() {
        return <div style={{padding: '1%'}}>
            <Grid fluid={true}>
                <Row className="show-grid">
                    <Col xs={12} sm={4} md={4} lg={4}>
                        <MyChat/>
                    </Col>
                    <Col xs={12} sm={8} md={8} lg={8}>
                        <DetailChat/>
                    </Col>
                </Row>
            </Grid>
        </div>
    }
}


export default Chat;
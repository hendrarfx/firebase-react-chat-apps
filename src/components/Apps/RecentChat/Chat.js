import React from 'react';
/*import PropTypes from 'prop-types';*/
import {Card, CardHeader} from 'material-ui/Card';

const chat = (props) => {

    let data = {
        userId: props.data.uid,
        displayName: props.data.displayName,
        email: props.data.email,
        photoURL: ''
    };


    const displayName = data.displayName;
    const email = data.email;

    return (<div style={{marginBottom: '5px'}}><Card>
        <CardHeader
            style={{cursor: 'pointer'}}
            title={displayName}
            subtitle={email}
            onClick={() => props.onClick(data)}
            avatar="https://gazettereview.com/wp-content/uploads/2016/03/facebook-avatar.jpg"
        />
    </Card></div>);
}
export default chat;
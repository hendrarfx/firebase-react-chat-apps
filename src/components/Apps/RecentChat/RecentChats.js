import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Chat from './Chat';

export default class RecentChats extends Component {

    static propTypes = {
        recentChats: PropTypes.array,
        onClick: PropTypes.func
    };

    render() {
        let rendered = (<div align="center"><br/><br/><h5>No Recent Chats</h5></div>);

        if (this.props.recentChats !== undefined) {
            if (this.props.recentChats.length > 0) {
                rendered = (<div>
                    {this.props.recentChats.map((data, index) => {
                        return <Chat key={index}
                                     data={data.val.to}
                                     onClick={this.props.onClick}
                                     user={this.props.user}/>
                    })
                    }</div>);
            }
        }


        return rendered;
    }
}
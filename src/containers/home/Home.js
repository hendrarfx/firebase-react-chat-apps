import React, {Component} from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import AppBar from 'material-ui/AppBar';
import AppRouter from '../appRouter';
import {connect} from 'react-redux';
import {removeFireBaseListener} from '../../redux/auth/actions';

class Home extends Component {


    render() {
        const menu = ( <IconMenu
            iconButtonElement={<IconButton><MoreVertIcon/></IconButton>}
            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}>
            <MenuItem primaryText="Sign out" onClick={() => this.props.history.push('/signout')}/>
        </IconMenu>);

        return (<div>
            <AppBar title={'HOME'} showMenuIconButton={false} iconElementRight={menu}>

            </AppBar>
            <main>
                <AppRouter {...this.props} />
            </main>
        </div>);
    }
}

const mapStateToProps = (state) => {
    return {
        fireBaseListener: state.authReducer.fireBaseListener
    }
}

const mapStateToDispatch = (dispatch) => {
    return {
        removeFireBaseListener: () => dispatch(removeFireBaseListener())
    }
}

export default connect(mapStateToProps, mapStateToDispatch)(Home);
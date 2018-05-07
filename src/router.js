import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {withRouter} from 'react-router';
import asyncComponent from './common/hoc/AsyncComponent';
import {connect} from 'react-redux';
import {checkStateFromLocalStorage} from './redux/auth/actions';
import PreLoader from './containers/common/PreLoad';

class Router extends Component {

    componentWillMount() {
        this.props.checkAuth();
    }

    render() {
        const login = this.props.isLoggedIn;

        let rendered = <PreLoader/>

        if (!this.props.checkAuthInProcess) {
            rendered = (<Switch>
                <CustomRoute
                    exact
                    path="/"
                    isLoggedIn={!login}
                    redirectPath="/chat"
                    component={asyncComponent(() => import('./containers/signin/SignIn.js'))}
                />
                <CustomRoute
                    exact
                    path="/register"
                    isLoggedIn={!login}
                    redirectPath="/chat"
                    component={asyncComponent(() => import('./containers/register/Register.js'))}
                />
                <CustomRoute
                    exact
                    path="/signout"
                    isLoggedIn={login}
                    redirectPath="/"
                    component={asyncComponent(() => import('./containers/signout/SignOut.js'))}
                />
                <Route
                    exact
                    path="/404"
                    component={asyncComponent(() => import('./containers/common/404Error.js'))}>
                </Route>
                <CustomRoute
                    path="/chat"
                    isLoggedIn={login}
                    redirectPath="/"
                    component={asyncComponent(() => import('./containers/home/Home.js'))}>
                </CustomRoute>

                <Redirect to="/404"/>

            </Switch>);
        }

        return rendered;
    }
}


const CustomRoute = ({component: Component, isLoggedIn, redirectPath, ...rest}) => (
    <Route
        {...rest}
        render={props => isLoggedIn
            ? <Component {...props} />
            : <Redirect
                to={{
                    pathname: redirectPath
                }}
            />}
    />
);


const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authReducer.login,
        checkAuthInProcess: state.authReducer.checkAuthLocalStorageInProcess
    }
}

const mapStateToDispatch = (dispatch) => {
    return {
        checkAuth: () => dispatch(checkStateFromLocalStorage())
    }
}

export default withRouter(connect(mapStateToProps, mapStateToDispatch)(Router));
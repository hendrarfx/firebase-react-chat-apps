import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";

import asyncComponent from "../common/hoc/AsyncComponent";

const appRouter = (props) => {
    return (<Switch>
        <Route path={`${props.match.url}`} exact
               component={asyncComponent(() => import('./chat/Chat.js'))}/>
        <Route path={`${props.match.url}/contact`} exact component={asyncComponent(() => import('./contact/Contact.js'))}/>
        <Redirect to="/404"/>
    </Switch>);
};

export default appRouter;
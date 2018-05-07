import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {store} from "./redux/store"
import {BrowserRouter} from 'react-router-dom';
import PublicRouter from './router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {themes} from './common/themes';
import FirebaseProvider from 'firekit-provider';
import fireBaseApp from './common/firebase.config';

class App extends Component {

    render() {
        return (
            <FirebaseProvider firebaseApp={fireBaseApp}>
                <Provider store={store}>
                    <MuiThemeProvider muiTheme={themes}>
                        <BrowserRouter>
                            <PublicRouter/>
                        </BrowserRouter>
                    </MuiThemeProvider>
                </Provider>
            </FirebaseProvider>
        );
    }
}

export default App;

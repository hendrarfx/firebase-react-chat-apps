import React from 'react';
import classes from './common.css';
import spinner from '../../assets/images/spinner.gif';

const preLoad = () => {
    return <div className={classes.Common}>
        <div className={classes.Content}>
            <img src={spinner} alt="loader"/><br/>
            <h1>Social Media Dashboard</h1>
            <p>This application is a demo app that implement reactJS and firebase</p>
        </div>
    </div>
};

export default preLoad;
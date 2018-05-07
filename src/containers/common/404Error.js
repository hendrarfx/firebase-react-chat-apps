import React from 'react';
import classes from './common.css';
import spinner from '../../assets/images/spinner.gif';

const error = () => {
    return <div className={classes.Common}>
        <div className={classes.Content}>
            <img src={spinner} alt="loader"/><br/>
            <h1>Error 404:Page Not Found</h1>
            <p>Please check your url or <br />call your web administrator if url is correct</p>
        </div>
    </div>
};

export default error;
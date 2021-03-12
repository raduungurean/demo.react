import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {isSignedInLocalStorage} from "../services/utils";

const PrivateRoute = ({token, component: Component, ...rest}) => {
    if (!token) {
        return <p>loading...</p>
    }
    return (
        <Route {...rest} render={props => (
            isSignedInLocalStorage() ?
                <Component {...props} />
                : <Redirect to="/" />
        )} />
    );
};

export default PrivateRoute;
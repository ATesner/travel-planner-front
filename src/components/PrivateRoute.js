import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={ (props) => {
        let token = sessionStorage.getItem('token');
        if(!token || token === '') { //if there is no token, dont bother
            return <Redirect to='/login' />
        }else{
            return <Component {...props} />
        }
    }} />
)

export default PrivateRoute;
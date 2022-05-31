import React, { memo } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './auth'

const RequireAuth = ({children}) => {

    const auth = useAuth();
    const location = useLocation();

    if(!auth.user) {
        console.log(auth.user);
        return <Navigate to='userauth' state={{ path: location.pathname }} />
    }
    
    // console.log('User after refresh', JSON.parse(localStorage.getItem('userData')).usergot);
    // // console.log('User after refresh set', auth.setUser(JSON.parse(localStorage.getItem('userData')).usergot));
    // console.log('In Req Auth.js after nav: ', auth.user);

    return (
        children
    )
}

export default memo(RequireAuth)
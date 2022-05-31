import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/auth';
import Login from './Login';
import Register from './Register';

const UserAuth = () => {


    const auth = useAuth();
    const navigate = useNavigate();

    const [authComp, setAuthComp] = useState(0);

    
    useEffect(() => {
        if(auth.user) {
            console.log(auth.user);
            navigate('/', {replace: true});
        }
    }, []);



    if(authComp) {
        return (
            <Register setAuthComp={setAuthComp} />
        )
    }

    return (
        <Login setAuthComp={setAuthComp}/>
    )
}

export default UserAuth
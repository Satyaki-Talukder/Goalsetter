import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Input from '../components/Input';
import { useAuth } from '../utils/auth';

const Login = ({setAuthComp}) => {


    const auth = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const redirectPath = location.state?.path || '/'


    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const {email, password} = formData;

    const onChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    };


    const handleLogin = async (e) => {
        e.preventDefault();
        let user = { email, password };
        await auth.login(user, redirectPath)
        navigate(redirectPath, {replace: true});
    };

  return (
    <div className='container mx-auto flex flex-col space-y-12 mt-16 items-center'>
        <h1 className="max-w-md text-4xl font-bold text-center md:text-5xl md:text-left">Login here</h1>
        <form onSubmit={handleLogin} className='space-y-12 text-center'>
            <div className="space-y-6 flex flex-col items-end">
                <Input type='text' label='Enter email' name='email' value={email} onChange={onChange} />
                <Input type='password' label='Enter password' name='password' value={password} onChange={onChange} />
            </div>
            <button className='bg-brightRed text-white w-96 p-2 rounded' type='submit'>Login</button>
        </form>
        <button className='text-blue w-96' onClick={() => setAuthComp(1)}>Not Registered? Register here...</button>
    </div>
  )
}

export default Login
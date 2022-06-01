import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Input from '../components/Input'
import { useAuth } from '../utils/auth';

const Register = ({setAuthComp}) => {


    const auth = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const redirectPath = location.state?.path || '/'

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const {name, email, password, password2} = formData;

    const onChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    };


    const handleRegister = async(e) => {
        e.preventDefault();
        let reguser = { name, email, password, password2 };
        await auth.register(reguser)
        navigate(redirectPath, { replace: true });
    };


    return (
        <div className='container mx-auto flex flex-col space-y-12 mt-16 mb-6 items-center'>
            <h1 className="max-w-md text-4xl font-bold text-center md:text-5xl md:text-left">Register here</h1>
            <form onSubmit={handleRegister} className='space-y-12 text-center'>
                <div className="space-y-5 flex flex-col items-end">
                    <Input type='text' label='Username' name='name' value={name} onChange={onChange} />
                    <Input type='text' label='Email' name='email' value={email} onChange={onChange} />
                    <Input type='password' label='Password' name='password' value={password} onChange={onChange} />
                    <Input type='password' label='Confirm password' name='password2' value={password2} onChange={onChange} />
                </div>
                <button className='bg-brightRed text-white w-96 p-2 rounded' type='submit'>Register</button>
            </form>
            <button className='text-blue-400 w-96' onClick={() => setAuthComp(0)}>Already Registered? Login here...</button>
        </div>
    )
}

export default Register
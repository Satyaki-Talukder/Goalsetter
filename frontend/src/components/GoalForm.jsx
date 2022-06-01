import axios from 'axios';
import React, { useState, memo } from 'react'
import { useAuth } from '../utils/auth'
import Input from './Input'

const GoalForm = ({getGoals, setMyGoals}) => {

    const auth = useAuth();

    const [text, setText] = useState('');


    const addGoal = async () => {
        let url = 'https://goal-setter-st.herokuapp.com/api/goals'
        let accesstoken = JSON.parse(localStorage.getItem('userData')).usertoken
        const authAxios = axios.create({
            baseURL: url,
            headers: {
                Authorization: `Bearer ${accesstoken}`
            }
        });
        await authAxios.post(url, {text: text})
        .then(res => {
            setText('');
            getGoals();
            // return ReactDOM.createportal(<Toast success />, document.getElementById('portal'));
            auth.toastRef.current.show('success', 'Goal Added...');
            console.log(res.data);
        }).catch(err => {
            console.log(err);
            auth.toastRef.current.show('error', err);
        });
    };

    const goalSubmitHandler = e => {
        e.preventDefault();
        if(auth.user) {
            if(text !== '') addGoal();
            else auth.toastRef.current.show('warning', 'Goal field should not be empty');
        } else {
            console.log('Not Authenticated');
        }
    };


    return (
        <>
            <section className="flex flex-col mb-28 space-y-8 bg-white p-8 min-h-96 rounded-xl md:w-1/2">
                <h1 className="max-w-xl text-4xl font-bold text-center md:text-4xl md:text-left">Welcome {auth.user.name}!</h1>
                <p className="max-w-md text-xl text-center text-LightGray md:text-2xl md:text-left">Set your Goal here</p>
                <form onSubmit={goalSubmitHandler} className='space-y-8'>
                    <Input type='text' label='Enter Goal' value={text} onChange={(e) => setText(e.target.value)}/>
                    {/* md:justify-start used to start items from left at screen size md */}
                    <div className="flex">
                        <button className="p-2 px-6 w-full text-center text-white bg-brightRed rounded-full baseline lg:w-1/2" type='submit'>Add Goal</button>
                    </div>
                </form>
            </section>
            {/* <Toast ref={toastRef}/> */}
        </>
    )
}

export default memo(GoalForm)
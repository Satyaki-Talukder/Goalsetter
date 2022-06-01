import axios from 'axios';
import React from 'react'
import { useAuth } from '../utils/auth';

const GoalItem = ({goal, getGoals, myGoals, setMyGoals}) => {

    const {toastRef, modalRef} = useAuth();


    let url = `https://goal-setter-st.herokuapp.com/api/goals/${goal._id}`
    let accesstoken = JSON.parse(localStorage.getItem('userData')).usertoken
    const authAxios = axios.create({
        baseURL: url,
        headers: {
            Authorization: `Bearer ${accesstoken}`
        }
    });


    // Editing goal...
    const editGoalHandler = async (body) => {
        await authAxios.put(url, {text: body}).then(res => {
          setMyGoals(myGoals.map(goal => goal._id===res.data._id ? {...goal, text: res.data.text} : goal));
          // setOpenEditModal(0);
          toastRef.current.show('success', `Goal - '${body}' is updated...`);
        }).catch(err => {
          toastRef.current.show('error', err);
        })
    };


    // Deleting goal...
    const deleteGoalHandler = async (gtext) => {
        await authAxios.delete(url).then(res => {
          // console.log('Deleted...', res.data);
          // getGoals();
          // setOpencfModal(0);
          setMyGoals(myGoals.filter(g => g._id !== res.data.id));
          toastRef.current.show('success', `Goal - '${gtext}' is deleted...`);
        }).catch(err => {
          toastRef.current.show('error', err);
        });
    };

  return (
    <>
        <div className='rounded-xl overflow-hidden flex'>
            <p className='w-full p-3 pl-5 bg-white'>{goal.text}</p>
            <button className='py-3 px-4 text-sky-500 border border-l-sky-500 hover:bg-sky-300 hover:text-white' onClick={() => modalRef.current.show('', {goaltext: goal.text, editGoalHandler})}>EDIT</button>
            <button className='py-3 px-4 bg-red-200 hover:bg-red-400 hover:text-white' onClick={() => modalRef.current.show('cf', {goaltext: goal.text, deleteGoalHandler})}>X</button>
        </div>
    </>
  )
}

export default GoalItem
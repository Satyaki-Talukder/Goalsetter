import React, { useState } from 'react'
import Input from './Input';
import './Modal.css';

const Modal = ({cf, goaltext, closeModal, deleteGoals, editGoals}) => {

    const [text, setText] = useState(goaltext);

    const editGoalHandler = (e) => {
        e.preventDefault();
        editGoals(text);
    };


    if(cf) {
        return (
            <div className="modal-container min-w-md">
                <div className='modal-background' onClick={() => closeModal(0)}></div>
                <div className='modal p-6 bg-white rounded-xl items-center text-left flex flex-col border-2 border-slate-400'>
                   <button className='closebutton' onClick={() => closeModal(0)}>X</button>
                   <div className="header border border-transparent border-b-brightRed w-full pb-3 text-2xl">Are you sure?</div>
                   <div className="body border border-transparent border-b-brightRed w-full py-6">
                       <p className='confirm font-semibold mb-2'>Are you sure you want to delete this goal?</p>
                       <p>{goaltext}</p>
                   </div>
                   <div className="footer mt-6 flex flex-row-reverse space-x-reverse space-x-3 w-full">
                       <button className='bg-brightRed py-2 px-4 rounded-full text-white w-36' onClick={() => {deleteGoals(goaltext)}}>Yes, sure!</button>
                       <button className='border border-brightRed py-2 px-4 rounded-full text-brightRed w-36' onClick={() => closeModal(0)}>No, Go back</button>
                   </div>
               </div>
            </div>
       )
    } else {
        return(
            <div className="modal-container">
                <div className='modal-background' onClick={() => closeModal(0)}></div>
                <div className='modal p-6 bg-white rounded-xl items-center text-left flex flex-col border-2 border-slate-400'>
                   <button className='closebutton' onClick={() => closeModal(0)}>X</button>
                   <div className="header border border-transparent border-b-brightRed w-full pb-3 text-2xl">Edit goal</div>
                   <div className="body border border-transparent border-b-brightRed w-full py-6">
                        <form onSubmit={editGoalHandler} className='space-y-8'>
                            <Input type='text' label='Edit Goal' value={text} onChange={(e) => setText(e.target.value)}/>
                            {/* md:justify-start used to start items from left at screen size md */}
                            <div className="flex">
                                <button className="p-2 px-6 w-full text-center text-white bg-brightRed rounded-full baseline lg:w-1/2" type='submit'>Submit</button>
                            </div>
                        </form>
                   </div>
                   <div className="footer mt-6 flex flex-row-reverse space-x-reverse space-x-3 w-full">
                       <button className='bg-brightRed py-2 px-4 rounded-full text-white w-36' onClick={deleteGoals}>Yes, sure!</button>
                       <button className='border border-brightRed py-2 px-4 rounded-full text-brightRed w-36' onClick={() => closeModal(0)}>No, Go back</button>
                   </div>
               </div>
            </div>
        )
    }
}

export default Modal
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import ReactDOM from 'react-dom';
import Input from './Input';
import './Modal.css';

const Modal = forwardRef((props, ref) => {

    const [showModal, setShowModal] = useState(false);

    const [text, setText] =useState('');

    // const animatedProps = useSpring({
    //     opacity: 1
    // });

    useImperativeHandle(ref, () => ({
        show(type, data) {
            setShowModal({type, data});
            setText(data.goaltext)
        }
    }));


    // const editGoalHandler = (e) => {
    //     e.preventDefault();
    //     editGoals(text);
    // };

    const handleConfirm = (e) => {
        setShowModal(false);
        showModal.type === 'cf'
            ? showModal.data.deleteGoalHandler(showModal.data.goaltext)
            : showModal.data.editGoalHandler(text);
    }


    if(!showModal) return null;
    
    return ReactDOM.createPortal(
        <div className="modal-container min-w-md">
            <div className={`modal-background ${showModal ? 'show-modal-background': 'hide-modal-background'}`} onClick={() => setShowModal(false)}></div>
            <div className={`modal ${showModal ? 'show-modal': null} w-lg bg-white rounded-xl items-center text-left flex flex-col overflow-hidden`}>
                <button className='closebutton' onClick={() => setShowModal(false)}>X</button>
                <div className="header border border-transparent border-b-slate-200 w-full px-4 py-3 text-xl">
                    {showModal.type === 'cf' ? 'Are you sure?': 'Edit your goal here'}
                </div>
                <div className="body w-full px-4 py-6">
                    <p className='font-semibold mb-2'>
                        {showModal.type === 'cf' ? 'Are you sure you want to delete this goal?' : null}
                    </p>
                    {showModal.type === 'cf' 
                        ? <p>{showModal.data.goaltext}</p>
                        : <Input type='text' label='Edit Goal' value={text} onChange={(e) => setText(e.target.value)}/>
                    }
                </div>
                <div className="footer bg-slate-200 p-3 flex flex-row-reverse space-x-reverse space-x-3 w-full">
                    <button className='bg-brightRed py-1 px-3 rounded-full text-white w-32' onClick={(e) => handleConfirm(e)}>
                        {showModal.type === 'cf' ? 'Yes, sure!': 'Update'}
                    </button>
                    <button className='border border-brightRed py-1 px-3 rounded-full text-brightRed w-32' onClick={() => setShowModal(false)}>
                        {showModal.type === 'cf' ? 'No, Go back': 'Cancel'}
                    </button>
                </div>
            </div>
        </div>,
        document.getElementById('modal')
    )
})

export default Modal
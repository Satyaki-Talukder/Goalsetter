import React, { forwardRef, useImperativeHandle, useState } from 'react'
import ReactDOM from 'react-dom';
import './Toast.css';


const Toast = forwardRef((props, ref) => {

    const [showToast, setShowToast] = useState(false);

    const toast_style = {
        success: ['text-green-400', 'border-green-400'],
        warning: ['text-orange-400', 'border-orange-400'],
        error: ['text-red-400', 'border-red-400'],
        info: ['text-blue-400', 'border-blue-400']
    }

    
    useImperativeHandle(ref, () => ({
        show(type, message) {
            setShowToast({type, message});
            setTimeout(() => {
                setShowToast(false);
            }, 3000)
        }
    }))

    if (!showToast) return null;

    return ReactDOM.createPortal(
        <div className={`toast-container rounded-full w-96 bg-white py-2 text-center overflow-hidden border ${toast_style[showToast.type][1]}`}>
            {/* {showToast.type === 'success' ? <div className='bg-green-300 py-2'>{showToast.message}</div> : <div></div>} */}
            <span className={`${toast_style[showToast.type][0]} py-2`}>{showToast.type.toUpperCase()}: </span>
            <span>{showToast.message}</span>
            {/* <p>{`${showToast.type.toUpperCase()}: ${showToast.message}`}</p> */}
        </div>,
        document.getElementById('toast')
    )
})

export default Toast
import React from 'react'

const Input = ({type, label, name, value, onChange}) => {
  return (
    <div>
        <label className='text-LightGray'>{label}: <input type={type} name={name} value={value || ''} onChange={onChange} className='border border-l-4 border-LightGray border-l-rose-500 lg:w-80 px-3 py-1 rounded outline-none xl:ml-4'/></label>
    </div>
  )
}

export default Input
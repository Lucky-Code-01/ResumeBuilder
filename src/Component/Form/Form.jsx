import React from 'react'
import './Form.css';
export default function Form({label,handleChange,...props}) {
  return (
    <div className='form-box'>
      <div className='form-content' style={{flexDirection:props.type === 'checkbox' && "row"}}>
         <label>{label}</label>
        <input type="text" {...props} onChange={(e)=>handleChange(e)}/>
      </div>
    </div>
  )
}

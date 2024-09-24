import React from 'react'
import banner from './resume.svg'
import './Header.css';
export default function Header() {
  return (
    <div className='header-container'>
        {/* heading here */}
        <div className='h-box1'>
        <h1><span>Resume</span> that stands out!
        </h1>
        <h1>Make your own resume. <span>It's free</span></h1>
        </div>
        {/* image here */}
        <div className='h-box2'>
            <div className='h-b2-img-div'>
                <img src={banner} alt="" />
            </div>
        </div>
    </div>
  )
}

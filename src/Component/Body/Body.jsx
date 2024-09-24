import React, { useEffect, useRef, useState } from 'react'
import './Body.css';
import ReactToPrint from 'react-to-print';
import { ArrowDown } from 'react-feather';
import Resume from '../Resume/Resume';
import Editor from '../Editor/Editor';
export default function Body() {
    const resumeRef = useRef();

    // here the object of editor header
    const sectionHeads = {
        basicInfo : "Basic Info",
        workExpirence : "Work Expirence",
        project : "Project",
        education : "Education",
        achievements : "Achievements",
        summary : "Summary",
        other : "Other"
    }
    

    // state for resume data storing
    const [resumeInformation, setResumeInformation] = useState({
        [sectionHeads.basicInfo]: {
            id: sectionHeads.basicInfo,
            sectionHeadTitle: sectionHeads.basicInfo,
            detail: {},
        },
        [sectionHeads.workExpirence]: {
            id: sectionHeads.workExpirence,
            sectionHeadTitle: sectionHeads.workExpirence,
            details: [],
        },
        [sectionHeads.project]: {
            id: sectionHeads.project,
            sectionHeadTitle: sectionHeads.project,
            details: [],
        },
        [sectionHeads.education]: {
            id: sectionHeads.education,
            sectionHeadTitle: sectionHeads.education,
            details: [],
        },
        [sectionHeads.achievements]: {
            id: sectionHeads.achievements,
            sectionHeadTitle: sectionHeads.achievements,
            details: [],
        },
        [sectionHeads.summary]: {
            id: sectionHeads.summary,
            sectionHeadTitle: sectionHeads.summary,
            detail: "",
        },
        [sectionHeads.other]: {
            id: sectionHeads.other,
            sectionHeadTitle: sectionHeads.other,
            detail: "",
        }
    })

    const colorpicker = ["#50aaf9","#20826f","#93311c","#f2ae0e","#e94949","#222121"];
    const [boxSelect,SetboxSelected] = useState(5);
    const [textcolor,settextcolor] = useState("");

    // function 
    const handhleColor = (index)=>{
        settextcolor(colorpicker[index]);
        SetboxSelected(index);
    }

    // function for empty feilds
    const handleEmpty = (data)=>{
        let count = data;
    }

  return (
    <>
    <div className='main-body-container'>
        <h1>Resume Builder</h1>
        <div className='color-btn-box'>
            <div className='color-choose-box'>
                {
                    colorpicker.map((element,index)=>{
                        return <div className={`color-box ${boxSelect===index?'selected':''}`} key={index} style={{backgroundColor:element}} onClick={()=>handhleColor(index)}></div>
                    })
                }
            </div>
            <ReactToPrint
                trigger={() => {
                    return <button className='download'>Download <ArrowDown/></button>;
                }}
                content={() =>resumeRef.current}
            />
        </div>
    </div>
    <Editor section = {sectionHeads} resumeInformation = {resumeInformation} setResumeInformation={setResumeInformation} handleEmpty={handleEmpty}/>
    <Resume section = {sectionHeads} resumeInformation = {resumeInformation} textcolor={textcolor} ref={resumeRef}/>
    </>
  )
}

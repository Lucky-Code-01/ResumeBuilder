import React, { useState,useRef, useEffect } from 'react'
import './Editor.css';
import Form from '../Form/Form';

export default function Editor(props) {
    const {section} = props;
    const resumeInformation = props.resumeInformation;
    const setResumeInformation = props.setResumeInformation;
    const markLink = useRef();
    const markText = useRef();
    const[isActive,setIsActive] = useState(Object.keys(section)[0]);

    // logic
    const workExpContent = {
      title: "",
      company: "",
      certificate: "",
      location: "",
      startDate: "",
      endDate: "",
      workDesc: ["", "", ""],
      displayOnResume: false,

    }
    const projectContent = {
      title: "",
      overview: "",
      deployedLink: "",
      githubLink: "",
      projectDesc: ["", "", "", ""],
      displayOnResume: true,

    }
    const educationContent = {
      title: '',
      collegeSchool: "",
      startDate: "",
      endDate: "",
      displayOnResume: true,

    }
    
    const [userbasicInfo,setuserBasicInfo] = useState({
      name:"",
      title: "",
      linkedin: "",
      github: "",
      email: "",
      number: "",
    })
    const[userworkExp,setuserWorkExp] = useState(workExpContent);
    const[userprocon,setuserprocon] = useState(projectContent);
    const[usereducon,setusereducon] = useState(educationContent);
    const [achievementsData, setAchievementsData] = useState(["","","",""]);
    const [summaryData, setSummaryData] = useState({
      summary: "",
    })
    const [otherData, setOtherData] = useState({
        other: "",
    })

    const showBorder = (e)=>{
      markLink.current.style.display = "block";
      markLink.current.style.left = e.offsetLeft + 'px';
      markLink.current.style.width = e.offsetWidth + 'px';
    }

    // generate body
    const basicInfo = (
      <>
      <Form
        label="Name"
        placeholder = "Enter your full name eg. Aashu"
        value = {userbasicInfo.name}
        handleChange = {(e)=>{setuserBasicInfo({...userbasicInfo,name:e.target.value})}}  
      />

      <Form
        label="Title"
        value = {userbasicInfo.title}
        placeholder = "Enter your title eg. Frontend developer"
        handleChange = {(e)=>{setuserBasicInfo({...userbasicInfo,title:e.target.value})}}
      />

      <div className='form-row'>
        <Form
          value = {userbasicInfo.linkedin}
          label="Linkedin Link"
          placeholder = "Enter your linkedin profile link"
          handleChange = {(e)=>{setuserBasicInfo({...userbasicInfo,linkedin:e.target.value})}}
        />
        <Form
        value = {userbasicInfo.github}
        label="Github Link"
        placeholder = "Enter your github profile link"
        handleChange = {(e)=>{setuserBasicInfo({...userbasicInfo,github:e.target.value})}}
        />
      </div>

      <div className='form-row'>
        <Form
          value={userbasicInfo.email}
          label="Email"
          placeholder = "Enter your email"
          handleChange = {(e)=>{setuserBasicInfo({...userbasicInfo,email:e.target.value})}}
        />
        <Form
        value={userbasicInfo.number}
        label="Enter phone"
        type = "number"
        placeholder = "Enter your phone number"
        handleChange = {(e)=>{setuserBasicInfo({...userbasicInfo,number:e.target.value})}}
        />
      </div> 
      
      </>
      
    );

    const workExpBody = (
      <>
          <Form
            label="Title"
            value = {userworkExp.title}
            placeholder="Enter title eg. Frontend developer"
            handleChange={(e)=>setuserWorkExp({...userworkExp, title:e.target.value})}
          />
          <Form
            label="Company Name"
            value = {userworkExp.company}
            placeholder="Enter company name eg. amazon"
            handleChange={(e)=>setuserWorkExp({...userworkExp,company:e.target.value})}
          />
        <div className={"form-row"}>
          <Form
            label="Certificate Link"
            value = {userworkExp.certificate}
            placeholder="Enter certificate link"
            handleChange={(e)=>setuserWorkExp({...userworkExp,certificate:e.target.value})}
          />
          <Form
            label="Location"
            value = {userworkExp.location}
            placeholder="Enter location eg. Remote"
            handleChange={(e)=>setuserWorkExp({...userworkExp,location:e.target.value})}
          />
        </div>
        <div className={"form-row"}>
          <Form
            label="Start Date"
            value = {userworkExp.startDate}
            type="date"
            placeholder="Enter start date of work"
            handleChange={(e)=>setuserWorkExp({...userworkExp,startDate:e.target.value})}
          />
          <Form
            label="End Date"
            value = {userworkExp.endDate}
            type="date"
            placeholder="Enter end date of work"
            handleChange={(e)=>setuserWorkExp({...userworkExp,endDate:e.target.value})}
          />
        </div>
          
        <div className='lable_box'>
          <label className='dynamic-label'>Enter work description</label>
          <Form
            value = {userworkExp.workDesc[0]}
            placeholder="Line 1"
            handleChange={(e)=>setuserWorkExp({...userworkExp,workDesc:[e.target.value,userworkExp.workDesc[1],userworkExp.workDesc[2]]})}
          />
          <Form
            value = {userworkExp.workDesc[1]}
            placeholder="Line 2"
            handleChange={(e)=>setuserWorkExp({...userworkExp,workDesc:[userworkExp.workDesc[0],e.target.value,userworkExp.workDesc[2]]})}
          />
          <Form
            value = {userworkExp.workDesc[2]}
            placeholder="Line 3"
            handleChange={(e)=>setuserWorkExp({...userworkExp,workDesc:[userworkExp.workDesc[0],userworkExp.workDesc[1],e.target.value]})}
          />
          <Form
          label="Display on Resume:"
          type = "checkbox"
          handleChange={(e)=>setuserWorkExp({...userworkExp,displayOnResume:e.target.checked})}
          />
        </div>
      </>
    );

    const projectBody = (
      <>
        <div className={"form-row"}>
          <Form
            label="Title"
            value={userprocon.title}
            placeholder="Enter title eg. Chat app"
            handleChange={(e)=>setuserprocon({...userprocon,title:e.target.value})}
          />
        </div>
        <Form
          label="Overview"
          value={userprocon.overview}
          placeholder="Enter basic overview of project"
          handleChange={(e)=>setuserprocon({...userprocon,overview:e.target.value})}
        />
        <div className={"form-row"}>
          <Form
            label="Deployed Link"
            placeholder="Enter deployed link of project"
            value={userprocon.deployedLink}
            handleChange={(e)=>setuserprocon({...userprocon,deployedLink:e.target.value})}
          />
          <Form
            value={userprocon.githubLink}
            label="Github Link"
            placeholder="Enter github link of project"
            handleChange={(e)=>setuserprocon({...userprocon,githubLink:e.target.value})}
          />
        </div>
          <label className='dynamic-label'>Enter project description</label>
          <Form
            value={userprocon.projectDesc[0]}
            placeholder="Line 1"
            handleChange={(e)=>setuserprocon({...userprocon,projectDesc:[e.target.value,userprocon.projectDesc[1],userprocon.projectDesc[2],userprocon.projectDesc[3]]})}
          />
          <Form
            value={userprocon.projectDesc[1]}
            placeholder="Line 2"
            handleChange={(e)=>setuserprocon({...userprocon,projectDesc:[userprocon.projectDesc[0],e.target.value,userprocon.projectDesc[2],userprocon.projectDesc[3]]})}
          />
          <Form
            value={userprocon.projectDesc[2]}
            placeholder="Line 3"
            handleChange={(e)=>setuserprocon({...userprocon,projectDesc:[userprocon.projectDesc[0],userprocon.projectDesc[1],e.target.value,userprocon.projectDesc[3]]})}
          />
          <Form
            value={userprocon.projectDesc[3]}
            placeholder="Line 4"
            handleChange={(e)=>setuserprocon({...userprocon,projectDesc:[userprocon.projectDesc[0],userprocon.projectDesc[1],userprocon.projectDesc[2],e.target.value]})}
          />
        </>
    );

    const educationBody = (
      <>
        <div className={"form-row"}>
          <Form
            value={usereducon.title}
            label="Title"
            placeholder="Enter title eg. B-tech"
            handleChange={(e)=>setusereducon({...usereducon,title:e.target.value})}
          />
        </div>
        <Form
          value={usereducon.collegeSchool}
          label="College/School Name"
          placeholder="Enter name of your college/school"
          handleChange={(e)=>setusereducon({...usereducon,collegeSchool:e.target.value})}
        />
        <div className={"form-row"}>
          <Form
            value={usereducon.startDate}
            label="Start Date"
            type="date"
            placeholder="Enter start date of this education"
            handleChange={(e)=>setusereducon({...usereducon,startDate:e.target.value})}
          />
          <Form
            value={usereducon.endDate}
            label="End Date"
            type="date"
            placeholder="Enter end date of this education"
            handleChange={(e)=>setusereducon({...usereducon,endDate:e.target.value})}
          />
        </div>
      </>
    );

    const achievementsBody = (
      <>
        <div className='lable_box'>
          <label className='dynamic-label'>List your achievements</label>
          <Form
            value={achievementsData[0]}
            placeholder="Line 1"
            handleChange={(e) => {
              setAchievementsData((prev) => {
                  const newData = [...prev];
                  newData[0] = e.target.value;
                  return newData;
              });
          }}
          />
          <Form
            value={achievementsData[1]}
            placeholder="Line 2"
            handleChange={(e) => {
              setAchievementsData((prev) => {
                  const newData = [...prev];
                  newData[1] = e.target.value;
                  return newData;
              });
          }}
          />
          <Form
            value={achievementsData[2]}
            placeholder="Line 3"
            handleChange={(e) => {
              setAchievementsData((prev) => {
                  const newData = [...prev];
                  newData[2] = e.target.value;
                  return newData;
              });
          }}
          />
          <Form
            value={achievementsData[3]}
            placeholder="Line 4"
            handleChange={(e) => {
              setAchievementsData((prev) => {
                  const newData = [...prev];
                  newData[3] = e.target.value;
                  return newData;
              });
          }}
          />
        </div>
    </>
    );

    const summaryBody = (
      <Form
        label="Summary"
        value={summaryData.summary}
        placeholder="Enter your objective/summary"  
        handleChange={(e)=>setSummaryData({...summaryData,summary:e.target.value})}
      />
    );

    const otherBody = (
      <Form
        value={otherData.other}
        label="Other"
        placeholder="Enter something"
        handleChange={(e)=>setOtherData({...otherData,other:e.target.value})}
      />
    );

    // render body function
    const renderBody = ()=>{
      switch (section[isActive]) {
        case section.basicInfo:
          return basicInfo;
          break;

        case section.workExpirence:
          return workExpBody;
          break;

        case section.project:
          return projectBody;
          break;

        case section.education:
          return educationBody;
          break;

        case section.achievements:
          return achievementsBody;
          break;

        case section.summary:
          return summaryBody;
          break;

        case section.other:
          return otherBody;
          break;
        
        default:
          break;
      }
    }


    // condition for not empty renderations
    let isWorkEmpty = false;
    let isProjectEmpty = false;
    let isEducationEmpty = false;
    if(userworkExp.title === "" && userworkExp.certificate === "" && userworkExp.company === "" && userworkExp.endDate === "" && userworkExp.startDate === "" && userworkExp.location=== "" && userworkExp.workDesc.every((desc)=>desc==="")){
      isWorkEmpty = true;
    }
    if(userprocon.title==="" && userprocon.deployedLink==="" && userprocon.githubLink==="" && userprocon.overview==="" && userprocon.projectDesc.every((desc)=>desc==="")){
      isProjectEmpty = true;
    }
    if(usereducon.title==="" && usereducon.collegeSchool==="" && usereducon.endDate==="" && usereducon.startDate=== ""){
      isEducationEmpty = true;
    }

    // let isAchivementEmpty = achievementsData.every((desc)=>desc==="");
    // let isSummaryEmpty = summaryData.summary === "";
    // let isOtherEmpty = otherData.other ==="";

    // save the info 
    const saveInformation = ()=>{
      setResumeInformation({
        ...resumeInformation,
        [section.basicInfo]:{
          ...resumeInformation[section.basicInfo],
          detail:userbasicInfo
        },
        [section.workExpirence]: isWorkEmpty?
          {...resumeInformation[section.workExpirence]}:{
            ...resumeInformation[section.workExpirence],
            details:[...resumeInformation[section.workExpirence].details,userworkExp]
          },
        [section.project]: isProjectEmpty?
        {...resumeInformation[section.workExpirence]}:{
          ...resumeInformation[section.project],
          details:[...resumeInformation[section.project].details,userprocon]
        },
        [section.education]:isEducationEmpty?
        {...resumeInformation[section.workExpirence]}:{
          ...resumeInformation[section.education],
          details:[...resumeInformation[section.education].details,usereducon]
        },
        [section.achievements]:{
          ...resumeInformation[section.achievements],
          details:achievementsData
        },
        [section.summary]:{
          ...resumeInformation[section.summary],
          detail:summaryData
        },
        [section.other]:{
          ...resumeInformation[section.other],
          detail:otherData
        },
      })
    }

    const handlesave = ()=>{
      saveInformation();
    }

    // functionto empty state
    const emptyState = ()=>{
      props.handleEmpty(setuserBasicInfo);
    }


    // use effect here
    useEffect(()=>{
      console.log(resumeInformation)
      emptyState();
    },[resumeInformation]);

  return (
    <>
    <div className='main-editor'>
      <div className="editor-box">
        <div className='editor-heading-box'>
          <span className='header-boder' ref={markLink}></span>
            {
            Object.keys(section)?.map((key)=>{
              
                return <div className={`header-links ${isActive === key ? 'active':''}`} ref={markText} onMouseOver={(e)=>{setIsActive(key),showBorder(e.target)}} key={key}>{section[key]}</div>
            })
            }
        </div>
        <hr/>

        {renderBody()}
        <button className='save-btn' onClick={handlesave}>Save</button>
      </div>
    </div>
    </>
  )
}


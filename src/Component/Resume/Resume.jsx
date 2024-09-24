import React, { forwardRef, useEffect, useState } from 'react'
import './Resume.css';
import { Mail,Phone,GitHub,Linkedin,Link,Calendar,MapPin} from 'react-feather';
const Resume = forwardRef((props,ref)=> {
  const section = props.section;
  const resumeInformation = props.resumeInformation;
  const textcolor = props.textcolor;
  // state 
  const [column,setColumn] = useState([]);
  useEffect(()=>{
    setColumn([[section.workExpirence,section.project,section.education],[section.achievements,section.summary,section.other]]);
  },[])
  // get names here
  const BasicInfo = resumeInformation[section.basicInfo].detail;
  const workexperience = resumeInformation[section.workExpirence];
  const project = resumeInformation[section.project];
  const education = resumeInformation[section.education];
  const achievements = resumeInformation[section.achievements].details;
  const summary = resumeInformation[section.summary].detail;
  const other = resumeInformation[section.other].detail;


  // drag functionality
  const[target,setTarget] = useState("");
  const[source,setSource] = useState("");

  // function for element swap
  const swapElement = (target,source)=>{
    let tempIndex = [...column];

    if(!source || !target)return; 
    // find index row
    let sourceRow = tempIndex[0].findIndex((item)=>item===source);
    let sourceColumn = 0;
    if(sourceRow === -1){
      sourceColumn = 1;
      sourceRow = tempIndex[1].findIndex((item)=>item===source);
      
    }

    let targetRow = tempIndex[0].findIndex((item)=>item===target);
    let targetColumn = 0;
    if(targetRow === -1){
      targetColumn = 1;
      targetRow = tempIndex[1].findIndex((item)=>item===target);
    }

    let temp = tempIndex[sourceColumn][sourceRow];
    tempIndex[sourceColumn][sourceRow] = tempIndex[targetColumn][targetRow];
    tempIndex[targetColumn][targetRow] = temp;

    setColumn(tempIndex);
  };
  // useeffect 
  useEffect(()=>{
    swapElement(target,source);
  },[source])

  // show resume
  const contentShow = {
    [section.workExpirence]:((
      workexperience.details.length>0?<div className='data' draggable onDragOver={()=>setTarget(section.workExpirence)} onDragEnd={()=>setSource(section.workExpirence)}>
      <p className='re-head'>{workexperience.id}</p>
      {
        workexperience.details.map((workexperience,index)=>{
          return(
            <div key={index + Math.random() * 8}>
              <p>{workexperience.title}</p>
              <p>{workexperience.company}</p>
              {
                workexperience.certificate?<div className='common-flex'>
                <Link style={{color:textcolor}}className='myicon'/>
                <a href={workexperience.certificate} style={{color:textcolor}}>{workexperience.certificate}</a>
              </div>:<span/>
              }
              {
                workexperience.startDate || workexperience.endDate?<div className='common-flex'>
                <Calendar style={{color:textcolor}} className='myicon'/>
                <p>{workexperience.startDate} to {workexperience.endDate}</p>
                </div>:<span/>
              }

              {
                workexperience.location?<div className='common-flex'>
                <MapPin style={{color:textcolor}} className='myicon'/>
                <p>{workexperience.location}</p>
                </div>:<span/>
              }

              {
                workexperience.workDesc>0?<ul style={{marginLeft:"20px"}}>
                {
                  workexperience.workDesc.map((item,index) => {
                      return<li key={index}>{item}</li>
                      
                  })
                }
                </ul>:<span/>
              }
                  
            </div>
          )
        })
      }
    </div>:<span/>
    )),
    [section.project]:((
      project.details.length>0?<div className='data' draggable onDragOver={()=>setTarget(section.project)} onDragEnd={()=>setSource(section.project)}>
        <p className='re-head'>{project.id}</p>
        {
          project.details.map((project,index)=>{
            return (
              <div key={index + Math.random() * 8}>
              {project.title?<p className='com-head'>{project.title}</p>:<span/>}
              {project.overview?<p className='com-head'>{project.overview}</p>:<span/>}
              {project.deployedLink? <div className='common-flex'>
              <Link style={{color:textcolor}} className='myicon'/>
              <a href={project.deployedLink} style={{color:textcolor}}>{project.deployedLink}/</a>
              </div>:<span/>}
              {project.githubLink?<div className='common-flex'>
                <Link style={{color:textcolor}} className='myicon'/>
                <a href={project.githubLink} style={{color:textcolor}}>{project.githubLink}/</a>
              </div>:<span/>}
              {
                project.projectDesc?<ul style={{marginLeft:"20px"}}>
                {
                  project.projectDesc.map((item,index) => {
                    return <li key={index}>{item}</li>
                    
                })
                }
              </ul>:<span/>
              }
              
            </div>
            )
          })
        }
      </div>:<span/>
    )),
    [section.education]:(
      education.details.map((education,index)=>{
        if(education.displayOnResume){
          return(
            <div className='data' key={index + Math.random() * 8} draggable onDragOver={()=>setTarget(section.education)} onDragEnd={()=>setSource(section.education)}>
              <p className='re-head'>Education</p>
              {
                education.title?<p className='com-head'>{education.title}</p>:<span/>
              }
              {
                education.collegeSchool?<div className='common-flex'>
                <i className='bx bxs-graduation myicon extra'  style={{color:textcolor}} ></i>
                <p>{education.collegeSchool}</p>
              </div>:<span/>
              }
              
              {education.startDate && education.endDate?<div className='common-flex'>
                <Calendar style={{color:textcolor}} className='myicon'/>
                <p>{education.startDate} to {education.endDate}</p>
              </div>:<span/>}
              
            </div>
          )
        }
      })
    ),
    [section.achievements]:((
      <div className='data' draggable onDragOver={()=>setTarget(section.achievements)} onDragEnd={()=>setSource(section.achievements)}>
      {achievements[0]?
        <div>
        <p className='re-head'>Achievements</p>
        <ol className='newol'>  
          {
            achievements.map((achive,index)=>{
              return <li key={index}>{achive}</li>
            })
          }
        </ol>
        </div>:<span/>}
      </div>
    )),
    [section.summary]:((
      <div className='data' draggable onDragOver={()=>setTarget(section.summary)} onDragEnd={()=>setSource(section.summary)}>
      {summary.summary?<><p className='re-head'>Summary</p>
      <p style={{marginTop:"5px"}} className='com-head'>{summary.summary}</p></>:<span/>}
    </div>
    )),
    [section.other]:((
    <div className="data" draggable onDragOver={()=>setTarget(section.other)} onDragEnd={()=>setSource(section.other)}>
     {other.other?<><p className='re-head'>other</p>
        <p style={{marginTop:"10px"}} className='com-head'>{other.other}</p>
        </>:<span/>}
    </div>
    ))
  }

  // DragEvent
  // const handledarg=(event)=>{
  //   console.log(event);
  // }

  return (
    <div className='resume-main-box'>
        <div className='resume-box' ref={ref}>
          <div className='basic-info-box' onDrag={(event)=>handledarg(event)}>
            <h1>{BasicInfo.name?BasicInfo.name:"User Name"}</h1>
            <h3 style={{color:textcolor}}>{BasicInfo.title?BasicInfo.title:"User Title"}</h3>
          </div>
          <div className='basic-icon-box' style={{color:textcolor}}>
            <div>
              <Mail style={{color:textcolor}} className='myicon'/>
              <p>{BasicInfo.email?BasicInfo.email:"user@gmail.com"}</p>
            </div>
            <div>
              <Phone style={{color:textcolor}} className='myicon'/>
              <p>{BasicInfo.number?BasicInfo.number:"123456789"}</p>
            </div>
            <div>
              <Linkedin style={{color:textcolor}} className='myicon'/>
              <p>{BasicInfo.linkedin?BasicInfo.linkedin:"linkedin"}</p>
            </div>
            <div>
              <GitHub style={{color:textcolor}} className='myicon'/>
              <p>{BasicInfo.github?BasicInfo.github:"Github Link"}</p>
            </div>
          </div>

          {/* other information */}
          <div className='second-info-box'>
            <div className="s-info-box1">
              {
                column[0]?.map((section,index)=>(
                  <div key={index}>
                    {contentShow[section]}
                  </div>
                ))
              }
            </div>
            <div className="s-info-box2"> 
              {
                column[1]?.map((section,index)=>(
                  <div key={index}>
                    {contentShow[section]}
                  </div>
                ))
              }
            </div>
          </div>
        </div>
    </div>
  )
});

export default Resume;
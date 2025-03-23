import React,  { useContext  } from 'react'
import noteContext from '../context/notes/noteContext';


const About = () => {
  const a = useContext(noteContext)
  // After (fix: remove or use it)
console.log(a);
  return (

<div className="about-container">
    <h2 >Yugal Kishore</h2>
    <p>Front-end & Back-end Developer <br /> Web Developer <br /> Designer </p>
    <div className="social-icons">
        <a href="https://github.com/Yugalkishore-j?tab=repositories" target="_blank" rel="noreferrer noopener"><i className="fab fa-github"></i></a>
        <a href="https://www.linkedin.com/in/yugal-kishore-317bb8337/" target="_blank" rel="noreferrer noopener"><i className="fab fa-linkedin"></i></a>
    </div>
</div>
   
  )
}

export default About ;

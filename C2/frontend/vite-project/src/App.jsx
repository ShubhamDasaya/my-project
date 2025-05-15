import React, { useEffect } from "react";
import './App.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RouterConfig from "./RouterConfig";

import image1 from '../public/image1.jpg'
import image2 from '../public/image2.jpg'
import image3 from '../public/image3.jpg'

const images = [image1,image2,image3];
let index = 0;

function changeBackground() {
  document.body.style.backgroundImage = `url('${images[index]}')`;
  index = (index + 1) % images.length;
}



function App() {
  useEffect(()=>{
    let intervalId = setInterval(changeBackground, 4000); 
    return ()=>{
      if(intervalId)clearInterval(intervalId)
      }

  },[])

  return (
    <>
     <ToastContainer position="top-right" autoClose={1000} />
    <RouterConfig/>
    </>
  )
}

export default App;

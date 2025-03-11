import React, { useEffect, useState } from 'react'

const CleanupExample = () => {
    const [windoWidth,setWindowWidth]=useState(window.innerWidth);

    useEffect(()=>{
        const handleSize = () =>{
        setWindowWidth(Window.windoWidth);
        }
        window.addEventListener('resize',handleSize);
        return()=>{
            window.removeEventListener('resize',handleSize);
        }
    },[])
  return (
    <div>
        <h1>Clean Up Example</h1>
        <p>window Width:{windoWidth}px</p>
      
    </div>
  )
}

export default CleanupExample

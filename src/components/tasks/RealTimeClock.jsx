import React, { useEffect, useState } from 'react'

const RealTimeClock = () => {
    const [time,setTime]=useState(new Date());

    useEffect(()=>{
        const Interval = setInterval(() => {
            setTime(new Date());
            
        },1000);
        return ()=> clearInterval(Interval);
    },[])
    const formattedTime = time.toLocaleTimeString();

  return (
    <div>
        <h2>Real Time Clock Example</h2>
        <p>Time:{formattedTime}</p>
      
    </div>
  )
}

export default RealTimeClock;

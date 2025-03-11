import React, { useEffect, useState } from 'react'

const SimpleCounter = () => {
    const [count, setCount]=useState(0);

    useEffect(()=>{
        const interval = setInterval(()=>{
            setCount(preCount=> preCount+1)

        },1000)
        return ()=>clearInterval(interval)
    },[])



  return (
    <div>
        <h2>Real Time Count</h2>
        <p>Count:{count}</p>
      
    </div>
  )
}

export default SimpleCounter;

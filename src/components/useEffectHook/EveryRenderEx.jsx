import React, { useEffect, useState } from 'react'

const EveryRenderEx = () => {
    const [count,setCount]=useState(0);

    useEffect(()=>{
        console.log("Effect ran after every render!");
    })

  return (
    <div>
        <h1>Every Render Example</h1>
        <p>Count:{count}</p>
        <button onClick={()=>setCount(count+1)}>Increment</button>
      
    </div>
  )
}

export default EveryRenderEx

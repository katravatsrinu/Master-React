import React, { useEffect, useState } from 'react'

const DependencyChangeExample = () => {
    const[count,setCount]=useState(0);
    const[message,setMessage]=useState('');

    useEffect(()=>{
        setMessage(`Count is now:${count}`);
    },[count])



  return (
    <div>
        <h1>Dependency Change Example</h1>
        <p>{message}</p>
        <button onClick={()=>setCount(count+1)}>Increment</button>
      
    </div>
  )
}

export default DependencyChangeExample

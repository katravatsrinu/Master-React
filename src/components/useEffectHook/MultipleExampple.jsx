import React, { useEffect, useState } from 'react'

const MultipleExampple = () => {
    const [count,setCount]=useState(0);
    const [message,setMessage]=useState('');

    useEffect(()=>{
        console.log("Component mounted");
    },[]);

    useEffect(()=>{
        setMessage(`Count is now:${count}`);
    },[count])



  return (
    <div>
        <h1>Multiple Effects Example</h1>
        <p>{message}</p>
        <button onClick={()=> setCount(count+1)}>Increment</button>
      
    </div>
  )
}

export default MultipleExampple

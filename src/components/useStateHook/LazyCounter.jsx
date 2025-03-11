import React, { useState } from 'react'

function computer(){
    let sum=0;
    for (let i=0;i<=100;i++){
        sum+=i;
    }
    return sum;
}

const LazyCounter = () => {
    const [count,setCount]=useState(computer);
    
    const Increment = () =>{
        setCount(count+1)
    };


  return (
    <div>
        <p>Count:{count}</p>
        <button onClick={Increment}>Increment</button>
    </div>
  )
}

export default LazyCounter

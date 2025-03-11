import React, { useState } from 'react'

const AsyncCounter = () => {
    const [count,setCount] = useState(10);

    const incrementAsync=()=>{
        setCount(count+1)
        setCount(count+3)
        setCount(count+2)

    }

  return (
    <div>
        <p>Count:{count}</p>
        <button onClick={incrementAsync}>Increment</button>
      
    </div>
  )
}

export default AsyncCounter

import React, { useEffect, useState } from 'react'

const RunOnceExample = () => {
    const [data,setData] = useState(null);

    useEffect(()=>{
        console.log("Component Mounted");
        fetch("https://fakestoreapi.com/products")
        .then((Response) => Response.json())
        .then((json)=>setData(json))
    },[])


  return (
    <div>
        <h1>Run Once Example</h1>
        <pre>{JSON.stringify(data,null,2)}</pre>
      
    </div>
  )
}

export default RunOnceExample

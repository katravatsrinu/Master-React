import React, { useState } from 'react'

const Userprofile = () => {

    const [profile, setProfile]=useState({name:"srinu nayak",age:23});

    const updateName=()=>{
        setProfile({...profile,name:"srinu"})
    }

  return (
    <div>
      <p>UserName:{profile.name}</p>
      <p>Age:{profile.age}</p>
      <button onClick={updateName}>Update</button>
    </div>
  )
}

export default Userprofile

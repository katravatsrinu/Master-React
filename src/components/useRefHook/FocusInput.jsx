import React, { useRef } from 'react'

const FocusInput = () => {
    const inputRef = useRef(null);

    const handleClick=()=>{
        inputRef.current.focus();
    }
  return (
    <div>
        <h1>Focus Input Example getting DOM Elements</h1>
        <input ref={inputRef} type="text" placeholder='Type something...'/>
        <button onClick={handleClick}>Focus</button>
    </div>
  )
}

export default FocusInput

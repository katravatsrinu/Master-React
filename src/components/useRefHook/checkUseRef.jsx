import React, { useRef, useState, useEffect } from 'react'

const CheckUseRef = () => {
    const [count, setCount] = useState(0);
    const [list, setList] = useState([]);

    const reference = useRef({ name: "sreenu", age: 23 });

    useEffect(() => {
        setList(prevList => [...prevList, reference]);
    }, [reference]);  // Update list whenever reference changes

    useEffect(() => {
        if (list.length === 2) {
            console.log(list);
            console.log(list[0] === list[1]);
        }
    }, [list]);  // Run logic when list changes

    return (
        <div>
            <h1>UseRef Example</h1>
            {/* You can display or interact with the input here */}
        </div>
    )
}

export default CheckUseRef;

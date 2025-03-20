import React, { useEffect, useState } from 'react'

const Items = () => {
  const [users, setUser] = useState([]);

  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((data) =>{
      const sortedNames = data.sort((a,b) => a.name.localeCompare(b.name));
      setUser(sortedNames)
    })
    .catch(error => console.error("Error fetching data:",error))

  },[])

  return (
    <div>
      <h2>User</h2>
        <ul>
          {users.map(user =>(
            <li key={user.id}>{user.name}</li>
          )) }
        </ul>
      
      
    </div>
  )
}

export default Items;

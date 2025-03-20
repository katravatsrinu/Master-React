import React, { useEffect, useState } from 'react'

const SearchFunctionality = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm,setSearchTerm] = useState("");

    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/users')
        .then((res) => res.json())
        .then((data) => setUsers(data))
        .catch(error => console.error("Error fetching data:"))
    },[]);

    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );



  return (
    <div>
        <h2>Search Users</h2>
        <input type="text" 
        placeholder='Search by name...'
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        />
        <ul>
            {filteredUsers.map(user => (
                <li key={user.id}>{user.name}</li>
            ))}
        </ul>
    </div>
  )
}

export default SearchFunctionality

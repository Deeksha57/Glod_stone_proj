import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState('');
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditUser = (userId) => {
    const user = users.find((user) => user._id === userId);
    if (user) {
      setEditUserId(userId);
      setEditedName(user.name);
      setEditedEmail(user.email);
    } else {
      console.error('User not found');
    }
  };
  
  

  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(`/api/users/${editUserId}`, {
        name: editedName,
        email: editedEmail,
      });
      const updatedUser = response.data;
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user._id === updatedUser._id ? updatedUser : user))
      );
      setEditUserId('');
      setEditedName('');
      setEditedEmail('');
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div>
      <h1>User Data</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                {editUserId === user.id ? (
                  <div>
                    <input
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                    />
                    <input
                      type="text"
                      value={editedEmail}
                      onChange={(e) => setEditedEmail(e.target.value)}
                    />
                    <button onClick={handleSaveChanges}>Save Changes</button>
                  </div>
                ) : (
                  <button onClick={() => handleEditUser(user.id)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

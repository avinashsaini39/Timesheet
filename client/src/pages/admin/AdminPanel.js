import React, { useEffect, useState } from 'react';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);


    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const response = await axios.get(`${apiUrl}/api/users`);
        setUsers(response.data);
    };

    const handleDelete = async (id) => {
        await axios.delete(`${apiUrl}/api/users/${id}`);
        fetchUsers();
    };

    const handleEdit = (user) => {
        setIsEditing(true);
        setCurrentUser(user);
    };

    const handleUpdate = async () => {
        await axios.put(`${apiUrl}}/api/users/${currentUser._id}`, currentUser);
        fetchUsers();
        setIsEditing(false);
        setCurrentUser(null);
    };

    return (
        <div>
            <h2>Admin Panel</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Employee ID</th>
                        <th>Email</th>
                        <th>Designation</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.employeeId}</td>
                            <td>{user.email}</td>
                            <td>{user.designation}</td>
                            <td>
                                <button onClick={() => handleEdit(user)}>Edit</button>
                                <button onClick={() => handleDelete(user._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isEditing && (
                <div>
                    <h3>Edit User</h3>
                    <input
                    type="text"
                    value={currentUser.name}
                    onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
                    />

                    <input 
                    type="text"
                    value={currentUser.employeeId}
                    onChange={(e) => setCurrentUser({ ...currentUser, employeeId: e.target.value })}
                    />


                    <input
                    type="email"
                    value={currentUser.email}
                    onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
                    />


                    <input
                    type="text"
                    value={currentUser.designation}
                    onChange={(e) => setCurrentUser({ ...currentUser, designation: e.target.value })}
                    />
                    <button onClick={handleUpdate}>Update</button>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
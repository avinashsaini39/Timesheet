import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const SetPassword = () => {
    const [users, setUsers] = useState([]);
    const [passwords, setPasswords] = useState({}); // Object to keep track of passwords for each user

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/users`);
            setUsers(response.data);
        } catch (error) {
            toast.error('Failed to fetch users');
        }
    };

    const handlePasswordChange = (id, newPassword) => {
        setPasswords((prevPasswords) => ({
            ...prevPasswords,
            [id]: newPassword,
        }));
    };

    const handlePasswordUpdate = async (id, newPassword) => {
        try {
            await axios.post(`${apiUrl}/api/users`, {
                userId: id,
                password: newPassword,
            });
            toast.success('Password updated successfully');
        } catch (error) {
            toast.error('Failed to set password');
        }
    };

    const handleKeyPress = (e, id, newPassword) => {
        if (e.key === 'Enter') {
            handlePasswordUpdate(id, newPassword);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Set Password</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">New Password</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <input
                                        type="password"
                                        value={passwords[user._id] || ''}
                                        onChange={(e) => handlePasswordChange(user._id, e.target.value)}
                                        onKeyDown={(e) => handleKeyPress(e, user._id, passwords[user._id])}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                                        placeholder="Enter new password"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SetPassword;

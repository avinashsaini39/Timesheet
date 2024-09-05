import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import { Menu } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import Footer from '../footer/Footer';

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const UserDashboard = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        employeeId: '',
        designation: ''
    });
    const [date, setDate] = useState('');
    const [hours, setHours] = useState('');
    const [task, setTask] = useState('');
    const [entries, setEntries] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetchUser();
        fetchEntries();
    }, []);

    const fetchUser = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const userId = decodedToken.id;

                const { data } = await axios.get(`${apiUrl}/api/users/${userId}`);
                setUser(data);
            } catch (error) {
                toast.error('Failed to fetch user data');
            }
        } else {
            toast.error('No token found');
        }
    };

    const fetchEntries = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const userId = decodedToken.id;

                const { data } = await axios.get(`${apiUrl}/api/users/${userId}`);
                setEntries(data.entries);
            } catch (error) {
                toast.error('Failed to fetch entries');
            }
        } else {
            toast.error('No token found');
        }
    };

    const handleSubmit = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const userId = decodedToken.id;

                const newEntry = { date, hours, task };

                await axios.put(`${apiUrl}/api/users/${userId}`, {
                    entries: [newEntry]
                });

                toast.success('Entry submitted successfully');
                setDate('');
                setHours('');
                setTask('');
                fetchEntries();
            } catch (error) {
                toast.error('Failed to submit entry');
            }
        } else {
            toast.error('No token found');
        }
    };

    const handleCancel = () => {
        setDate('');
        setHours('');
        setTask('');
    };

    const handleLogout = () => {
        localStorage.clear();
        toast.info('Logged out successfully');
        navigate('/');
    };

    return (
        <>
        <div className="p-6 bg-gray-100 min-h-screen">
            {/* Heading */}
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-blue-700">User Dashboard</h2>
                <Menu as="div" className="relative inline-block text-left">
                    <Menu.Button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700">
                        Options
                    </Menu.Button>
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg focus:outline-none">
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    className={`${active ? 'bg-gray-100' : ''} group flex rounded-md items-center w-full px-2 py-2 text-sm text-gray-700`}
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            )}
                        </Menu.Item>
                    </Menu.Items>
                </Menu>
            </div>

            {/* User Information */}
            <div className="mb-6">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <strong>Name:</strong> {user.name}
                        </div>
                        <div>
                            <strong>Email:</strong> {user.email}
                        </div>
                        <div>
                            <strong>Employee ID:</strong> {user.employeeId}
                        </div>
                        <div>
                            <strong>Designation:</strong> {user.designation}
                        </div>
                    </div>
                </div>
            </div>

            {/* Add New Entry Form */}
            <div className="mb-6">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Entry</h2>
                    <div className="mb-4 flex space-x-4">
    <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-auto px-4 py-2 border border-gray-300 rounded-md"
        />
    </div>
    <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700">Hours</label>
        <input
            type="number"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            className="mt-1 block w-auto px-4 py-2 border border-gray-300 rounded-md"
        />
    </div>
</div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Task</label>
                        <textarea
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                            rows="3"
                        />
                    </div>
                    <div className="flex space-x-4">
                        <button
                            onClick={handleSubmit}
                            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700"
                        >
                            Submit
                        </button>
                        <button
                            onClick={handleCancel}
                            className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-md shadow-md hover:bg-gray-700"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>

            {/* Table of Entries */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Previous Entries</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {entries.map((entry, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.hours}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.task}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <Footer/>
        </>
    );
};

export default UserDashboard;

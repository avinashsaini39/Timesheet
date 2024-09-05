import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Dialog, Transition, Tab } from '@headlessui/react';
import { useNavigate } from 'react-router-dom'; // For navigation after logout
import UsersTable from './UserTable';
import SetPassword from './SetPassword'; // Import the new component

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState('users'); // To manage tab selection
    const navigate = useNavigate();

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

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${apiUrl}/api/users/${id}`);
            toast.success('User deleted successfully');
            fetchUsers();
        } catch (error) {
            toast.error('Failed to delete user');
        }
    };

    const handleEdit = (user) => {
        setIsEditing(true);
        setCurrentUser(user);
        setIsOpen(true);
    };

    const handleAddNew = () => {
        setIsEditing(false);
        setCurrentUser({ name: '', employeeId: '', email: '', designation: '' });
        setIsOpen(true);
    };

    const handleUpdate = async () => {
        try {
            if (isEditing) {
                await axios.put(`${apiUrl}/api/users/${currentUser._id}`, currentUser);
                toast.success('User updated successfully');
            } else {
                await axios.post(`${apiUrl}/api/users`, currentUser);
                toast.success('User added successfully');
            }
            fetchUsers();
            setIsOpen(false);
            setCurrentUser(null);
        } catch (error) {
            toast.error('Failed to update user');
        }
    };

    const closeModal = () => {
        setIsOpen(false);
        setCurrentUser(null);
    };

    // Logout function to clear local storage and navigate to login page
    const handleLogout = () => {
        localStorage.clear();
        toast.success('Logged out successfully');
        navigate('/'); // Adjust this path to your login route
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-8">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-4xl font-extrabold text-gray-800">Admin Panel</h2>
                <div className="flex space-x-4">
                    <button
                        onClick={handleAddNew}
                        className="px-5 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
                    >
                        Add New User
                    </button>
                    <button
                        onClick={handleLogout}
                        className="px-5 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition"
                    >
                        Logout
                    </button>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <Tab.Group>
                    <Tab.List className="flex space-x-4 mb-4">
                        <Tab
                            className={({ selected }) =>
                                `py-2 px-4 rounded-lg font-semibold ${selected ? 'bg-blue-500 text-white' : 'text-blue-500'}`  
                            }
                            onClick={() => setSelectedTab('users')}
                        >
                            Users
                        </Tab>
                        <Tab
                            className={({ selected }) =>
                                `py-2 px-4 rounded-lg font-semibold ${selected ? 'bg-blue-500 text-white' : 'text-blue-500'}`  
                            }
                            onClick={() => setSelectedTab('setPassword')}
                        >
                            Set Password
                        </Tab>
                    </Tab.List>

                    <Tab.Panels>
                        <Tab.Panel>
                            <UsersTable users={users} handleEdit={handleEdit} handleDelete={handleDelete} />
                        </Tab.Panel>
                        <Tab.Panel>
                            <SetPassword />
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>

            {/* Headless UI Modal for Add/Edit */}
            <Transition appear show={isOpen} as={React.Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={React.Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-full p-4 text-center">
                            <Transition.Child
                                as={React.Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
                                    <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
                                        {isEditing ? 'Edit User' : 'Add New User'}
                                    </Dialog.Title>

                                    <div className="mt-4">
                                        <label className="block text-sm font-medium text-gray-700">Name</label>
                                        <input
                                            type="text"
                                            value={currentUser?.name || ''}
                                            onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
                                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <label className="block text-sm font-medium text-gray-700">Employee ID</label>
                                        <input
                                            type="text"
                                            value={currentUser?.employeeId || ''}
                                            onChange={(e) => setCurrentUser({ ...currentUser, employeeId: e.target.value })}
                                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <label className="block text-sm font-medium text-gray-700">Email</label>
                                        <input
                                            type="email"
                                            value={currentUser?.email || ''}
                                            onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
                                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <label className="block text-sm font-medium text-gray-700">Designation</label>
                                        <input
                                            type="text"
                                            value={currentUser?.designation || ''}
                                            onChange={(e) => setCurrentUser({ ...currentUser, designation: e.target.value })}
                                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                                        />
                                    </div>

                                    <div className="mt-6">
                                        <button
                                            onClick={handleUpdate}
                                            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                                        >
                                            {isEditing ? 'Update User' : 'Add User'}
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default AdminPanel;

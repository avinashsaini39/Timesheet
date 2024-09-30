import React, { useState } from 'react';
import TaskModal from './TaskModal';


const UsersTable = ({ users, handleEdit, handleDelete }) => {
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [selectedTasks, setSelectedTasks] = useState([]);

    const openTaskModal = (tasks) => {
        setSelectedTasks(tasks);
        setIsTaskModalOpen(true);
    };

    const closeTaskModal = () => {
        setIsTaskModalOpen(false);
        setSelectedTasks([]);
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="py-3 px-4 text-left text-gray-600">Name</th>
                        <th className="py-3 px-4 text-left text-gray-600">Employee ID</th>
                        <th className="py-3 px-4 text-left text-gray-600">Email</th>
                        <th className="py-3 px-4 text-left text-gray-600">Designation</th>
                        <th className="py-3 px-4 text-left text-gray-600">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}
                            className="hover:bg-gray-50"
                            onClick={() => openTaskModal(user.entries)}
                            >
                            <td className="py-3 px-4 border-b">{user.name}</td>
                            <td className="py-3 px-4 border-b">{user.employeeId}</td>
                            <td className="py-3 px-4 border-b">{user.email}</td>
                            <td className="py-3 px-4 border-b">{user.designation}</td>
                            <td className="py-3 px-4 border-b flex space-x-2">
                                <button
                                   onClick={(e) => { e.stopPropagation(); handleEdit(user); }}
                                    className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleDelete(user._id); }}
                                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Task Modal */}
            <TaskModal
                isOpen={isTaskModalOpen}
                closeModal={closeTaskModal}
                tasks={selectedTasks}
            />
        </div>
    );
};

export default UsersTable;

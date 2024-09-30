import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

const TaskModal = ({ isOpen, closeModal, tasks }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [viewTask, setViewTask] = useState(null); // To hold the task to view
    const [startDate, setStartDate] = useState(''); // Start date for filtering
    const [endDate, setEndDate] = useState(''); // End date for filtering
    const tasksPerPage = 10;

    // Filter tasks by date
    const filteredTasks = tasks.filter((task) => {
        const taskDate = new Date(task.date);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;
        return (!start || taskDate >= start) && (!end || taskDate <= end);
    });

    // Calculate total pages
    const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

    // Get current tasks for pagination
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

    // Handle viewing the full task
    const handleViewTask = (task) => {
        setViewTask(task); // Set the task to be viewed
    };

    // Handle closing the full task modal
    const handleCloseViewTask = () => {
        setViewTask(null);
    };

    return (
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
                            <Dialog.Panel className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
                                <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
                                    User Tasks
                                </Dialog.Title>

                                {/* Date Filter */}
                                <div className="mt-4 flex justify-between space-x-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Start Date</label>
                                        <input
                                            type="date"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">End Date</label>
                                        <input
                                            type="date"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="mt-4 overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {currentTasks.length > 0 ? (
                                                currentTasks.map((task, index) => (
                                                    <tr key={index}>
                                                        <td className="px-6 py-4 whitespace-nowrap">{new Date(task.date).toLocaleDateString()}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">{task.hours}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            {task.task.split(' ').slice(0, 3).join(' ')}...
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <button
                                                                onClick={() => handleViewTask(task.task)}
                                                                className="text-blue-600 hover:text-blue-900"
                                                            >
                                                                View
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="4" className="px-6 py-4 text-center">No tasks found for this user.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Pagination */}
                                {filteredTasks.length > tasksPerPage && (
                                    <div className="mt-4 flex justify-between items-center">
                                        <button
                                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                            disabled={currentPage === 1}
                                            className={`px-4 py-2 bg-gray-200 rounded-lg ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'}`}
                                        >
                                            Previous
                                        </button>
                                        <span>Page {currentPage} of {totalPages}</span>
                                        <button
                                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                            disabled={currentPage === totalPages}
                                            className={`px-4 py-2 bg-gray-200 rounded-lg ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'}`}
                                        >
                                            Next
                                        </button>
                                    </div>
                                )}

                                <div className="mt-6">
                                    <button
                                        onClick={closeModal}
                                        className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                                    >
                                        Close
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>

                {/* Full Task Modal */}
                {viewTask && (
                    <Transition appear show={viewTask !== null} as={React.Fragment}>
                        <Dialog as="div" className="relative z-20" onClose={handleCloseViewTask}>
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                                        <Dialog.Panel className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
                                            <Dialog.Title className="text-lg font-medium text-gray-900">
                                                Full Task
                                            </Dialog.Title>
                                            <div className="mt-4">
                                                <p>{viewTask}</p>
                                            </div>
                                            <div className="mt-6">
                                                <button
                                                    onClick={handleCloseViewTask}
                                                    className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                                                >
                                                    Close
                                                </button>
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </Dialog>
                    </Transition>
                )}
            </Dialog>
        </Transition>
    );
};

export default TaskModal;

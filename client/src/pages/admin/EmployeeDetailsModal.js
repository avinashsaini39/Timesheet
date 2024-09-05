import React, { useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';

const EmployeeDetailsModal = ({ isOpen, closeModal, employeeData }) => {
    const [searchDate, setSearchDate] = useState('');
    const [filteredEntries, setFilteredEntries] = useState([]);

    useEffect(() => {
        if (employeeData && employeeData.entries) {
            if (searchDate) {
                setFilteredEntries(
                    employeeData.entries.filter((entry) =>
                        entry.date.toString().includes(searchDate) // Convert Date object to string for comparison
                    )
                );
            } else {
                setFilteredEntries(employeeData.entries);
            }
        }
    }, [searchDate, employeeData]);

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
                            <Dialog.Panel className="max-w-4xl w-full bg-white p-6 rounded-lg shadow-lg">
                                <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
                                    Employee Details
                                </Dialog.Title>

                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700">Search by Date</label>
                                    <input
                                        type="text"
                                        value={searchDate}
                                        onChange={(e) => setSearchDate(e.target.value)}
                                        placeholder="Enter date (YYYY-MM-DD)"
                                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                                    />
                                </div>

                                {employeeData && employeeData.entries ? (
                                    <div className="mt-6">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Date
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Hours
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Task
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {filteredEntries.length > 0 ? (
                                                    filteredEntries.map((entry, index) => (
                                                        <tr key={index}>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                {new Date(entry.date).toLocaleDateString()}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                {entry.hours}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                {entry.task}
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">
                                                            No entries found
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="mt-6 text-center text-gray-500">
                                        No employee data available
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
            </Dialog>
        </Transition>
    );
};

export default EmployeeDetailsModal;

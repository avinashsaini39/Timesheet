import React from 'react';

const TaskModal = ({ isOpen, onClose, task }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                <h2 className="text-2xl font-semibold mb-4">Task Details</h2>
                <p>{task}</p>
                <button
                    onClick={onClose}
                    className="mt-6 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default TaskModal;

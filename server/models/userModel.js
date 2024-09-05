import mongoose from 'mongoose';

// Define schema for entries
const entrySchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    hours: {
        type: Number,
        required: true,
    },
    task: {
        type: String,
        required: true,
    }
});

// Updated User Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    employeeId: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
    designation: {
        type: String,
    },
    password: {
        type: String,
    },
    entries: [entrySchema]  // Array of entries with date, hours, task
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;

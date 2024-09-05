import User from '../models/userModel.js';


export const createUser = async (req, res) => {
    const { name, employeeId, email, designation } = req.body;

    try {
        const newUser = new User({ name, employeeId, email, designation });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, employeeId, email, designation } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name, employeeId, email, designation },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
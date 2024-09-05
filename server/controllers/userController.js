import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';



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

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params; // Extract the user ID from the route parameters
        const user = await User.findById(id); // Use Mongoose's findById method to retrieve the user

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



// export const updateUser = async (req, res) => {
//     const { id } = req.params;
//     const { name, employeeId, email, designation, password } = req.body;

//     try {
//         // Find the user by ID
//         const user = await User.findById(id);
//         if (!user) return res.status(404).json({ message: 'User not found' });

//         // Update fields
//         if (name) user.name = name;
//         if (employeeId) user.employeeId = employeeId;
//         if (email) user.email = email;
//         if (designation) user.designation = designation;

//         // Hash the new password if provided
//         if (password) {
//             const salt = await bcrypt.genSalt(10);
//             user.password = await bcrypt.hash(password, salt);
//         }

//         // Save the updated user
//         const updatedUser = await user.save();
//         res.status(200).json(updatedUser);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, employeeId, email, designation, password, entries } = req.body;

    try {
        // Find the user by ID
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Update fields
        if (name) user.name = name;
        if (employeeId) user.employeeId = employeeId;
        if (email) user.email = email;
        if (designation) user.designation = designation;

        // Hash the new password if provided
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        // If entries are provided, push them to the entries array
        if (entries && entries.length > 0) {
            user.entries.push(...entries);  // Add multiple entries
        }

        // Save the updated user
        const updatedUser = await user.save();
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
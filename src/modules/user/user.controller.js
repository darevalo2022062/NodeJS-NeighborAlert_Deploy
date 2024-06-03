import bcryptjs from 'bcryptjs';
import User from './user.model.js';
import { validateAdmin } from '../../helpers/data-methods.js';
import { isToken } from '../../helpers/tk-methods.js';

const handleResponse = (res, promise) => {
    promise
        .then(data => res.status(200).json(data))
        .catch(error => {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
};

const validateUserRequest = async (req, res) => {
    try {
        const user = await isToken(req, res);
        if (user.role === 'ADMIN') {
            return true;
        }
        return false;  
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

export const getUsers = async (req, res) => {
    const isAdmin = await validateUserRequest(req, res);
    if (isAdmin) {
        handleResponse(res, User.find({ status: true }));
    } else {
        return res.status(403).json({ error: "Access denied, you are not an ADMIN" });
    }
};

export const getUser = async (req, res) => {
    const { id } = req.params;
    const user = await isToken(req, res);
    
    if (user.role === 'ADMIN' || user._id.toString() === id) {
        handleResponse(res, User.findById(id));
    } else {
        return res.status(403).json({ error: "You can only view your account" });
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const user = await isToken(req, res);
    
    if (user._id.toString() === id) {
        const { name, lastName, phone, pass, img, idCommunity } = req.body;
        const newData = { name, lastName, phone, img, idCommunity };

        if (pass) {
            const salt = bcryptjs.genSaltSync();
            newData.pass = bcryptjs.hashSync(pass, salt);
        }

        handleResponse(res, User.findOneAndUpdate({ _id: id, status: true }, { $set: newData }, { new: true }));
    } else {
        return res.status(403).json({ error: "You can only edit your account" });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    const user = await isToken(req, res);
    
    if (user._id.toString() === id || user.role === 'ADMIN') {
        handleResponse(res, User.findByIdAndUpdate(id, { status: false }, { new: true }));
    } else {
        return res.status(403).json({ error: "You can only delete your account" });
    }
};

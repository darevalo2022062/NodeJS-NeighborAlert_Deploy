import bcryptjs from 'bcryptjs';
import User from './user.model.js';

const handleResponse = (res, promise) => {
    promise
        .then(data => res.status(200).json(data))
        .catch(error => {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
};


export const getUsers = async (req, res) => {
    handleResponse(res, User.find({ status: true }));
};

export const getUser = async (req, res) => {
    const { id } = req.params;
    handleResponse(res, User.findById(id));
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, lastName, phone, pass, img, idCommunity } = req.body;
    const newData = { name, lastName, phone, img, idCommunity };

    if (pass) {
        const salt = bcryptjs.genSaltSync();
        newData.pass = bcryptjs.hashSync(pass, salt);
    }

    handleResponse(res, User.findOneAndUpdate({ _id: id, status: true }, { $set: newData }, { new: true }));
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    handleResponse(res, User.findByIdAndUpdate(id, { status: false }, { new: true }));
};
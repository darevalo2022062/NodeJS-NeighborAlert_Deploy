import bcryptjs from 'bcryptjs';
import User from './user.model.js';
import { isToken } from '../../helpers/tk-methods.js';
import { handleResponse } from '../../helpers/handle-resp.js';
import { validateAdminRequest } from '../../helpers/controller-checks.js'; 
import { logger } from '../../helpers/logger.js';
const log = logger.child({path: 'user/user.controller.js'});

export const getUsers = async (req, res) => {
    log.info('Start getting users');
    const isAdmin = await validateAdminRequest(req, res);
    if (isAdmin) {
        handleResponse(res, User.find({ status: true }));
    } else {
        return res.status(403).json({ error: "Access denied, you are not an ADMIN" });
    }
};

export const getUser = async (req, res) => {
    log.info('Start getting user');
    const { id } = req.params;
    const user = await isToken(req, res);
    
    if (user.role === 'ADMIN' || user._id.toString() === id) {
        handleResponse(res, User.findById(id));
    } else {
        return res.status(403).json({ error: "You can only view your account" });
    }
};

export const updateUser = async (req, res) => {
    log.info('Start updating user');
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
    log.info('Start deleting user');
    const { id } = req.params;
    const user = await isToken(req, res);
    
    if (user._id.toString() === id || user.role === 'ADMIN') {
        handleResponse(res, User.findByIdAndUpdate(id, { status: false }, { new: true }));
    } else {
        return res.status(403).json({ error: "You can only delete your account" });
    }
};
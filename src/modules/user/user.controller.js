import bcryptjs from 'bcryptjs';
import User from './user.model.js';
import Community from '../community/community.model.js';
import { isToken } from '../../helpers/tk-methods.js';
import { handleResponse } from '../../helpers/handle-resp.js';
import { validateAdminRequest, validateSPAdminRequest } from '../../helpers/controller-checks.js';
import { logger } from '../../helpers/logger.js';
import { validateCodeAccess } from '../../helpers/data-methods.js';

export const getUsers = async (req, res) => {
    logger.info('Start getting users');
    const isAdmin = await validateSPAdminRequest(req, res);
    if (isAdmin) {
        handleResponse(res, User.find({ status: true }));
    } else {
        logger.error('Access denied, you are not an ADMIN');
        return res.status(403).json({ error: "Access denied, you are not an ADMIN" });
    }
};

export const enterCommunity = async (req, res) => {
    logger.info('Start entering community');
    const user = await isToken(req, res);
    const { codeAccess } = req.body;

    validateCodeAccess(codeAccess);
    const community = await Community.findOne({ codeAccess });
    const newData = { idCommunity: community._id };

    handleResponse(res, User.findOneAndUpdate({ _id: user._id, status: true }, { $set: newData }, { new: true }));

}

export const getUser = async (req, res) => {
    logger.info('Start getting user');
    const { id } = req.params;
    const user = await isToken(req, res);

    if (user.role === 'Sp_ADMIN' || user._id.toString() === id) {
        handleResponse(res, User.findById(id));
    } else {
        logger.error('You can only view your account');
        return res.status(403).json({ error: "You can only view your account" });
    }
};

export const updateUser = async (req, res) => {
    logger.info('Start updating user');
    const user = await isToken(req, res);

    const { id, name, lastName, phone, pass, img, idCommunity } = req.body;
    const newData = { name, lastName, phone, img, idCommunity };

    if (user.role === 'Sp_ADMIN' || user._id.toString() === id) {
        if (pass) {
            const salt = bcryptjs.genSaltSync();
            newData.pass = bcryptjs.hashSync(pass, salt);
        }
        handleResponse(res, User.findOneAndUpdate({ _id: id, status: true }, { $set: newData }, { new: true }));
    } else {
        logger.error('You can only edit your account');
        return res.status(403).json({ error: "You can only edit your account" });
    }
};

export const deleteUser = async (req, res) => {
    logger.info('Start deleting user');
    const { id } = req.params;
    const SPA = await validateSPAdminRequest(req, res);
    const ADM = await validateAdminRequest(req, res);
    const user = await User.findById(id);
    if (SPA) {
        handleResponse(res, User.findByIdAndUpdate(id, { status: false }, { new: true }));
    }
    if (ADM && ADM.idCommunity === user.idCommunity && user.role === 'USER') {
        handleResponse(res, User.findByIdAndUpdate(id, { status: false }, { new: true }));
    }
};

export const degradeUser = async (req, res) => {
    logger.info('Start deleting user');
    const { id } = req.params;
    const SPA = await validateSPAdminRequest(req, res);
    const ADM = await validateAdminRequest(req, res);
    const user = await User.findById(id);
    if (SPA) {
        handleResponse(res, User.findByIdAndUpdate(id, { role: "USER" }, { new: true }));
    }
    if (ADM && ADM.idCommunity === user.idCommunity && user.role === 'USER') {
        handleResponse(res, User.findByIdAndUpdate(id, { idCommunity: null }, { new: true }));
    }
};

export const getAdmins = async (req, res) => {
    logger.info('Start getting admins');
    await validateSPAdminRequest(req, res);
    handleResponse(res, User.find({ role: 'ADMIN', status: true }));
}

export const getUsersByCommunity = async (req, res) => {
    logger.info('Start getting users by community');
    const user = await isToken(req, res);
    validateAdminRequest(req, res);
    if (user.role === 'ADMIN') {
        handleResponse(res, User.find({ idCommunity: user.idCommunity, status: true }));
    } else {
        logger.error('You are not ADMIN');
        return res.status(403).json({ error: "You are not ADMIN" });
    }
}
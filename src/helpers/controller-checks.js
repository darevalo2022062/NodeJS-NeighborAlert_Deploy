import { logger } from './logger.js';
import User from '../modules/user/user.model.js';
import { isToken } from './tk-methods.js';
import { validateUser, validateAdmin, validateSPAdmin } from './data-methods.js';

export const validateUserRequest = async (req, res) => {
    logger.info('Start validating user request');
    try {
        const user = await isToken(req, res);
        const userData = validateUser(user._id);
        logger.info('User request validated');
        return (true, userData);
    } catch (error) {
        logger.error('Error:', error);
        return res.status(400).json({ error: error.message });
    }
}

export const validateAdminRequest = async (req, res) => {
    logger.info('Start validating admin request');
    try {
        const user = await isToken(req, res);
        validateAdmin(user._id);
        logger.info('Admin request validated');
        return true;
    } catch (error) {
        logger.error('Error:', error);
        return res.status(400).json({ error: error.message });
    }
}

export const validateSPAdminRequest = async (req, res) => {
    logger.info('Start validating super admin request');
    try {
        const user = await isToken(req, res);
        validateSPAdmin(user._id);
        logger.info('Super admin request validated');
        return true;
    } catch (error) {
        logger.error('Error:', error);
        return res.status(400).json({ error: error.message });
    }
}

export const handleCreate = async (res, promise) => {
    logger.info('Start handle create community');
    try {
        const data = await promise;
        const user = await User.findOneAndUpdate({ _id: data.idUser }, { idCommunity: data._id }, { new: true });
        res.status(200).json(user);

        logger.info('Community created successfully');
    } catch (error) {
        logger.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
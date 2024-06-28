import logger from './logger.js';
import { isToken } from '../../helpers/tk-methods.js';
import { validateUser } from '../../helpers/data-methods.js';
import { validateAdmin } from '../../helpers/data-methods.js';

const logger = logger.child();

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
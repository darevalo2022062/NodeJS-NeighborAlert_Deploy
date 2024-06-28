import { logger } from './logger.js';
import { isToken } from './tk-methods.js';
import { validateUser } from './data-methods.js';
import { validateAdmin } from './data-methods.js';

const log = logger.child({path: 'helpers/controller-checks.js'});

export const validateUserRequest = async (req, res) => {
    log.info('Start validating user request');
    try {
        const user = await isToken(req, res);
        const userData = validateUser(user._id);
        log.info('User request validated');
        return (true, userData);
    } catch (error) {
        log.error('Error:', error);
        return res.status(400).json({ error: error.message });
    }
}

export const validateAdminRequest = async (req, res) => {
    log.info('Start validating admin request');
    try {
        const user = await isToken(req, res);
        validateAdmin(user._id);
        log.info('Admin request validated');
        return true;
    } catch (error) {
        log.error('Error:', error);
        return res.status(400).json({ error: error.message });
    }
}
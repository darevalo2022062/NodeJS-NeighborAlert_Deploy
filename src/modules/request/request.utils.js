import User from '../user/user.model.js';
import { logger } from '../../helpers/logger.js';

export const makeAdmin = async (id, res) => {
    try {
        logger.info('Start making user an admin');
        const user = await User.findById(id).select('role').exec();
        if (!user) {
            logger.error('User not found');
            return res.status(404).send('User not found');
        }
        if (user.role === 'ADMIN') {
            logger.error('User is already an admin');
            return res.status(400).send('User is already an admin');
        }
        user.role = 'ADMIN';
        await user.save();
        logger.info('User is now an admin');
    } catch (err) {
        logger.error('Error making user an admin:', err);
        return res.status(500).send('Internal server error');
    }
};

export const makeUser = async (id, res) => {
    try {
        logger.info('Start making user a user');
        const user = await User.findById(id).select('role').exec();
        if (!user) {
            logger.error('User not found');
            return res.status(404).json({ message: 'User not found' });
        }
        if (user.role === 'USER') {
            logger.error('User is already a user');
            return res.status(400).json({ message: 'User is already a user' });
        }
        user.role = 'USER';
        await user.save();
        logger.info('User is now a user');
        return res.status(200).json({ message: 'User is now a user' });
    } catch (err) {
        logger.error('Error making user a user:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

import User from '../user/user.model.js';
import { logger } from '../../helpers/logger.js';

export const makeAdmin = async (id, res) => {
    logger.info('Start making user an admin');
    const user = await User
        .findById(id)
        .select('role')
        .exec();
    if (!user) {
        logger.error('User not found');
        return res.status(404).json({ message: 'User not found' });
    }
    if (user.role === 'ADMIN') {
        logger.error('User is already an admin');
        return res.status(400).json({ message: 'User is already an admin' });
    }
    user.role = 'ADMIN';
    await user.save();
    logger
    res.status(200).json({ message: 'User is now an admin' });
}

export const makeUser = async (id, res) => {
    logger.info('Start making user a user');
    const user = await User
        .findById(id)
        .select('role')
        .exec();
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
    res.status(200).json({ message: 'User is now a user' });
}
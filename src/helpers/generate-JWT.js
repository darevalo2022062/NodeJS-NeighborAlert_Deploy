import jwt from 'jsonwebtoken'
import { logger } from './logger.js';

export const generateJWT = (uid = '', email = '') => {
    logger.info('Start generating JWT');
    return new Promise((resolve, reject) => {
        const payload = { uid, email }
        jwt.sign(
            payload,
            process.env.PRIVATE_KEY,
            {
                expiresIn: '2h'
            },
            (err, token) => {
                console.log(err)
                logger.error('Error:', err);
                err ? (console.log(err), reject('We have a problem to generate the token')) : resolve(token)
            }
        )
        logger.info('JWT generated successfully');
    })
}
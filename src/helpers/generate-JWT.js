import jwt from 'jsonwebtoken'

export const generateJWT = (uid = '', email = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid, email }
        jwt.sign(
            payload,
            process.env.TOKEN_KEY,
            {
                expiresIn: '56h'
            },
            (err, token)=>{
                err ? (console.log(err),reject('We have a problem to generate the token')) : resolve(token)
            }
        )
    })
}
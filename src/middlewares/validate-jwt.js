import jwt from 'jsonwebtoken'
import User from '../modules/user/user.model.js'

export const validateJWT = async (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['authorization'];
  console.log(token)

  if (!token) {
    return res.status(401).json({
      msg: "We couldn't find a token in the request.",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.PRIVATE_KEY);

    const user = await User.findById(uid);
    if (!user) {
      return res.status(400).json({
        msg: 'Invalid token'
      })
    }

    if (user.estado === false) {
      return res.status(400).json({
        msg: 'Invalid token'
      })
    }

    req.user = user;

    next();
  } catch (e) {
    console.log(e),
      res.status(500).json({
        msg: "Upss!, An error ocurred when we try to read token",
      });
  }
}
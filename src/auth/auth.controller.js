import bcryptjs from "bcryptjs";
import { generateJWT } from "../helpers/generate-JWT.js";
import User from "../modules/user/user.model.js";
import Community from '../modules/community/community.model.js';
import { logger } from "../helpers/logger.js";
import { validateExistentEmail, validateEmail, validatePassword, validateCodeAccess } from "../helpers/data-methods.js";
const log = logger.child({path: 'auth/auth.controller.js'});

export const register = async (req, res) => {
  log.info('Start user registration');
  const { name, lastName, phone, email, pass, img, codeAccess } = req.body;
  let role;
  let user;
  let communityId = null;

  try {
    validateExistentEmail(email);
    validateEmail(email);
    validatePassword(pass);


    if (email.includes("admin.god.gt")) {
      role = "Sp_ADMIN";
    } else if (email.includes("admin.org.gt")) {
      role = "ADMIN";
    } else {
      role = "USER";
      validateCodeAccess(codeAccess);
      const community = await Community.findOne({ codeAccess });
      if (community) {
        communityId = community._id;
      } else {
        return res.status(400).json({ error: "Invalid community code." });
      }
    }

    user = new User({ name, lastName, phone, email, pass, img, role, idCommunity: communityId });
    const salt = bcryptjs.genSaltSync();
    user.pass = bcryptjs.hashSync(pass, salt);
    await user.save();
    log.info('User registration successful');
    res.status(200).json({ user });

  } catch (error) {
    log.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  log.info('Start user login');
  const { email, pass } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(400)
        .send("Upss!, email or password are incorrect.");
    }

    if (!user.status) {
      return res.status(400).send("Upss!, user is not active. Contact the administrator.");
    }

    const validPassword = await bcryptjs.compareSync(pass, user.pass);

    if (!validPassword) {
      return res.status(400).send("Upss!, email or password are incorrect.");
    } else {
      const token = await generateJWT(user.id, user.email);
      log.info('User login successful');

      res.status(200).json({
        msg: "Login ok",
        userDetails: {
          id: user._id,
          name: user.name,
          email: user.email,
          img: user.img,
          role: user.role,
          status: user.status,
          token: token,
        },
      });
    }
  } catch (e) {
    log.error('Error:', e);
    res.status(500).json({
      msg: "Please contact the administrator/support.",
    });
  }
};

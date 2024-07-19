import bcryptjs from "bcryptjs";
import { generateJWT } from "../helpers/generate-JWT.js";
import User from "../modules/user/user.model.js";
import { logger } from "../helpers/logger.js";
import axios from "axios";

import { validateExistentEmail, validateEmail, validatePassword, validateCodeAccess } from "../helpers/data-methods.js";

export const register = async (req, res) => {
  logger.info('Start user registration');
  const { name, lastName, phone, email, pass } = req.body;
  console.log(req.file);
  console.log(name, lastName, phone, email, pass);
  const img = req.file;
  const formData = new FormData();
  formData.append('image', img.buffer.toString('base64'));

  const imgResponse = await axios.post(`https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`, formData);
  const imgURL = imgResponse.data.data.url;

  const normalizedEmail = email.toLowerCase();
  let role;
  let user;
  let idCommunity = null;
  try {
    validateExistentEmail(normalizedEmail);
    validateEmail(normalizedEmail);
    validatePassword(pass);

    console.log("Aun esta bien");

    if (normalizedEmail.includes("admin.god.gt")) {
      role = "Sp_ADMIN";
    } else if (normalizedEmail.includes(" ")) {
      role = "ADMIN";
    } else {
      role = "USER";

    }

    console.log("name", name);
    console.log("lastName", lastName);
    console.log("phone", phone);
    console.log("normalizedEmail", normalizedEmail);
    console.log("pass", pass);
    console.log("imgURL", imgURL);

    user = new User({ name, lastName, phone, email: normalizedEmail, pass, img: imgURL, role, idCommunity: idCommunity });
    const salt = bcryptjs.genSaltSync();
    user.pass = bcryptjs.hashSync(pass, salt);
    await user.save();
    logger.info('User registration successful');
    res.status(200).json({ user });

  } catch (error) {
    logger.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  logger.info('Start user login');
  const { email, pass } = req.body;
  const normalizedEmail = email.toLowerCase();
  try {
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res
        .status(400)
        .send("Oops, the e-mail is incorrect.");
    }

    if (!user.status) {
      return res.status(400).send("Upss!, user is not active. Contact the administrator.");
    }

    const validPassword = await bcryptjs.compareSync(pass, user.pass);

    if (!validPassword) {
      return res.status(400).send("Upss!, the password is incorrect.");
    } else {
      const token = await generateJWT(user.id, user.email);
      logger.info('User login successful');

      res.status(200).json({
        user: {
          id: user._id,
          name: user.name,
          lastName: user.lastName,
          email: user.email,
          img: user.img,
          role: user.role,
          status: user.status,
          idCommunity: user.idCommunity,
          token: token,
        },
      });
    }
  } catch (e) {
    logger.error('Error:', e);
    res.status(500).json({
      msg: "Please contact the administrator/support.",
    });
  }
};

import bcryptjs from "bcryptjs";
import { generateJWT } from "../helpers/generate-JWT.js";
import User from "../modules/user/user.model.js";
import {validateCommunity, validateExistentEmail, validateEmail } from "../helpers/data-methods.js";

export const register = async (req, res) => {
  const { name, lastName, phone, email, pass, img, idCommunity } = req.body;
  let role;
  let usuario;
  try {
    validateExistentEmail(email);
    validateEmail(email);
    validateCommunity(idCommunity);
    validatePassword(pass);

    if (email.includes("admin.org.gt")) {
      role = "ADMIN_ROLE";
    } else {
      role = "USER_ROLE"; 
    }

    const salt = bcryptjs.genSaltSync();
    pass = bcryptjs.hashSync(password, salt);
    User.create({ name, lastName, phone, email, pass, img, role, idCommunity  });
    res.status(200).json({
      usuario,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

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

    const validPassword = await bcryptjs.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).send("Upss!, email or password are incorrect.");
    } else {
      const token = await generateJWT(user.id, user.email);

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
    console.log(e);
    res.status(500).json({
      msg: "Please contact the administrator/support.",
    });
  }
};

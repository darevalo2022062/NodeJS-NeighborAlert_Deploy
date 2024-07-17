import User from "../src/modules/user/user.model.js";
import { logger } from "../src/helpers/logger.js";

export const createUserDefault = async () => {
    logger.info("Creating default admin user...");
    try {
      const defaultUser = await User.findOne({ name: 'Admin' });
      if (!defaultUser) {
        const hashedPassword = await bcrypt.hash('@dmin-c0nf', 10); // Hash de la contraseña predeterminada
        const newUser = new User({
          name: 'Admin',
          lastName: 'Root',
          phone: '0000000000',
          email: 'admin@gmail.com',
          pass: hashedPassword,
          role: 'Sp_ADMIN',
        });

        await newUser.save();
        logger.info("Default admin user created successfully.");
      } else {
        logger.info("Default admin user already exists. \n Name: " + defaultUser.name + "\n Email: " + defaultUser.email);
      }
    } catch (error) {
        logger.error("Error creating default admin user: ", error);
    }
  }
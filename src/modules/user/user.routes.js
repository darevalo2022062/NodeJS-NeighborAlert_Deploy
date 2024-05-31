import { Router } from "express";
import { check } from "express-validator";
import {
    getUsers,
    getUserById,
    editUser,
    deleteUser,
} from "./user.controller.js";
import { validateExistentEmail, validateEmail, validateCommunity, validatePassword} from "../../helpers/data-methods.js";
import { validateFields } from "../../middlewares/validate-fields.js";

const router = Router();

router.get("/", getUsers);

router.get(
    "/:id",
    [
        check("id", "No es un ID válido").isMongoId(),
        validateFields,
    ],
    getUserById
);

router.put(
    "/:id",
    [
        check("pass").custom(validatePassword),
        check("idCommunity").custom(validateCommunity),
        validateFields,
    ],
    editUser
);

router.delete(
    "/:id",
    [
        check("id", "No es un ID válido").isMongoId(),

    ],
    deleteUser
);

export default router;
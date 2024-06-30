import { Router } from "express";
import { check } from "express-validator";
import {
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    enterCommunity
} from "./user.controller.js";
import { validateJWT } from "../../middlewares/validate-jwt.js";
import { validateExistentEmail, validateEmail, validateCommunity, validatePassword, validateCodeAccess } from "../../helpers/data-methods.js";
import { validateFields } from "../../middlewares/validate-fields.js";

const router = Router();

router.get("/", validateJWT, getUsers);

router.get(
    "/:id",
    [
        validateJWT,
        check("id", "No es un ID válido").isMongoId(),
        validateFields,
    ],
    getUser
);

router.put(
    '/community',
    [
        validateJWT,
        check("codeAccess").custom(validateCodeAccess),
        validateFields,
    ],
    enterCommunity
)

router.put(
    "/:id",
    [
        validateJWT,
        check("pass").custom(validatePassword),
        check("idCommunity").custom(validateCommunity),
        validateFields,
    ],
    updateUser
);

router.delete(
    "/:id",
    [
        validateJWT,
        check("id", "No es un ID válido").isMongoId(),

    ],
    deleteUser
);

export default router;
import { Router } from "express";
import { check } from "express-validator";
import {
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    enterCommunity,
    degradeUser,
    getAdmins,
    getUsersByCommunity
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
    "/",
    [
        validateJWT,
        check("pass").custom(validatePassword),
        check("codeAccess").custom(validateCodeAccess),
        validateFields,
    ],
    updateUser
);

router.delete(
    "/",
    validateJWT,
    deleteUser
);

router.get(
    "/admins",
    validateJWT,
    getAdmins
);

router.get(
    "/community-users",
    [
        validateJWT,
        check("id", "No es un ID válido").isMongoId(),
        validateFields,
    ],
    getUsersByCommunity
);

router.put(
    "/degrade",
    [
        validateJWT,
        check("id", "No es un ID válido").isMongoId(),
        validateFields,
    ],
    degradeUser
);

export default router;
import { Router } from "express";
import { check } from "express-validator";
import { validateJWT } from "../../middlewares/validate-jwt";
import { validateFields } from "../../middlewares/validate-fields";
import { createCommunity, getCommunities, getCommunity, updateCommunity, deleteCommunity } from "./community.controller";

const router = Router();

router.post(
    "/",
    [
        validateJWT,
        check("name", "Name is required").not().isEmpty(),
        check("location", "Location is required").not().isEmpty(),
        check("img", "Image is required").not().isEmpty(),
        validateFields,
    ],
    createCommunity
);

router.get("/", validateJWT, getCommunities);

router.get("/:id", validateJWT, getCommunity);

router.put(
    "/:id",
    [
        validateJWT,
        check("name", "Name is required").not().isEmpty(),
        check("location", "Location is required").not().isEmpty(),
        check("img", "Image is required").not().isEmpty(),
        validateFields,
    ],
    updateCommunity
);

router.delete("/:id", validateJWT, deleteCommunity);

export default router;
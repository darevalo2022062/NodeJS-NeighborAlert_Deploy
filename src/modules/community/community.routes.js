import { Router } from "express";
import { check } from "express-validator";
import { validateJWT } from "../../middlewares/validate-jwt.js";
import { validateFields } from "../../middlewares/validate-fields.js";
import upload from '../../middlewares/uploadMiddlewares.js';
import { createCommunity, getCommunities, getCommunity, updateCommunity, deleteCommunityAdmin, deleteCommunitySPA } from "./community.controller.js";

const router = Router();

router.post(
    "/",
    [
        upload.single('img'),
        validateJWT,
        check("name", "Name is required").not().isEmpty(),
        check("location", "Location is required").not().isEmpty(),
        validateFields,
    ],
    createCommunity
);

router.get("/", validateJWT, getCommunities);

router.get("/:id", validateJWT, getCommunity);

router.put(
    "/:id",
    [
        upload.single('img'),
        validateJWT
    ],
    updateCommunity
);

router.delete("/:id", validateJWT, deleteCommunityAdmin);

router.delete("/spa/:id", validateJWT, deleteCommunitySPA);

export default router;
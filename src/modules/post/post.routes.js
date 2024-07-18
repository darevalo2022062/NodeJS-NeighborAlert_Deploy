import { Router } from "express";
import { check } from "express-validator";
import { createPost, getMyPost, deletePost, updatePost, getPostByCommunity } from "./post.controller.js";
import { validateJWT } from "../../middlewares/validate-jwt.js";
import { validateFields } from "../../middlewares/validate-fields.js";
import upload from '../../middlewares/uploadMiddlewares.js';


const router = Router();

router.post(
    "/",
    [
        validateJWT,
        upload.array('file', 5),
        check("idCommunity", "idCommunity is required").isMongoId(),
        check("content", "content is required").not().isEmpty(),
        check("anonymous", "anonymous is required").not().isEmpty(),
        check("category", "category is required").not().isEmpty(),
        validateFields
    ],
    createPost
);

router.put(
    "/:id",
    [
        validateJWT,
        check("title", "title is required").not().isEmpty(),
        check("content", "content is required").not().isEmpty(),
        check("category", "category is required").not().isEmpty(),
        validateFields
    ],
    updatePost

)

router.get("/community", validateJWT, getPostByCommunity)

router.get("/", validateJWT, getMyPost);

router.delete("/:id", validateJWT, deletePost)

export default router;
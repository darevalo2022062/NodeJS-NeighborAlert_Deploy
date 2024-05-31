import { Router } from "express"; 
import { check } from "express-validator"; 
import { createPost, getPost, deletePost } from "./post.controller.js"; 
import { validateJWT } from "../../middlewares/validate-jwt.js";
import { validateFields } from "../../middlewares/validate-fields.js";

const router = Router(); 

router.post(
    "/",
    [
        validateJWT,
        check("idCommmunity", "idCommunity is required").isMongoId(), 
        check("title", "title is required").not().isEmpty(), 
        check("content", "content is required").not().isEmpty(),
        check("anonymous", "anonymous is required").not().isEmpty(),
        check("category", "category is required").not().isEmpty(), 
        check("file", "file is required").not().isEmpty(),
        validateFields
    ],
    createPost
);

router.get("/getPost", validateJWT, getPost);

router.delete("/deletePost/:id", validateJWT, deletePost)

export default router;
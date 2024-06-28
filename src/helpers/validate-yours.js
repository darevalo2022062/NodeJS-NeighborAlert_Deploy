import { isToken } from "./tk-methods.js";
import Comment from "../modules/comment/comment.model.js";

export const isMycomment = async (req, res, next) => {
    const { id } = req.params;
    const user = await isToken(req, res);
    next();
}
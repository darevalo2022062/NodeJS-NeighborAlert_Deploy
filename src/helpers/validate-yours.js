import { isToken } from "./tk-methods.js";
import Comment from "../modules/comment/comment.model.js";

export const isMycomment = async (req, res, next) => {
    const { id } = req.params;
    const user = await isToken(req, res);
    console.log("Este es el usuario en el middleware... " + user);
    //const commentExist = await Comment.findOne({ _id: id, idUser: user.id, status: true });

    next();
}
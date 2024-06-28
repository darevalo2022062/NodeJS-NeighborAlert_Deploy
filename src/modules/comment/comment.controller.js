import Comment from './comment.model.js';
import { validateUserRequest } from '../../helpers/controller-checks.js';
import { handleResponse } from '../../helpers/handle-resp.js';
import { logger } from '../../helpers/logger.js';

const childLogger = logger.child();

export const createComment = async (req, res) => {
    const { idPost, content, anonymous } = req.body;
    const info = await validateUserRequest(req, res);
    anonymous == true ?
        handleResponse(res, Comment.create({ idPost, content, anonymous }))
        :
        handleResponse(res, Comment.create({ idUser: info.id, idPost, content, anonymous }))
}

export const getComments = async (req, res) => {
    const { idPost } = req.params;
    await validateUserRequest(req, res);
    handleResponse(res, Comment.find({ status: true, idPost: idPost }));
}

export const updateComment = async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    await validateUserRequest(req, res);
    handleResponse(res, Comment.findByIdAndUpdate(id, { $set: { content: content } }, { new: true }));
}

export const deleteComment = async (req, res) => {
    const { id } = req.params;
    await validateUserRequest(req, res);
    handleResponse(res, Comment.findByIdAndUpdate(id, { status: false }, { new: true }));
};


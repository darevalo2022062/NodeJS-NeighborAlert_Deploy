import Comment from './comment.model.js';
import { validateUserRequest } from '../../helpers/controller-checks.js';
import { handleResponse } from '../../helpers/handle-resp.js';
import { logger } from '../../helpers/logger.js';

export const createComment = async (req, res) => {
    logger.info('Start creating comment');
    const { idPost, content, anonymous } = req.body;
    const info = await validateUserRequest(req, res);
    anonymous == true ?
        handleResponse(res, Comment.create({ idPost, content, anonymous }))
        :
        handleResponse(res, Comment.create({ idUser: info.id, idPost, content, anonymous }))
}

export const getComments = async (req, res) => {
    logger.info('Start getting comments');
    const { idPost } = req.params;
    await validateUserRequest(req, res);
    handleResponse(res, Comment.find({ status: true, idPost: idPost }));
}

export const updateComment = async (req, res) => {
    logger.info('Start updating comment');
    const { id } = req.params;
    const { content } = req.body;
    await validateUserRequest(req, res);
    handleResponse(res, Comment.findByIdAndUpdate(id, { $set: { content: content } }, { new: true }));
}

export const deleteComment = async (req, res) => {
    logger.info('Start deleting comment');
    const { id } = req.params;
    await validateUserRequest(req, res);
    handleResponse(res, Comment.findByIdAndUpdate(id, { status: false }, { new: true }));
};


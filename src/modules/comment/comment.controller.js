import Comment from './comment.model.js';
import { validateUser } from '../../helpers/data-methods.js';
import { isToken } from '../../helpers/tk-methods.js';
import { ConnectionReadyEvent } from 'mongodb';

const handleResponse = (res, promise) => {
    promise
        .then(data => res.status(200).json(data))
        .catch(error => {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
};

const validateUserRequest = async (req, res) => {
    try {
        const user = await isToken(req, res);
        const userData = validateUser(user._id);
        return (true, userData);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

export const createComment = async (req, res) => {
    const { idPost, content, anonymous } = req.body;
    const info = await validateUserRequest(req, res);
    handleResponse(res, Comment.create({ idUser: info.id, idPost, content, anonymous }));
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
    handleResponse(res, Comment.findByIdAndUpdate(id, { $set: { content: content } }));
}

export const deleteComment = async (req, res) => {
    const { id } = req.params;
    await validateUserRequest(req, res);
    handleResponse(res, Comment.findByIdAndUpdate(id, { status: false }));
};


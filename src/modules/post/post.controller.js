import Post from "./post.model.js";
import { validateUser } from "../../helpers/data-methods.js";
import { isToken } from "../../helpers/tk-methods.js";
import { ConnectionReadyEvent } from 'mongodb';

const handleResponse = (res, promise) => {
    promise
        .then(data => res.status(200).json(data))
        .catch(error => {
            console.error('Error:', error);
            res.status(500), json({ error: 'Internal server error' });
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

export const createPost = async (req, res) => {
    const { idCommunity, title, content, anonymous, category, file } = req.body;
    const info = await validateUserRequest(req, res);
    handleResponse(res, Post.create({ idUser: info.id, idCommunity, title, content, anonymous, category, file }));
}

export const getMyPost = async (req, res) => {
    await validateUserRequest(req, res);
    const user = await isToken(req, res);
    console.log("mati: " + user.idCommunity);
    handleResponse(res, Post.find({ status: true, idCommunity: user.idCommunity }));
}
export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, content, category } = req.body;
    await validateUserRequest(req, res);
    const newData = { title, content, category };
    handleResponse(res, Post.findOneAndUpdate({ _id: id, status: true }, { $set: newData }, { new: true }));
};
export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        await validateUserRequest(req, res);
        const deletedPost = await Post.findByIdAndDelete(id);
        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        return res.json({ message: 'Post deleted successfully'});
    } catch (error) {
        console.error('Error deleting post:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};




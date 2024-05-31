import Community from './community.model.js';
import { validateAdmin } from '../../helpers/data-methods.js';
import { isToken } from '../../helpers/tk-methods.js';

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
        validateAdmin(user._id);
        return true;    
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

export const createCommunity = async (req, res) => {
    const { name, location, img } = req.body;
    await validateUserRequest(req, res);
    handleResponse(res, Community.create({ name, location, img }));
};

export const getCommunities = async (req, res) => {
    await validateUserRequest(req, res);
    handleResponse(res, Community.find({ status: true }));
};

export const getCommunity = async (req, res) => {
    const { id } = req.params;
    await validateUserRequest(req, res);
    handleResponse(res, Community.findById(id));
};

export const updateCommunity = async (req, res) => {
    const { id } = req.params;
    const { name, location, img } = req.body;
    await validateUserRequest(req, res);
    const newData = { name, location, img };
    // handleResponse(res, Community.findByIdAndUpdate(id, newData, { new: true }));
    handleResponse(res, Community.findOneAndUpdate({ _id: id, status: true }, { $set: newData }, { new: true }));
};

export const deleteCommunity = async (req, res) => {
    const { id } = req.params;
    await validateUserRequest(req, res);
    handleResponse(res, Community.findByIdAndUpdate(id, { status: false }, { new: true }));
};

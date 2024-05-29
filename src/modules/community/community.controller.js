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

const validateUserRequest = (req, res) => {
    const user = isToken(req, res);
    validateAdmin(user.id);
}

export const createCommunity = (req, res) => {
    validateUserRequest(req, res);
    const { name, location, img } = req.body;
    handleResponse(res, Community.create({ name, location, img }));
};

export const getCommunities = (req, res) => {
    validateUserRequest(req, res);
    handleResponse(res, Community.find({ status: true }));
};

export const getCommunity = (req, res) => {
    validateUserRequest(req, res);
    const { id } = req.params;
    handleResponse(res, Community.findById(id));
};

export const updateCommunity = (req, res) => {
    validateUserRequest(req, res);
    const { id } = req.params;
    const { name, location, img } = req.body;
    const newData = { name, location, img };
    handleResponse(res, Community.findByIdAndUpdate(id, newData, { new: true }));
};

export const deleteCommunity = (req, res) => {
    validateUserRequest(req, res);
    const { id } = req.params;
    handleResponse(res, Community.findByIdAndUpdate(id, { status: false }, { new: true }));
};

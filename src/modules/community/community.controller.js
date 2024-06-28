import Community from './community.model.js';
import User from '../user/user.model.js';
import { validateAdminRequest } from '../../helpers/controller-checks.js';
import { handleResponse } from '../../helpers/handle-resp.js';
import { logger } from '../../helpers/logger.js';
import uniqid from 'uniqid';

const logger = logger.child();

const handleCreate = async (res, promise) => {
    try {
        const data = await promise;
        res.status(200).json(data);
        await User.findOneAndUpdate({ _id: data.idUser }, { idCommunity: data._id });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const createCommunity = async (req, res) => {
    const user = await isToken(req, res);
    const { name, location, img, description } = req.body;
    var codeAccess;
    let existence = false;
    do {
        const timestamp = Date.now().toString(36).toUpperCase().substr(0, 4); // Convert timestamp to base36
        const uniquePart = uniqid().slice(-4).toUpperCase(); // Get the last 6 characters of uniqid
        codeAccess = `${timestamp}${uniquePart}`;
        //VERIFICATION CODE UNIQUE EXIST
        let codeExistence = null;
        codeExistence = await Community.find({ codeAccess: codeAccess });
        console.log(codeExistence.length, "line 37");
        if (codeExistence == null) {
            console.log(codeExistence, "line 39")
            existence = true;
        }
    } while (existence);
    //END CREATION CODE - Save
    codeAccess = codeAccess.toUpperCase();
    await validateAdminRequest(req, res);
    handleCreate(res, Community.create({ codeAccess, name, location, img, description, idUser: user._id }));
};

export const getCommunities = async (req, res) => {
    await validateAdminRequest(req, res);
    handleResponse(res, Community.find({ status: true }));
};

export const getCommunity = async (req, res) => {
    const { id } = req.params;
    await validateAdminRequest(req, res);
    handleResponse(res, Community.findById(id));
};

export const updateCommunity = async (req, res) => {
    const { id } = req.params;
    const { name, location, img } = req.body;
    await validateAdminRequest(req, res);
    const newData = { name, location, img };
    handleResponse(res, Community.findOneAndUpdate({ _id: id, status: true }, { $set: newData }, { new: true }));
};

export const deleteCommunity = async (req, res) => {
    const { id } = req.params;
    await validateAdminRequest(req, res);
    handleResponse(res, Community.findByIdAndUpdate(id, { status: false }, { new: true }));
};

import Community from './community.model.js';
import { isToken } from '../../helpers/tk-methods.js';
import { validateAdminRequest, handleCreate } from '../../helpers/controller-checks.js';
import { handleResponse } from '../../helpers/handle-resp.js';
import { logger } from '../../helpers/logger.js';
import uniqid from 'uniqid';

export const createCommunity = async (req, res) => {
    logger.info('Start creating community');
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
        if (codeExistence == null) {
            existence = true;
        }
    } while (existence);
    //END CREATION CODE - Save
    codeAccess = codeAccess.toUpperCase();
    await validateAdminRequest(req, res);
    handleCreate(res, Community.create({ codeAccess, name, location, img, description, idUser: user._id }));
};

export const getCommunities = async (req, res) => {
    logger.info('Start getting communities');
    handleResponse(res, Community.find({ status: true }));
};

export const getCommunity = async (req, res) => {
    logger.info('Start getting community');
    const { id } = req.params;
    handleResponse(res, Community.findById(id));
};

export const updateCommunity = async (req, res) => {
    logger.info('Start updating community');
    const { id } = req.params;
    const { name, location, img } = req.body;
    await validateAdminRequest(req, res);
    const newData = { name, location, img };
    handleResponse(res, Community.findOneAndUpdate({ _id: id, status: true }, { $set: newData }, { new: true }));
};

export const deleteCommunity = async (req, res) => {
    logger.info('Start deleting community');
    const { id } = req.params;
    await validateAdminRequest(req, res);
    handleResponse(res, Community.findByIdAndUpdate(id, { status: false }, { new: true }));
};
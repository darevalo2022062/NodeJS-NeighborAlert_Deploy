import { response, request } from "express";
import bcryptjs from 'bcryptjs';
import User from './user.model.js';

export const getUsers = async (req = request, res = response) => {
    
    const { limite, desde } = req.query;
    const query = { status: true };

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    
    res.status(200).json({
        total,
        users
    });
}

export const getUserById = async (req, res) => {

    const { id } = req.params;
    const user = await User.findOne({ _id: id });

    res.status(200).json({
        user
    })
}

export const editUser = async (req, res = response) => {

    const { id } = req.params;
    const { _id, email, status, ...resto } = req.body;

    const salt = bcryptjs.genSaltSync();
    resto.pass = bcryptjs.hashSync(resto.pass, salt);

    await User.findByIdAndUpdate(id, resto);

    const user = await User.findOne({ _id: id });

    res.status(200).json({
        msg: 'User updated',
        user
    });
}

export const deleteUser = async (req, res) => {
    
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, { status: false });
    const authenticatedUser = req.usuario;

    res.status(200).json({ msg: 'Usuario to delete', user, authenticatedUser });
}
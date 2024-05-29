import User from '../modules/user/user.model.js'

export const validateAnonymous = async (anonymous) => {
    if (!anonymous) {throw new Error('Anonymous is required')}
    if (typeof anonymous !== 'boolean') {throw new Error('Anonymous must be a boolean')}
    return anonymous;
}   

export const validateUser = async (id) => {
    const user = await User.findById(id);
    if (!user) {throw new Error('User not found')}
    if (!user.status) {throw new Error('User is not active')}
    const userData = { id: user.id, name: user.name, email: user.email, role: user.role };
    return userData;
}

export const validateAdmin = async (id) => {
    const user = await User.findById(id);
    if (!user) {throw new Error('User not found')}
    if (!user.status) {throw new Error('User is not active')}
    if (user.role !== 'ADMIN_ROLE') {throw new Error('User is not an administrator')}
    const userData = { id: user.id, name: user.name, email: user.email, role: user.role };
    return userData;
}


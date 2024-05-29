import User from '../modules/user/user.model.js';
import Community from '../modules/community/community.model.js';

const easyPasswords = ['password', '123456', 'admin123', 'root123', "hello123", "123456789", "qwerty", "password1", "admin", "root", "123"];
const specialCharacters = /[!@#$%^&*(),.?":{}|<>]/;
const numbers = /[0-9]/;
const uppercaseLetters = /[A-Z]/;
const lowercaseLetters = /[a-z]/;

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

export const validateCommunity = async (id) => {
    const community = await Community.findById(id);
    if (!community) {throw new Error('Community not found')}
    if (!community.status) {throw new Error('Community is not active')}
    return community;
}

export const validateEmail = async (email) => {
    if (!email) {throw new Error('Email is required')}
    if (typeof email !== 'string') {throw new Error('Email must be a string')}
    if (!email.includes('@') || !email.includes('.')) {throw new Error('Email is not valid')}
    return email;
}

export const validateExistentEmail = async (email) => {
    const user = await User.findOne({ email });
    if (user) {throw new Error('Email already exists')}
    return email;
}

export const validatePassword = async (password) => {
    if (!password) {throw new Error('Password is required')}
    if (typeof password !== 'string') {throw new Error('Password must be a string')}
    if (password.length < 6) {throw new Error('Password must be at least 6 characters')}
    if (easyPasswords.includes(password)) {throw new Error('Password is too easy')}
    if (!specialCharacters.test(password)) {throw new Error('Password must contain at least one special character')}
    if (!numbers.test(password)) {throw new Error('Password must contain at least one number')}
    if (!uppercaseLetters.test(password)) {throw new Error('Password must contain at least one uppercase letter')}
    if (!lowercaseLetters.test(password)) {throw new Error('Password must contain at least one lowercase letter')}
    return password;
}
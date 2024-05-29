import {Schema, model} from 'mongoose';

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    pass: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['ADMIN', 'USER'],
        default: 'USER'
    },
    idCommunity: {
        type: Schema.Types.ObjectId,
        ref: 'Community',
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

export default model('User', userSchema);
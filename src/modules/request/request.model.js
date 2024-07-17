import {Schema, model} from 'mongoose';

const requestSchema = new Schema({
    idUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    idCommunity: {
        type: Schema.Types.ObjectId,
        ref: 'Community',
        required: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Rejected'],
        default: 'Pending',
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

export default model('Request', requestSchema);
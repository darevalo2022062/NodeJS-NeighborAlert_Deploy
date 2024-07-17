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
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Rejected'],
        default: 'Pending',
        required: true
    }
}, {
    timestamps: true
});

export default model('Request', requestSchema);
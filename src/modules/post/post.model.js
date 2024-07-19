import {Schema, model} from 'mongoose';

const postSchema = new Schema({
    idUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    idCommunity: {
        type: Schema.Types.ObjectId,
        ref: 'Community',
        required: true
    },
    title: {
        type: String,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    anonymous: {
        type: Boolean,
        required: true
    },
    category: {
        type: String,
        enum: ['#general', '#event', '#news', '#job', '#housing'],
    },
    file:[{
        type: String
    }],
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

export default model('Post', postSchema);
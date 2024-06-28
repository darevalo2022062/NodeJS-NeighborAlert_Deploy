import { Schema, model } from 'mongoose';

const communitySchema = new Schema({
    codeAccess: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
    },
    img: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    idUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

export default model('Community', communitySchema);
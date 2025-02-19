import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true,
    },
    freelancer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FreeLancer',
        default: null,
    },
    status: {
        type: String,
        required: true,
        enum: ['open', 'in-progress', 'completed'],
        default: 'open',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    skillsRequired: {
        type: [String],
        required: true,
    },
    budget: {
        type: Number,
        required: true,
    },
});

export default  mongoose.model('Job', JobSchema);
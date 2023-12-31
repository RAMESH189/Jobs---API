const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'please provide company'],
        maxlenght: 50
    },
    position: {
        type: String,
        required: [true, 'please provide position'],
        maxlenght: 70
    },
    status: {
        type: String,
        enum: ['pending', 'interview', 'declined'],
        default: 'pending',
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide User']
    }
}, { timestamps: true });


module.exports = mongoose.model('Job', JobSchema);

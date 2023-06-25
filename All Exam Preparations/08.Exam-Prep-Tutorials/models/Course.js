const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 50
    },
    image: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
    },
    usersEnrolled: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],

    owner:{
        type: String,
        ref:'User'
    }
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;

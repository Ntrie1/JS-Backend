const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    
    password: {
        type: String,
        required: true
    },
    
    enrolledCourses: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Course' 
    }],

}, {
    virtuals: {
        repeatPassword: {
            set(value){
                if(this.password !== value){
                    throw new mongoose.Error('Password missmatch!')
                }
            }
        }
    }
});


const User = mongoose.model('User', userSchema);

module.exports = User;
const Course = require('../models/Course');


exports.create = (courseData) => Course.create(courseData);

exports.getAllByDate = () => Course.find({}).sort({ createdAt: 1 }).lean();

exports.getRecent = () => Course.find({}).sort({ usersEnrolled: -1 }).limit(3).lean();

exports.getOne = (courseId) => Course.findById(courseId);


exports.enroll = async(userId, courseId) =>{
    const course = await this.getOne(courseId);
    course.usersEnrolled.push(userId);
    return course.save();
}
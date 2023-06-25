const router = require('express').Router();

const courseService = require('../services/courseService');


router.get('/create', (req,res)=>{
    res.render('create')
});

router.post('/create', async (req,res)=>{
    const courseData = {
        ...req.body,
        createdAt: new Date(),
        owner: req.user._id
    }

    await courseService.create(courseData);
    res.redirect('/')

});




router.get('/:courseId/details',async (req,res)=>{
    const course = await courseService.getOne(req.params.courseId).lean();
    const hasEnrolled = course.usersEnrolled == req.user?._id;

    res.render('details', {course, hasEnrolled})
});


router.get('/:courseId/enroll',async (req,res)=>{
    const userId = req.user._id;
    const courseId = req.params.courseId;
    const course = await courseService.getOne(courseId);

    if(course.usersEnrolled == userId){
        throw new Error('You have already enrolled in this course!');
    }

    await courseService.enroll(userId, courseId);
    res.redirect(`/courses/${courseId}/details`);


})



module.exports = router;
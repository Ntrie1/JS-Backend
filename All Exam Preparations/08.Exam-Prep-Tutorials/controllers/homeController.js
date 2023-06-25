const router = require('express').Router();

const courseService = require('../services/courseService')

router.get('/', async (req,res)=>{
    let recentCourses = await courseService.getRecent();
    let dateSortedCourses = await courseService.getAllByDate();

    dateSortedCourses.map(x=>{
        x.createdAt = x.createdAt.toISOString().slice(0,10)
    })
    


  
        res.render('home', {recentCourses, dateSortedCourses})
   

    
})



module.exports = router;
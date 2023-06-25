const router = require('express').Router();


const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const courseController = require('./controllers/coursesController');

router.use(homeController);
router.use(authController);
router.use('/courses', courseController);
router.all('*', (req,res)=>{
    res.render('home/404')
})



module.exports = router;

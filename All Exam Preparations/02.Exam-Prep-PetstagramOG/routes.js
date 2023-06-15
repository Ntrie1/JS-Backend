const router = require('express').Router();


const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const photosController = require('./controllers/photosController');

router.use(homeController);
router.use('/users', authController);
router.use('/photos', photosController);
router.all('*', (req,res)=>{
    res.render('home/404')
})    



module.exports = router;

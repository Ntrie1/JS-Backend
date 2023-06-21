const router = require('express').Router();


const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const hotelController = require('./controllers/hotelController');

router.use(homeController);
router.use('/users', authController);
router.use('/hotels', hotelController);
router.all('*', (req,res)=>{
    res.render('home/404')
})



module.exports = router;

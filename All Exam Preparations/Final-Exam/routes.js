const router = require('express').Router();


const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const animalCoontroller = require('./controllers/animalController');

router.use(homeController);
router.use('/users', authController);
router.use('/animals', animalCoontroller);
router.all('*', (req,res)=>{
    res.render('home/404')
})



module.exports = router;

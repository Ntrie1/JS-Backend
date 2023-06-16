const router = require('express').Router();


const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const gamesController = require('./controllers/gameController');

router.use(homeController);
router.use('/users', authController);
router.use('/games', gamesController);
router.all('*', (req,res)=>{
    res.render('home/404')
})



module.exports = router;

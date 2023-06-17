const router = require('express').Router();


const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const bookController = require('./controllers/booksController');

router.use(homeController);
router.use('/users',authController);
router.use('/books',bookController);
router.all('*', (req,res)=>{
    res.render('home/404')
})



module.exports = router;

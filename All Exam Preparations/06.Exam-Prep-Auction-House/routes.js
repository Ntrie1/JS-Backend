const router = require('express').Router();
 

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const auctionsController = require('./controllers/auctionController');

router.use(homeController);
router.use('/users', authController);
router.use('/auctions', auctionsController);
router.all('*', (req,res)=>{
    res.render('home/404')
})



module.exports = router;

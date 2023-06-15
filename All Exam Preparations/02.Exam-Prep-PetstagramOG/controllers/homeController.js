const router = require('express').Router();

const photoServices = require('../services/photoService');

router.get('/', (req,res)=>{
    console.log(req.user)
    res.render('home')
});


router.get('/profile', async (req,res)=>{
    const photos = {};
   
    res.render('home/profile', {photos, photosCount: photos.length});
})



module.exports = router;
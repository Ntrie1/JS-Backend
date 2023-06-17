const router = require('express').Router();

const bookService = require('../services/bookService');

router.get('/', (req,res)=>{
   // console.log(req.user)
    res.render('home')
});

router.get('/profile', async (req,res)=>{

    const books = await bookService.getByOwnerId(req.user._id).lean();
   // console.log(books);
    res.render('home/profile', {books})
})



module.exports = router;
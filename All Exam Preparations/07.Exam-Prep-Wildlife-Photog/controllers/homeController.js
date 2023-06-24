const router = require('express').Router();

const postService = require('../services/postService');
const authSerivice = require('../services/authService');

router.get('/', (req,res)=>{
    console.log(req.user)
    res.render('home')
});


router.get('/myPosts',async (req,res)=>{
   // const posts = await postService.getByOwner(req.user._id).lean();
  //  const authorOfPost = await authSerivice.findById(posts.author);

    const posts = await postService.getByOwner(req.user._id).populate('author').lean();



    res.render('home/myPosts', {posts});
})



module.exports = router;
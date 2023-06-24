const router = require('express').Router();

const postService = require('../services/postService');
const { getErrorMessage } = require('../utils/errorUtils');
const authSerivice = require('../services/authService');
const { isAuth } = require('../middlewares/authMiddleware');


router.get('/catalog', async (req,res)=>{
    const posts = await postService.getAll().lean();
    res.render('posts/catalog', {posts});
})

 
router.get('/create',isAuth, (req,res)=>{
    res.render('posts/create');
});


router.post('/create',isAuth, async (req,res)=>{
    const postData = {
        ...req.body,
        author: req.user._id
    }

    try {
        await postService.create(postData);
        res.redirect('/posts/catalog')
    } catch (error) {
        return res.render('posts/create', {error: getErrorMessage(error)});
    }



});


router.get('/:postId/edit',isAuth,async (req,res)=>{
    const post = await postService.getPostById(req.params.postId).lean();
    res.render('posts/edit', {post})
});

router.post('/:postId/edit',isAuth, async (req,res)=>{
    const postData = req.body;

    try {
        await postService.edit(req.params.postId, postData);
        res.redirect(`/posts/${req.params.postId}/details`);
    } catch (error) {
        return res.render(`posts/${req.params.postId}/edit`,{ error: 'Unable to update post info!', ...postData});
    }

   
});


router.get('/:postId/details', async (req,res)=>{
    const post = await postService.getPostById(req.params.postId).lean();

    const isOwner = post.author == req.user?._id;
    const hasVoted = post.votesOnPost == req.user?._id;

    let voters = [];

    for(let voterId of post.votesOnPost){
        voterId = voterId.toString()
        const voter = await authSerivice.findById(voterId).lean();
        voters.push(voter.email);
     }
    
     voters = voters.join(', ')
 


    res.render('posts/details', {post, isOwner, hasVoted, voters});
});



router.get('/:postId/upvote',isAuth, async (req,res)=>{
    const postId = req.params.postId;
    const userId = req.user._id;
    const post = await postService.getPostById(postId);

    try {
        if(post.votesOnPost == userId){
            throw new Error('You have already voted!')
        }

        await postService.upVote(userId,postId)
        res.redirect(`/posts/${postId}/details`)
    } catch (error) {
        res.render('posts/catalog', {error: getErrorMessage(error)});
    }

});

router.get('/:postId/downvote',isAuth, async (req,res)=>{
    const postId = req.params.postId;
    const userId = req.user._id;
    const post = await postService.getPostById(postId);

    try {
        if(post.votesOnPost == userId){
            throw new Error('You have already voted!')
        }

        await postService.downVote(userId,postId)
        res.redirect(`/posts/${postId}/details`)
    } catch (error) {
        res.render('posts/catalog', {error: getErrorMessage(error)});
    }

});









router.get('/:postId/delete',isAuth,async (req,res)=>{
    await postService.delete(req.params.postId);
    res.redirect('/posts/catalog')
})







module.exports = router;
const router = require('express').Router();

const { isAuth } = require('../middlewares/authMiddleware')
const photoServices = require('../services/photoService');
const { getErrorMessage } = require('../utils/errorUtils');
const authService = require('../services/authService');


router.get('/catalog', async (req, res) => {
    const photos = await photoServices.getAll().lean();


    console.log(photos)

    res.render('photos/catalog', { photos })
});

router.get('/:photoId/details', async (req, res) => {

    try {
        const photo = await photoServices.getOne(req.params.photoId).populate('comments.user').lean();

        const isOwner = photo.owner._id == req.user?._id;
    
        res.render('photos/details', { photo, isOwner });
    } catch (error) {
        return res.status(404).render('photos/details', { error: getErrorMessage(error) });
    }




});

// router.post('/:photoId/details', async (req, res) => {
//     const { comment } = req.body;
//     const userId = req.user?._id;

//     await photoServices.createComment(userId, req.params.photoId, comment);

//     res.redirect(`/photos/${req.params.photoId}/details`);
// })

router.get('/create', isAuth, (req, res) => {
    res.render('photos/create')
});

router.post('/create', async (req, res) => {
    const photoData = {
        ...req.body,
        owner: req.user._id,
    };

    try {
        await photoServices.create(photoData);
        res.redirect('/photos/catalog')
    } catch (error) {
        return res.render('photos/create', { error: getErrorMessage(error) });
    }

});

router.get('/:photoId/edit', async (req, res) => {

    const photo = await photoServices.getOne(req.params.photoId).lean();

 
    res.render('photos/edit', { photo })
});


router.post('/:photoId/edit', async (req,res)=>{
    const photoData = req.body;
    const photoId = req.params.photoId;

try {
    await photoServices.edit(photoId,photoData);
    res.redirect(`/photos/${photoId}/details`)
} catch (error) {
    res.render('photos/edit', {error: 'Unable to update photo', ...photoData})
} 




     
});

router.post('/:photoId/comments', async (req,res)=>{
    const photoId = req.params.photoId;
    const {message} = req.body;
    const user = req.user._id;

    await photoServices.createComment(photoId, {user, message});

    res.redirect(`/photos/${photoId}/details`)
})

router.get('/:photoId/delete', async (req, res) => {
    try {
        await photoServices.delete(req.params.photoId);
        res.redirect('/photos/catalog')
    } catch (error) {
        res.render(`/photos/${req.params.photoId}/details`, { error: 'Unsuccessful photo deletion' })
    }
});







module.exports = router;
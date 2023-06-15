const router = require('express').Router();

const { isAuth } = require('../middlewares/authMiddleware')
const photoServices  = require('../services/photoService');
const { getErrorMessage } = require('../utils/errorUtils');
const authService = require('../services/authService');


router.get('/catalog', async (req,res)=>{
    const photos = await photoServices.getAll().lean();

    if(photos){
       await Promise.all(photos.map(async (x)=>{
            const photoOwner = await authService.getOneByID(x.owner)
            x.photoOwner = photoOwner.username;
        }))

    }
    console.log(photos)

    res.render('photos/catalog', { photos })
}); 

router.get('/:photoId/details',async (req,res)=>{

    try {
        const photo = await photoServices.getOne(req.params.photoId).lean();
    
        const user = await authService.getOneByID(photo.owner).lean();
        
        const isOwner = photo.owner == req.user?._id;
        const isNotOwner = photo.owner != req.user?._id;
    
        let commentList = photo?.commentList;
          
        if(commentList){

            await Promise.all(commentList.map(async (x) => {
                const commentator = await authService.getOneByID(x.UserId);
                x.commentator = commentator.username;
            }));
        }
      
    
        res.render('photos/details', {photo, isOwner, isNotOwner, user,commentList});
    } catch (error) {
        return res.status(404).render('photos/details', {error: getErrorMessage(error)});
    }
 
    
    

});

router.post('/:photoId/details',async (req,res)=>{
    const {comment} = req.body;
    const userId = req.user?._id;
   
    await photoServices.createComment(userId, req.params.photoId, comment);
   
    res.redirect(`/photos/${req.params.photoId}/details`);
})

router.get('/create',isAuth , (req,res) =>{
    res.render('photos/create')
}); 

router.post('/create', async (req,res)=>{
   const photoData = req.body;

   try {
    await photoServices.create(req.user._id, photoData);
   } catch (error) {
    return res.status(404).render('photos/create', {error: getErrorMessage(error)});
   }
   res.redirect('/photos/catalog')

});


router.get('/')





module.exports = router;
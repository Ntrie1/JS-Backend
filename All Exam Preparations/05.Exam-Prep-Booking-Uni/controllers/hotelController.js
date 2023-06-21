const router = require('express').Router();   

const hotelService = require('../services/hotelService'); 
const { getErrorMessage } = require('../utils/errorUtils');
const { isAuth } = require('../middlewares/authMiddleware');

router.get('/create',isAuth, (req,res)=>{
    res.render('hotels/create');
});

router.post('/create',isAuth, async (req,res)=>{
    const hotelData = {
        ...req.body,
        owner: req.user._id
    };

    try {
        await hotelService.create(hotelData)
        res.redirect('/')
    } catch (error) {
        return res.render('hotels/create', {error: getErrorMessage(error)});
    }

});

router.get('/:hotelId/details', isAuth, async (req,res)=>{
    
    const hotel = await hotelService.getOneById(req.params.hotelId).lean();

    const isOwner = hotel.owner == req.user?._id;

    const hasBooked = hotel.usersBooked == req.user?._id;

    res.render('hotels/details', {hotel, isOwner, hasBooked});
});











router.get('/:hotelId/edit', isAuth,async (req,res)=>{
    const hotel = await hotelService.getOneById(req.params.hotelId).lean();

    res.render('hotels/edit', {hotel})
});

router.post('/:hotelId/edit',isAuth, async (req,res)=>{
    const hotelData = req.body;
    const hotelId = req.params.hotelId;

    try {
        await hotelService.edit(hotelId, hotelData);
        res.redirect(`/hotels/${hotelId}/details`)
    } catch (error) {
        return res.render(`hotels/${hotelId}/edit`, 'Unable to update hotel info!', ...hotelData);
    }



});



router.get('/:hotelId/book', async (req,res)=>{
    const userId = req.user._id;
    const hotelId = req.params.hotelId;
    const hotel = await hotelService.getOneById(hotelId).lean();

    try {
        if(hotel.usersBooked != userId){
            await hotelService.book(userId, hotelId);
            res.redirect(`/hotels/${hotelId}/details`)
        }
    } catch (error) {
        return res.render(`/hotels/${hotelId}/details`, { error: getErrorMessage(error) });
    }


})















router.get('/:hotelId/delete',async (req,res)=>{
    await hotelService.delete(req.params.hotelId);
    res.redirect('/')
})



module.exports = router;
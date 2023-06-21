const router = require('express').Router();

const hotelService = require('../services/hotelService');

router.get('/', async (req,res)=>{
    //console.log(req.user)
    const hotels = await hotelService.getAll().lean();

    const hotelsWithFreeRooms = hotels.map((hotel) => {
        const freeRoomsCount = hotel.freeRooms - hotel.usersBooked.length;
        return { ...hotel, freeRoomsCount };
      });

      const sortedHotels = hotelsWithFreeRooms.sort((a,b)=> b.freeRoomsCount - a.freeRoomsCount);

    res.render('home', { hotels: sortedHotels })
});


router.get('/profile',async (req,res)=>{
    const hotels = await hotelService.getByOwnerId(req.user._id).lean();

    res.render('home/profile', {hotels})
});





module.exports = router;
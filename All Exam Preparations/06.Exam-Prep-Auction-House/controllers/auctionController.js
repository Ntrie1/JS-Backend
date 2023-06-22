const router = require('express').Router();


const auctionService = require('../services/auctionService');
const authService = require('../services/authService');
const { getErrorMessage } = require('../utils/errorUtils');
const { isAuth } = require('../middlewares/authMiddleware');



router.get('/browse',async (req,res)=>{
    const auctions = await auctionService.getAll().lean();
    res.render('auctions/browse', { auctions });
});




router.get('/create',isAuth, (req,res)=>{
    res.render('auctions/create');
});

router.post('/create',isAuth, async (req,res)=>{
    const auctionData = {
    ...req.body,
    author: req.user._id
    }

    try {
        await auctionService.create(auctionData);
        res.redirect('/auctions/browse');
    } catch (error) {
        return res.render('auctions/create', {error: getErrorMessage(error)});
    }

});


router.get('/:auctionId/details', async (req,res)=>{
    const auction = await auctionService.getOneById(req.params.auctionId).lean();
    const isCreator = auction.author == req.user?._id;
    const hasBidded = auction.bidder == req.user?._id;
    const bidder = await authService.findbyId(auction.bidder).lean();

    res.render('auctions/details', {auction, isCreator, hasBidded, bidder})
});


router.post('/:auctionId/details', isAuth, async (req,res)=>{
    const price = parseFloat(req.body.price);;
    const bidderId = req.user._id;
    const auctionId = req.params.auctionId;
    const auction = await auctionService.getOneById(auctionId);

    try {
        if(auction.bidder == bidderId){
            throw new Error('You have alredy bidded this!')
        }
        if(auction.price >= price){
            throw new Error('Your bid should be higher than the current price!')
        }
        await auctionService.bid(bidderId, auctionId, price);
        res.redirect(`/auctions/${auctionId}/details`);
    } catch (error) {
        return res.render(`auctions/details`, { error: getErrorMessage(error) });
    }

})



 
router.get('/:auctionId/edit',isAuth, async (req,res) =>{
    const auction = await auctionService.getOneById(req.params.auctionId).lean();
    const category = req.body.category
 
    const categories = {
        "real estate": "Real Estate",
        "vehicles": "Vehicles", 
        "furniture": "Furniture",
        "electronics": "Electronics", 
    }

    
        const categotyMethod = Object.keys(categories).map(key => ({ 
            value: key.toLowerCase(), 
            label: categories[key].toLowerCase(),
            isSelected: category == key
        }));
     
       console.log(req.body)
   



    res.render('auctions/edit', {auction});
});


router.get('/:auctionId/delete',async (req,res)=>{
    await auctionService.delete(req.params.auctionId);
    res.redirect('/auctions/browse')
})



router.get('/:auctionId/close',async (req,res)=>{

    res.render('auctions/close')
})






module.exports = router;
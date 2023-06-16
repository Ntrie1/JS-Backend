const router = require('express').Router(); 


const gameService = require('../services/gameService');
const { getErrorMessage } = require('../utils/errorUtils');
const {getPlatformWay} = require('../utils/viewData');
const { isAuth } = require('../middlewares/authMiddleware');

 

router.get('/catalog', async (req,res)=>{
    const games = await gameService.getAllGames().lean();
    res.render('games/catalog', { games });
});

router.get('/search', async (req,res)=>{
    const { name, platform } = req.query;

    const platformMethod = getPlatformWay(platform);

    const game = await gameService.search(name, platform);

    res.render('games/search', {game, platformMethod, name})
})



router.get('/create', isAuth, (req,res)=>{

    res.render('games/create')
});

router.post('/create',isAuth, async (req,res)=>{
    const gameData = {
        ...req.body,
        owner: req.user._id,
    }
    
    try {
        await gameService.create(gameData)
       res.redirect('/games/catalog');
    } catch (error) {
        return res.render('games/create', { error: getErrorMessage(error) });
    }

});


router.get('/:gameId/details',async (req,res)=>{
    const game = await gameService.getOneById(req.params.gameId).lean();
    
    const isOwner = game.owner._id == req.user?._id;
    const hasBought = game.boughtBy == req.user?._id;
     
   // console.log(game.boughtBy);
   
    res.render('games/details', {game, isOwner, hasBought})
});

router.get('/:gameId/details/buy', async (req,res)=>{
    const userId = req.user._id;
    const gameId = req.params.gameId;
    const game = await gameService.getOneById(gameId).lean();


try {
    if(userId != game.boughtBy){
        await gameService.buyGame(gameId, userId);
        res.redirect(`/games/${gameId}/details`); 
    } 
} catch (error) {
    return res.render(`games/${gameId}/details`, { error: getErrorMessage(error) });
}

});


router.get('/:gameId/edit',async (req, res)=>{
    const game = await gameService.getOneById(req.params.gameId).lean();

    const platformMethod = getPlatformWay(game.platform);



    res.render('games/edit', { game, platformMethod})
});

router.post('/:gameId/edit', async (req,res)=>{
    const gameData = req.body;
try {
    await gameService.edit(req.params.gameId, gameData);
    res.redirect(`/games/${req.params.gameId}/details`)
    
} catch (error) {
    return res.render(`games/${gameId}/edit`, 'Unable to update game info!', ...gameData);
}


});


router.get('/:gameId/delete',async (req,res)=>{
    await gameService.delete(req.params.gameId);
    res.redirect('/games/catalog')

})




module.exports = router;
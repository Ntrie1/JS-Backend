const router = require('express').Router();

const animalService = require('../services/animalService');
const { isAuth } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorUtils')


router.get('/search', (req, res) => {
    res.render('animals/search')
})

router.post('/search', async (req, res) => {
    const location = req.body.location.toLowerCase();
    const animals = await animalService.getAll().lean();


    const searchedAnimals = [];


    for (const animal of animals) {
        const animalLocation = animal.location.toLowerCase();

        if (animalLocation.includes(location)) {
            searchedAnimals.push(animal);
        }
    }
    res.render('animals/search', { searchedAnimals })


})





router.get('/create', isAuth, (req, res) => {
    res.render('animals/create');
});

router.post('/create', isAuth, async (req, res) => {
    const animalData = {
        ...req.body,
        owner: req.user._id
    }

    try {
        await animalService.create(animalData)

        res.redirect('/animals/dashboard');
    } catch (error) {
        return res.status(400).render('animals/create', { error: getErrorMessage(error) });
    }


});


router.get('/:animalId/edit', isAuth, async (req, res) => {
    const animal = await animalService.getOne(req.params.animalId).lean();
    res.render('animals/edit', { animal })
});

router.post('/:animalId/edit', isAuth, async (req, res) => {
    const animalData = req.body;
    const animalId = req.params.animalId;

    await animalService.edit(animalId, animalData);
    res.redirect(`/animals/${animalId}/details`)

})


router.get('/dashboard', async (req, res) => {
    const animals = await animalService.getAll().lean();

    res.render('animals/dashboard', { animals });
});


router.get('/:animalId/details', async (req, res) => {
    const animal = await animalService.getOne(req.params.animalId).lean();

    const isCreator = animal.owner == req.user?._id;

    const hasDonated = animal.donations == req.user?._id;

    res.render('animals/details', { animal, isCreator, hasDonated });
});


router.get('/:animalId/donate', isAuth, async (req, res) => {
    const userId = req.user._id;
    const animalId = req.params.animalId;
    const animal = await animalService.getOne(animalId).lean();


    try {
        if (animal.donations == userId) {
            throw new Error('You have alredy donated!')
        }
        await animalService.donate(userId, animalId);
    } catch (error) {

    }



});


router.get('/:animalId/delete', isAuth, async (req, res) => {
    await animalService.delete(req.params.animalId);
    res.redirect('/animals/dashboard');
})







module.exports = router;


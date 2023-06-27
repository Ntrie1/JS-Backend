const router = require('express').Router();

const animalService = require('../services/animalService');

router.get('/', async (req, res) => {
    const animals = await animalService.getAll().lean()
    const lastThreeAnimals = animals.slice(-3).reverse();
   // console.log(lastThreeAnimals);

    res.render('home', { lastThreeAnimals })
})



module.exports = router;
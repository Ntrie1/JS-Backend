const router = require('express').Router();

const { isAuth } = require('../middlewares/authMiddleware');
const cryptoServices = require('../services/cryptoService');
const { getErrorMessage } = require('../utils/errorUtils');
const { getPaymentMethodViewData } = require('../utils/viewData')


router.get('/catalog', async (req, res) => {
    const crypto = await cryptoServices.getAll().lean();

    res.render('crypto/catalog', { crypto })
});

router.get('/search', async (req,res)=>{
    const {name, paymentMethod} = req.query;
    const crypto = await cryptoServices.search(name, paymentMethod);
    const paymentMethods = getPaymentMethodViewData(paymentMethod);

    res.render('crypto/search', {crypto, paymentMethods, name})
})


router.get('/:cryptoId/details', async (req, res) => {
    const crypto = await cryptoServices.getOne(req.params.cryptoId);

    const isOwner = crypto.owner == req.user?._id;
    const isBuyer = crypto.buyers && crypto.buyers.some(id => id == req.user?._id);

    res.render('crypto/details', { crypto, isOwner, isBuyer })
});


router.get('/:cryptoId/buy', isAuth, async (req, res) => {
    try {
        await cryptoServices.buy(req.user._id, req.params.cryptoId);
        res.redirect(`/crypto/${req.params.cryptoId}/details`)     
    } catch (error) {
        return res.status(400).render('home/404', { error: getErrorMessage(error) })
    }

});

router.get('/:cryptoId/edit', isAuth, async (req, res) => {
    const crypto = await cryptoServices.getOne(req.params.cryptoId);

    const paymentMethods = getPaymentMethodViewData(crypto.paymentMethod);

    res.render('crypto/edit', { crypto, paymentMethods })
});

router.post('/:cryptoId/edit', isAuth, async (req, res) => {
    const cryptoData = req.body;

    const crypto = await cryptoServices.edit(req.params.cryptoId, cryptoData);


    res.redirect(`/crypto/${req.params.cryptoId}/details`)
});

router.get('/:cryptoId/delete', isAuth, async (req, res) => {
    await cryptoServices.delete(req.params.cryptoId);

    res.redirect('/crypto/catalog');
})


router.get('/create', isAuth, (req, res) => {
    res.render('crypto/create')
});

router.post('/create', isAuth, async (req, res) => {
    const cryptoData = req.body;

    try {
        await cryptoServices.create(req.user._id, cryptoData);
    } catch (error) {
        return res.status(400).render('crypto/create', { error: getErrorMessage(error) });
    }

    res.redirect('/crypto/catalog')
});



module.exports = router;

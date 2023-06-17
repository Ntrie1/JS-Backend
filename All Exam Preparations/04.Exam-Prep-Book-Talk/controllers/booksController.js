const router = require('express').Router();

const bookService = require('../services/bookService');
const { getErrorMessage } =  require('../utils/errorUtils');
const { isAuth } = require('../middlewares/authMiddleware');

router.get('/catalog', async (req,res)=>{
    const books = await bookService.getAll().lean();
    res.render('books/catalog', {books});
});


router.get('/create',isAuth, (req,res)=>{
    res.render('books/create');
});

router.post('/create',isAuth, async (req,res)=>{
    const bookData = {
        ...req.body,
        owner: req.user._id
    }

    try {
        await bookService.create(bookData);
        res.redirect('/books/catalog');
    } catch (error) {
        return res.render('books/create', { error: getErrorMessage(error) });
    }

});

router.get('/:bookId/details', async (req,res)=>{

    const book = await bookService.getOneById(req.params.bookId).lean();
    const isOwner = book.owner == req.user?._id;
    const yetToWish = book.wishingList != req.user?._id;

    res.render('books/details', {book, isOwner , yetToWish})
});

router.get('/:bookId/details/wishlist',isAuth, async (req,res)=>{
    const bookId = req.params.bookId;
    const userId = req.user._id;
    const book = await bookService.getOneById(req.params.bookId).lean();

    try {
        if(userId != book.wishingList){
            await bookService.addToWishList(userId, bookId);
            res.redirect(`/books/${bookId}/details`)
        } 
    } catch (error) {
        return res.render(`home`, { error: getErrorMessage(error) });
    }

});

router.get('/:bookId/edit', async (req,res)=>{
    const book = await bookService.getOneById(req.params.bookId).lean();
    res.render('books/edit', {book})
});

router.post('/:bookId/edit', async (req,res)=>{
    const bookData = req.body;
    const bookId = req.params.bookId

    try {
        await bookService.edit(bookId, bookData);
        res.redirect(`/books/${bookId}/details`);
    } catch (error) {
        return res.render(`books/${bookId}/edit`, 'Unable to update book info!', ...gameData);
    }

})

router.get('/:bookId/delete', async(req,res)=>{
        await bookService.delete(req.params.bookId)
        res.redirect('/books/catalog');
});



module.exports = router;
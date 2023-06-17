const Book = require('../models/Book');



exports.create = (bookData) => Book.create(bookData);

exports.getAll = () => Book.find({});

exports.getOneById = (bookId) => Book.findById(bookId);

exports.addToWishList = async (userId, bookId) =>{
    const book = await this.getOneById(bookId);
    book.wishingList.push(userId);
    return book.save();
}

exports.delete = (bookId) => Book.findByIdAndDelete(bookId);

exports.edit = (bookId, bookData) => Book.findByIdAndUpdate(bookId, bookData);

exports.getByOwnerId = (ownerId) => Book.find({wishingList: ownerId});
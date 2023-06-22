const Auction = require('../models/Auction');


exports.create = (auctionData) => Auction.create(auctionData);

exports.getAll = () => Auction.find({});

exports.getOneById = (auctionId) => Auction.findById(auctionId);

exports.bid = async (userId, auctionId, price) => {
    const auction = await this.getOneById(auctionId);
    auction.bidder = userId;
    auction.price = price;
    return auction.save();

}

exports.delete = (auctionId) => Auction.findByIdAndDelete(auctionId);
const Hotel = require('../models/Hotel');


exports.create = (hotelData) =>  Hotel.create(hotelData);

exports.getAll = () => Hotel.find({});

exports.getOneById = (hotelId) => Hotel.findById(hotelId);

exports.edit = (hotelId, hotelData) => Hotel.findByIdAndUpdate(hotelId, hotelData);

exports.book = async (userId, hotelId) =>{
    const hotel = await this.getOneById(hotelId);
    hotel.usersBooked.push(userId);
    hotel.freeRooms = hotel.freeRooms - 1;
    return hotel.save();
}


 
exports.getByOwnerId = (ownerId) => Hotel.find({usersBooked: ownerId});

exports.delete = (hotelId) => Hotel.findByIdAndDelete(hotelId);


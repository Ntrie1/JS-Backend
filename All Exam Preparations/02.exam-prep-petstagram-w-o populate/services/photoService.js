const Photo = require('../models/Photo');


exports.create = (ownerId, photoData) => Photo.create({...photoData, owner: ownerId});

exports.getAll = () => Photo.find({});

exports.getOne = (photoId) => Photo.findById(photoId);

exports.createComment = async (userId, photoId, comment) => {
    let photo = await Photo.findById(photoId);
    photo.commentList.push({ UserId: userId, comment });
   return photo.save();
};

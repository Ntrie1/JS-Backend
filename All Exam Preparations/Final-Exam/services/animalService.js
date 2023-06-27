const Animal = require('../models/Animal');


exports.create = (animalData) => Animal.create(animalData);

exports.getAll = () => Animal.find({});

exports.getOne = (animalId) => Animal.findById(animalId);

exports.donate = async (userId, animalId) => {
    const animal = await this.getOne(animalId);
    animal.donations.push(userId);
    return animal.save();

}

exports.edit = (animalId, animalData) => Animal.findByIdAndUpdate(animalId, animalData);

exports.delete = (animalId) => Animal.findByIdAndDelete(animalId);
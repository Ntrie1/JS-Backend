const Crypto = require('../models/Crypto');


exports.getAll = () => Crypto.find({});

exports.getOne = (cryptoId) => Crypto.findById(cryptoId).lean();

exports.search = async (name, paymentMethod) =>{
    let crypto = await this.getAll().lean();

    if(name){
        crypto = crypto.filter(x => x.name.toLowerCase() == name.toLowerCase())
    }

    if(paymentMethod){
        crypto = crypto.filter(x => x.paymentMethod == paymentMethod)
    }

    return crypto;

}

exports.buy = async (userId, cryptoId) => {

    //  Using mongodb ->>>
    //   Crypto.findByIdAndUpdate(cryptoId, { $push: { buyers: userId } })

    // Using mongoose ->>>
    const crypto = await Crypto.findById(cryptoId);
    crypto.buyers.push(userId);
   return crypto.save();
   


} 

exports.create = (ownerId, cryptoData) => Crypto.create({ ...cryptoData, owner: ownerId });

exports.edit = (cryptoId, cryptoData) => Crypto.findByIdAndUpdate(cryptoId, cryptoData, {runValidators: true});

exports.delete = (cryptoId) => Crypto.findByIdAndDelete(cryptoId)
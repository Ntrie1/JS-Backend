const Game = require('../models/Game');


exports.create = (gameData) => Game.create(gameData)

exports.getAllGames = () => Game.find({});

exports.getOneById = (gameId) => Game.findById(gameId).populate('owner');

exports.buyGame = async (gameId, userId) => {
    const game = await Game.findById(gameId);
    game.boughtBy.push(userId);
    return game.save();
}

exports.edit =(gameId, gameData)=> Game.findByIdAndUpdate(gameId, gameData)

exports.delete =(gameId)=> Game.findByIdAndDelete(gameId);

exports.search = async (name, platform) =>{
    let games = await this.getAllGames().lean();

    if(name){
        games = games.filter(x => x.name.toLowerCase() == name.toLowerCase());
    }

    if(platform){
        games = games.filter(x => x.platform == platform);
    }

    return games;


}
const Post = require('../models/Post');



exports.create = (postData) => Post.create(postData);

exports.getAll = () => Post.find({});

exports.getPostById = (postId) => Post.findById(postId);

exports.getByOwner = (ownerId) => Post.find({ author: ownerId });

exports.upVote = async (userId, postId) => {
    const post = await this.getPostById(postId);
    post.votesOnPost.push(userId);
    post.ratingOfPost++;
    return post.save();
}

exports.downVote = async (userId, postId) => {
    const post = await this.getPostById(postId);
    post.votesOnPost.push(userId);
    post.ratingOfPost--;
    return post.save();
}


exports.edit = (postId, postData) => Post.findByIdAndUpdate(postId, postData)

exports.delete = (postId) => Post.findByIdAndDelete(postId); 

const User = require('./user');
const Post = require('./post');
const Vote = require('./vote');
const Comment = require('./comment');

User.hasMany(Post, Vote, Comment, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

Post.hasMany(Comment, Vote, {
    foreignKey: 'post_id'
});

Comment.belongsTo(Post, User, {
    foreignKey: 'post_id',
    foreignKey: 'user_id'
});

Vote.belongsTo(Post, {
    foreignKey: 'post_id'
});


module.exports - {User, Post, Vote, Comment};
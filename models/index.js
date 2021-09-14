const User = require ('./User');
const Post = require ('./Post');
const Vote = require('./Vote');
const Comment = require('./Comment');

User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

User.belongsToMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});
  
Post.belongsToMany(User, {
    foreignKey: 'post_id',
    onDelete: 'SET NULL'
});

Vote.belongsTo(User, {
    foreignKey: 'user_id'
});

Vote.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'SET NULL'
});

User.hasMany(Vote, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Post.hasMany(Vote, {
    foreignKey: 'post_id',
    onDelete: 'SET NULL'
});

Comment.belongsTo(User, {
   foreignKey: 'user_id',
   onDelete: 'SET NULL'
});
  
Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'SET NULL'
});
  
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});
  
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'SET NULL'
});

module.exports = { User, Post, Vote, Comment };
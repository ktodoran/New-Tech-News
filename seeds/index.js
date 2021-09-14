const seedUsers = require('./User');
const seedPosts = require('./Post');
const seedComments = require('./Comment');

const sequelize = require('../config/connection');

const seedAll = async() => {
    await sequelize.sync({ force: true });
    await seedUsers();
    await seedPosts();
    await seedComments();
    process.exit(0);
};

seedAll();
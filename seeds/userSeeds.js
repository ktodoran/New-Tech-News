const { User } = require('../models');

const userData = [{
        username:'ktodoran',
        password: 'kyle321'

    },
    {
        username: 'tester',
        password: 'testy'
    },
    {
        username: 'Kawhi',
        password: 'spurs'
    }
];

const seedUsers = () => User.bulkCreate(userData, {individualHooks: true });

module.exports = seedUsers;
const { User } = require('../models');

const userData = [{
        username: 'Kyle',
        password: 'ktodoran'

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

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
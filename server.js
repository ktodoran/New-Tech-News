const path = require('path');
const express = require('express');
const session = require('express-session');
const routes = require('./routes');
const sequelize = require('./config/connection');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const handlebars = exphbs.create({ helpers});
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

const SequelStore = require('connect-session-sequelize')(session.Store);

const sessions = {
    secret: process.env.SESSION_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelStore({
        db: sequelize
    })
};

app.use(session(sessions));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
//Start Routes
app.use(routes);

//Start connection to db and server
sequelize.sync({ force: false }).then( () => {
    app.listen(PORT, () => console.log('Now Listening to PORT 3001!'));
});
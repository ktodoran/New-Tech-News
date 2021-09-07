const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');
const Handlebars = require("handlebars");
const template = Handlebars.compile("Name: {{name}}");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("View Engine", "handlebars");

app.use(routes);

sequelize.sync({ force: false }).then( () => {
    app.listen(PORT, () => console.log('Now Listening to PORT 3001!'));
});
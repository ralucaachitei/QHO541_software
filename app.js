require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const connectDB = require('./server/config/db');

const app = express();
const port = 5000 || process.env.PORT;

//help passing the data through the port
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Static files
app.use(express.static('public'));

//Template engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

//Routes
app.use('/', require('./server/routes/product'));

//Handle 404
app.get('*', (req, res) => {
  res.status(404).render('404');
});

app.listen(port, () => {
  console.log(`listening on port ${port}`)
});


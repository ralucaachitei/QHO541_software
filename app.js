require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const mongoose = require('mongoose'); // Import mongoose

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => {
      console.error('MongoDB connection error:', err);
      console.log('MONGODB_URI:', MONGODB_URI);
      process.exit(1); // Optional: exit if cannot connect to DB
  });

const app = express();
const port = process.env.PORT || 5000;

// Help passing the data through the port
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static files
app.use(express.static('public'));

// Template engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./server/routes/product'));
app.use('/', require('./server/routes/review'));

// Handle 404
app.get('*', (req, res) => {
  res.status(404).render('404');
});

app.listen(port, () => {
  console.log(`listening on port ${port}`)
});

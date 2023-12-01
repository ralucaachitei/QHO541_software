const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const chalk = require("chalk");
const path = require('path');
const session = require('express-session');
const methodOverride = require('method-override');
require('dotenv').config();

const app = express();


// Import router

const productRouter = require('./server/router/product');
const reviewRouter = require('./server/router/review');
const categoryRouter = require('./server/router/categories');
const indexRouter = require('./server/router/index');
const userRouter = require("./server/router/user");

const User = require("./server/models/User");
const Product = require("./server/models/Product");
// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB:', err));

// EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(methodOverride('_method'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
// Session configuration
app.use(session({
    secret: 'raluca', 
    resave: false,
    saveUninitialized: true,
    
}));

app.use(async (req, res, next) => {
    if (req.session.userID) {
        try {
            const user = await User.findById(req.session.userID);
            res.locals.user = user; // Make user data available in all views
        } catch (error) {
            console.error("Error finding user:", error);
        }
    }
    next();
});
  
  const authMiddleware = async (req, res, next) => {
    const user = await User.findById(req.session.userID);
    if (!user) {
      return res.redirect('/');
    }
    next()
  }
  
  app.delete('/product/:id', async (req, res) => {
    try {
      const result = await Product.deleteOne({ _id: req.params.id });
      if (result.deletedCount === 0) {
        return res.status(404).send("Product not found.");
      }
      res.redirect('/products');
    } catch (error) {
      console.error(error);
      res.status(500).send("Error deleting the product.");
    }
  });
  
  app.get("/logout", async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            // handle error case...
            console.error(err);
            res.redirect('/');
        } else {
            res.redirect('/');
        }
    });
});
  

// Custom middleware to check for a special _method field in POST requests
app.use((req, res, next) => {
    if (req.method === 'POST' && req.body && typeof req.body === 'object' && '_method' in req.body) {
        // Change the original method to the one specified in _method
        req.method = req.body._method.toUpperCase();
        delete req.body._method;
    }
    next();
});

// Mount router

app.use('/product', productRouter
);
app.use('/review', reviewRouter
);
app.use('/categories', categoryRouter
); 
app.use('/', indexRouter);
app.use('/user', userRouter);
// Root route
app.get('/', (req, res) => {
    res.redirect('/index');
});

// 404 Error handler
app.use((req, res, next) => {
    res.status(404).render('404');
});

// Server start
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Login route
router.get('/login', (req, res) => {
    res.render('user/login-user', { errors: {} });
});

router.post('/login', userController.login);

// Registration route
router.get('/register', (req, res) => {
    res.render('user/create-user', { errors: {} });
});

router.post('/register', userController.create);

module.exports = router;
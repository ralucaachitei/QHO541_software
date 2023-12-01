const User = require('../models/User');
const bcrypt = require('bcrypt');
/* This function handles the login process for the application.
* It searches for the user by email, then compares the provided password with the stored hash.
* If the credentials are valid, the user is redirected to the homepage.
* Otherwise, appropriate error messages are displayed for incorrect email or password.
*/
exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.render('login-user', { errors: { email: { message: 'email not found' } } })
            return;
        }

        const match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
            req.session.userID = user._id;
            console.log(req.session.userID);
            res.redirect('/');
            return
        }

        res.render('login-user', { errors: { password: { message: 'password does not match' } } })


    } catch (e) {
        return res.status(400).send({
            message: JSON.parse(e),
        });
    }
}
/**
 * This function handles the creation of a new user.
 * It takes the email and password from the request body, creates a new User object, and saves it to the database.
 * Upon successful creation, the user is redirected with a success message.
 * If there are validation errors, it renders the user creation page with error details.
 * For other exceptions, it sends a 400 status with the error message.
 */
exports.create = async (req, res) => {
    try {

        const user = new User({ email: req.body.email, password: req.body.password });
        await user.save();
        res.redirect('/?message=user saved')
    } catch (e) {
        if (e.errors) {
            console.log(e.errors);
            res.render('create-user', { errors: e.errors })
            return;
        }
        return res.status(400).send({
            message: JSON.parse(e),
        });
    }
}
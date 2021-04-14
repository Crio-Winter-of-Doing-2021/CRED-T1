const express = require('express');

const authController = require("../controllers/authController");
const viewController = require("../controllers/viewController");
const { route } = require('./basicRoutes');

const router = express.Router();


router.route('/').get(authController.isLoggedIn, viewController.getHomePage);
router.route('/about').get(viewController.getAboutPage);
router.route('/login').get(viewController.getLoginPage);
router.route('/signup').get(viewController.getSignupPage);
router.route('/dashboard').get(authController.isLoggedIn,viewController.getDashboardPage);
router.route('/add-card').get(authController.isLoggedIn, viewController.getAddCardPage);
router.route('/view-card').get(authController.isLoggedIn, viewController.getViewCardPage);
// router.route('*').get(viewController.getErrorPage).post(viewController.getErrorPage);
module.exports = router;
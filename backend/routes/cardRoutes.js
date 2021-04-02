const express = require('express');

const cardController = require("../controllers/cardController");
const authController = require("../controllers/authController");
const router = express.Router();



router.route('/add-card').post( authController.isLoggedIn , cardController.addCard );
router.route('/get-card').get( authController.isLoggedIn, cardController.getCard);

module.exports = router;
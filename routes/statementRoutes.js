const express = require('express');

const statementControler = require("../controllers/statementController");

const authController = require("../controllers/authController");
const router = express.Router();


router.route('/add').post(authController.isLoggedIn, statementControler.addStatement);
router.route('/get-debits/:cardId').get(authController.isLoggedIn, statementControler.getDebitStatement);
router.route('/get-credits/:cardId').get(authController.isLoggedIn, statementControler.getCreditStatement);
router.route('/get-all/:cardId').get(authController.isLoggedIn, statementControler.getAllStatement);


module.exports = router;
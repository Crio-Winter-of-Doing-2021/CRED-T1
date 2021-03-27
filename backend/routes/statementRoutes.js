const express = require('express');

const statementControler = require("../controllers/statementController");

const authController = require("../controllers/authController");
const router = express.Router();

router.route('/add').post(authController.isLoggedIn, statementControler.addStatement);
router.route('/get-debits').get(authController.isLoggedIn, statementControler.getDebitStatement);
router.route('/get-credits').get(authController.isLoggedIn, statementControler.getCreditStatement);
router.route('/get-all').get(authController.isLoggedIn, statementControler.getAllStatement);


module.exports = router;
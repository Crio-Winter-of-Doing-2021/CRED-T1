const express = require('express');

const authController = require("../controllers/authController");


const router = express.Router();


 /**
* @swagger
* /signup:
*   post:
*     tags:
*       - auth
*     name: Adduser
*     summary: Signup Route
*     consumes:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         schema:
*           type: object
*           properties:
*             name:
*               type: string
*             username:
*               type: string
*             email:
*               type: string
*             gender:
*               type: string
*             password:
*               type: string
*         required:
*           - name
*           - username
*           - email
*           - gender
*           - password
*                   
*     responses:
*       200:
*         description: success
*       400:
*         description: failed 
*/
router.route('/signup').post(authController.addUser);
router.route('/verify/:token/:id').get(authController.verifyUser);
router.route('/login').post(authController.login);
router.route('/logout').post(authController.logout);


module.exports = router;
const express = require('express');

const authController = require("../controllers/authController");


const router = express.Router();


 /**
* @swagger
* /api/signup:
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
*
* /api/login:
*   post:
*     tags:
*       - auth
*     name: Adduser
*     summary: Login Route
*     consumes:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         schema:
*           type: object
*           properties:
*             email:
*               type: string
*             password:
*               type: string
*         required:
*           - email
*           - password
*                   
*     responses:
*       200:
*         description: success
*       400:
*         description: failed  
* 
* /logout:
*   get:
*     tags:
*       - auth
*     name: Logouts the logged in user
*     summary: Logout
*     consumes:
*       - application/json
*     produces:
*       - application/json
*     responses:
*       200:
*         description: successful query
*       400:
*         description: Bad Request
*/
router.route('/signup').post(authController.addUser);
router.route('/verify/:token/:id').get(authController.verifyUser);
router.route('/login').post(authController.login);
router.route('/logout').get(authController.logout);
router.route('/check').get(authController.isLoggedIn, authController.check);


module.exports = router;
const express = require('express');

const cardController = require("../controllers/cardController");
const authController = require("../controllers/authController");
const router = express.Router();

 /**
* @swagger
* /card/get-card:
*   get:
*     tags:
*       - card
*     name: get all cards
*     summary: gets card of authenticated user
*     consumes:
*       - application/json
*     produces:
*       - application/json
*     responses:
*       200:
*         description: successful query
*       400:
*         description: Bad Request
*
* /card/add-card:
*   post:
*     tags:
*       - card
*     name: Add Card
*     summary: Add a card of logged in user
*     consumes:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         schema:
*           type: object
*           properties:
*             number:
*               type: string
*             expiry:
*               type: string
*             name:
*               type: string
*         required:
*           - number
*           - expiry
*           - name
*                   
*     responses:
*       200:
*         description: success
*       400:
*         description: failed  
* 
*/

router.route('/add-card').post( authController.isLoggedIn , cardController.addCard );
router.route('/get-card').get( authController.isLoggedIn, cardController.getCard);

module.exports = router;
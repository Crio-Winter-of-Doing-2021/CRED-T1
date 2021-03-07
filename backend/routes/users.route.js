const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/users.controller');

// sign-up user
router.post('/signup', userControllers.signup);

// login user
router.post('/login', userControllers.login);
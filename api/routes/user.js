const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const userController = require('../controllers/user');

/* @POST(/users/signup) */
router.post('/signup', userController.users_signUp);

/* @POST(/users/login) */
router.post('/login', userController.users_login);

/* @POST(/users/{:userId}) */
router.delete('/:userId', checkAuth, userController.users_delete);

module.exports = router;
const express = require('express');
const router = express.Router();

const loginController = require('../app/controllers/loginController');

router.get('/sign-in', loginController.signIn);
router.get('/sign-up', loginController.signUp);
router.post('/register', loginController.register);
router.post('/checked', loginController.checked);

module.exports = router;

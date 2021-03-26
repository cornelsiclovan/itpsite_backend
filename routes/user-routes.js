const express = require('express');

const userControllers = require('../controllers/user-controllers');

const router = express.Router();

router.get('/', userControllers.getUsers);

router.post('/signup', userControllers.signup);

router.post('/login', userControllers.login);

router.patch('/:id', userControllers.patchUser);

module.exports = router;

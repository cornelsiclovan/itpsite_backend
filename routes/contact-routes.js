const express = require('express');
const contactControllers = require('../controllers/contact-controllers');

const router = express.Router();



router.get('/', contactControllers.getContacts);
router.post('/', contactControllers.postContact);
router.patch('/:id', contactControllers.patchContact);


module.exports = router 
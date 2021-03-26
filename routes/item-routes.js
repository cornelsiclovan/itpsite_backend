const express = require('express');
const itemControllers = require('../controllers/item-controllers');

const router = express.Router();

router.get('/', itemControllers.getItems);
router.get('/:id', itemControllers.getItemById);
router.post('/', itemControllers.postItem);
router.patch('/:id', itemControllers.patchItem);

module.exports = router 
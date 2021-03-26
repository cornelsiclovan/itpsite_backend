const express = require('express');
const serviceControllers = require('../controllers/service-controllers');


const router = express.Router();



router.get('/', serviceControllers.getServices);
router.get('/:id', serviceControllers.getServiceById);
router.post('/', serviceControllers.postService);
router.patch('/:id', serviceControllers.patchService);


module.exports = router 
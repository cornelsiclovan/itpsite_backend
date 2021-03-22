const express = require('express');
const programControllers = require('../controllers/program-controllers');

const router = express.Router();



router.get('/', programControllers.getPrograms);
router.post('/', programControllers.postProgram);
router.patch('/:id', programControllers.patchProgram);


module.exports = router 
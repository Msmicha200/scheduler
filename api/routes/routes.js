const { Router } = require('express');
const router = Router();
const Controller = require('../controllers/controller.js');
const controller = new Controller();

router.get('/statuses', controller.statuses);

router.get('/tasks', controller.tasks);

router.post('/newtask', controller.newTask);

router.post('/save', controller.save);

module.exports = router;
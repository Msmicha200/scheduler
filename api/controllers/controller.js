const Task = require('../models/Task');
const Status = require('../models/Status');

module.exports = class Controller {
    async tasks(req, res) {
        const tasks = await Task.find().populate('status');

        res.send(tasks);
    }

    async statuses(req, res) {
        const statuses = await Status.find({});

        res.send(statuses);
    }
}
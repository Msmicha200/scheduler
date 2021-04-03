const Task = require('../models/Task');
const Status = require('../models/Status');

module.exports = class Controller {
    async tasks(req, res) {
        Task.find().populate('status').sort({'_id': -1})
        .then(tasks => {
            res.send(tasks);
        })
        .catch(result => {
            res.send([]);
        });
    }

    statuses(req, res) {
        Status.find({}).then(statuses => {
            res.send(statuses);            
        })
        .catch(result => {
            res.send([]);
        });
    }

    newTask(req, res) {
        const task = new Task({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status
        });

        task.save().then(result => {
            res.send({
                success: true
            });
        })
        .catch(err => {
            res.send({
                success: false
            });
        });
    }

    save(req, res) {
        Task.findOneAndUpdate({ _id: req.body._id}, {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status
        })
        .then(result => {
            res.send({
                success: true
            });
        })
        .catch(result => {
            console.log(result);
            res.send({
                success: false
            });
        })
    }
}
'use strict';

var mongoose = require('mongoose');
var Task = mongoose.model('Tasks');

exports.listAllTasks = function(req, res) {
    console.log("Getting all tasks");
    Task.find({}, function(err, task) {
        if (err) {
            res.send(err);
            console.error(err);
            return;
        }
        
        if (task && task.length)
            console.log(task.length + " tasks successfully returned");
        else if (task)
            console.log("1 task successfully returned");
        else
            console.log("0 tasks successfully returned");

        res.json(task);
    });
};

exports.createATask = function(req, res) {
    var newTask = new Task(req.body);
    console.log("Creating task " + JSON.stringify(req.body));

    newTask.save(function(err, task) {
        if (err) {
            res.send(err);
            console.error(err);
            return;
        }
        
        console.log("Task successfully created");
        res.json(task);
    });
};

exports.readATask = function(req, res) {
    console.log("Trying to read task");
    Task.findById(req.params.taskId, function(err, task) {
        if (err) {
            res.send(err);
            console.error(err);
            return;
        }
        
        console.log("Task " + req.params.taskId + " successfully read");
        res.json(task);
    });
};

exports.updateATask = function(req, res) {
    console.log("Trying to update task " + req.params.taskId + " with " + JSON.stringify(req.body));
    Task.findOneAndUpdate({ _id: req.params.taskId }, req.body, { new: true}, function(err, task) {
        if (err) {
            res.send(err);
            console.error(err);
            return;
        }

        console.log("Task successfully updated");
        res.json(task);
    });
};

exports.deleteATask = function(req, res) {
    console.log("Trying to delete task " + req.params.taskId);
    Task.deleteOne({ _id: req.params.taskId }, function(err, task) {
        if (err) {
            res.send(err);
            console.error(err);
            return;
        }
        
        console.log("Task successfully deleted");
        res.json({ message: "Task successfully deleted" });
    });
};
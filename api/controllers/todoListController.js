'use strict';

var mongoose = require('mongoose');
var Task = mongoose.model('Tasks');

exports.listAllTasks = function(req, res) {
    Task.find({}, function(err, task) {
        if (err)
            res.send(err);
        
        res.json(task);
    });
};

exports.createATask = function(req, res) {
    var newTask = new Task(req.body);

    newTask.save(function(err, task) {
        if (err)
            res.send(err);
        
        res.json(task);
    });
};

exports.readATask = function(req, res) {
    Task.findById(req.params.taskId, function(err, task) {
        if (err)
            res.send(err);
        
        res.json(task);
    });
};

exports.updateATask = function(req, res) {
    Task.findOneAndUpdate({ _id: req.params.taskId }, req.body, { new: true}, function(err, task) {
        if (err)
            res.send(err);
        
        res.json(task);
    });
};

exports.deleteATask = function(req, res) {
    Task.remove({ _id: req.params.taskId }, function(err, task) {
        if (err)
            res.send(err);
        
        res.json({ message: "Task successfully deleted" });
    });
};
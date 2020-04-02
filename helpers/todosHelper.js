var db = require("../models");

exports.getToDos = function(req, res) {
  db.ToDo.find()
    .then(function(todos) {
      res.json(todos);
    })
    .catch(function(error) {
      res.send(error);
    });
};

exports.createToDo = function(req, res) {
  db.ToDo.create(req.body)
    .then(function(newTodo) {
      res.status(201).json(newTodo);
    })
    .catch(function(err) {
      res.send(err);
    });
};

exports.getToDo = function(req, res) {
  db.ToDo.findById(req.params.todoId)
    .then(foundTodo => res.json(foundTodo))
    .catch(function(err) {
      res.send(err);
    });
};

exports.updateToDo = function(req, res) {
  db.ToDo.findOneAndUpdate({ _id: req.params.todoId }, req.body, { new: true })
    .then(todo => res.json(todo))
    .catch(err => res.send(err));
};

exports.deleteToDo = function(req, res) {
  db.ToDo.remove({ _id: req.params.todoId })
    .then(() => res.json({ message: "delete this" }))
    .catch(err => res.send(err));
};

module.exports = exports;

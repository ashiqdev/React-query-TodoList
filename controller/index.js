const mongoose = require('mongoose');
const Todo = require('../model/Todo');

exports.getTodos = async (req, res) => {
  const todos = await Todo.find();
  res.status(200).json({ todos });
};

exports.getById = async (req, res) => {
  const todo = await Todo.findOne({ _id: req.params.id });
  if (!todo) return res.status(404).json({ msg: 'Task not found' });
  res.status(200).json({ todo });
};

exports.createTodo = async (req, res) => {
  const { task, completed } = req.body;
  const todo = await new Todo({ task, completed }).save();
  res.status(201).json({ todo });
};

exports.deleteById = async (req, res) => {
  const todo = await Todo.findOneAndDelete({ _id: req.params.id });
  if (!todo) return res.status(404).json({ msg: 'Task not found' });
  res.status(200).json({ todo });
};

exports.updateById = async (req, res) => {
  const { task, completed } = req.body;
  const todo = await Todo.findOneAndUpdate(
    { _id: req.params.id },
    { task, completed },
    { new: true }
  );
  if (!todo) return res.status(404).json({ msg: 'Task not found' });

  res.status(200).json({ todo });
};

exports.toggleById = async (req, res) => {
  let todoItem = await Todo.findOne({ _id: req.params.id });
  if (!todoItem) return res.status(404).json({ msg: 'Task not found' });
  const todo = await Todo.findOneAndUpdate(
    { _id: req.params.id },
    { completed: !todoItem.completed},
    { new: true }
  );
  res.status(200).json({ todo });
};

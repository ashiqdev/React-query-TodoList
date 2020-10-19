const mongoose = require('mongoose');

const { Schema } = mongoose;

const todoSchema = new Schema({
  task: { type: String, trim: true, required: true },
  completed: { type: Boolean, default: false },
});

module.exports = mongoose.model('Todo', todoSchema);

const mongoose = require('mongoose');

const DATABASE = "mongodb://127.0.0.1:27017/todolist"

// connect to db
exports.connectWithDb = () => {
  const mongodbOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  };

  mongoose.connect(DATABASE, mongodbOptions, (err) => {
    if (err) {
      throw err;
    }
  });
};

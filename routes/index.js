const express = require('express');
const { catchErrors } = require('../handlers/errorHandler');
const {
  getTodos,
  getById,
  updateById,
  deleteById,
  createTodo,
  toggleById
} = require('../controller');
const router = express.Router();

router.get('/', catchErrors(getTodos));

router.get('/:id', catchErrors(getById));

router.post('/', catchErrors(createTodo));

router.put('/:id', catchErrors(updateById));

router.patch('/:id', catchErrors(toggleById));

router.delete('/:id', catchErrors(deleteById));

module.exports = router;

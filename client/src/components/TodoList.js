import React from 'react';
import Todo from './Todo';

const TodoList = ({ todos }) => {
  return (
    <ul className='todoList'>
      {todos?.map((todo,i) => (
        <Todo key={i} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;
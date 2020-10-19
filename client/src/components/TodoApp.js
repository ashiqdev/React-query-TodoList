import React  from 'react';
import { useQuery } from 'react-query';
import Form from './Form';
import TodoList from './TodoList';
import axios from 'axios';

const fetchPosts = async () => {
  const { data: {todos} } = await axios.get(`http://localhost:7777/api`);
  return todos;
};

const TodoApp = () => {
  const { data: todos, isLoading, error } = useQuery('tasks', fetchPosts);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error...{error.message}</div>;
  return (
    <div className='wrapper'>
      <Form />
      <TodoList todos={todos} />
    </div>
  );
};

export default TodoApp;

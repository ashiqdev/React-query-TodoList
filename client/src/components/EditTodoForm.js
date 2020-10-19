import React from 'react';
import useInputState from '../hooks/useInputState';
import { queryCache, useMutation} from 'react-query';
import axios from 'axios';

const EditTodoForm = ({ todo, toggle }) => {
  const [value, handleChange, reset] = useInputState(todo.task);

  const [mutate] = useMutation(
    (newTodo) => axios.put(`http://localhost:7777/api/${todo._id}`, newTodo),
    {
      onMutate: (newTask) => {
        console.log(newTask);
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        queryCache.cancelQueries('tasks');

        // Snapshot the previous value
        const previousTask = queryCache.getQueryData('tasks');

        // Optimistically update to the new value
        queryCache.setQueryData('tasks', (oldTasks) =>
          oldTasks.map((item) => (item._id === todo._id ? {...item, task:newTask.task} : item))
        );

        return () => queryCache.setQueryData('tasks', previousTask);
      },

      onError: (error, newTask, rollback) => {
        //   If there is an errror, then we will reset the tasks to previous tasks
        rollback();
      },
      onSettled: (data, error, newTask) => {
        queryCache.refetchQueries('tasks');
      },
    }
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutate({ task: value });
        reset();
        toggle(false);
      }}
    >
      <input
        type='text'
        autoFocus
        className='edit'
        onChange={handleChange}
        value={value}
      />
    </form>
  );
};

export default EditTodoForm;

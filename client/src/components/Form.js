import React from 'react';
import axios from 'axios';
import { queryCache, useMutation } from 'react-query';
import UseInputState from '../hooks/useInputState';

const Form = () => {
  const [value, onChangeHandler, reset] = UseInputState('');

  const [mutate] = useMutation(
    (values) => axios.post('http://localhost:7777/api', values),
    {
      onMutate: (newTask) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        queryCache.cancelQueries('tasks');
        //   optimistic update
        const previousTasks = queryCache.getQueryData('tasks');
        queryCache.setQueryData('tasks', (old) => [...old, newTask]);
        return () => queryCache.setQueryData('tasks', previousTasks);
      },

      onError: (error, newTask, rollback) => {
        //   If there is an errror, then we will reset the tasks to previous tasks
        rollback();
      },
      onSettled: () => {
        queryCache.refetchQueries('tasks');
      },
    }
  );

  return (
    <form
      className='form'
      onSubmit={(e) => {
        e.preventDefault();
        mutate({ task: value });
        reset();
      }}
    >
      <input
        type='text'
        className='form__box'
        onChange={onChangeHandler}
        name='task'
        value={value}
        placeholder='Enter a task...'
        required
      />

      <button className='form__button'>Add Task</button>
    </form>
  );
};

export default Form;

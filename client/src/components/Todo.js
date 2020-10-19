import React from 'react';
import useEditState from '../hooks/useEditState';
import { TiEdit, TiDelete } from 'react-icons/ti';
import { queryCache, useMutation } from 'react-query';
import axios from 'axios';

import EditTodoForm from './EditTodoForm';

const Todo = ({ todo }) => {
  const [isEdit, toggle] = useEditState(false);
  const [mutateDelete] = useMutation(
    (values) => axios.delete(`http://localhost:7777/api/${todo._id}`),
    {
      onSettled: () => {
        queryCache.refetchQueries('tasks');
      },
    }
  );

  const [mutateToggle] = useMutation(
    (values) => axios.patch(`http://localhost:7777/api/${todo._id}`),
    {
      onSettled: () => {
        queryCache.refetchQueries('tasks');
      },
    }
  );
  return (
    <li className='listItem'>
      {isEdit ? (
        <EditTodoForm toggle={toggle} todo={todo} />
      ) : (
        <div className='round'>
          <input
            type='checkbox'
            id={`checkbox ${todo._id}`}
            checked={todo.completed || ''}
            onChange={() => mutateToggle()}
          />
          <label htmlFor={`checkbox ${todo._id}`}></label>

          <div className='update-delete'>
            <div
              className={`todo__task ${todo.completed ? 'done' : 'notDone'}`}
            >
              {todo.task}
            </div>

            <div className='icon icon-edit' onClick={toggle}>
              <TiEdit />
            </div>

            <div className='icon icon-delete' onClick={() => mutateDelete()}>
              <TiDelete />
            </div>
          </div>
        </div>
      )}
    </li>
  );
};

export default Todo;

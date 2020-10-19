import { useState } from 'react';

const useEditState = (initialState = false) => {
  const [isEdit, setIsEdit] = useState(false);

  const toggle = () => setIsEdit((isedit) => !isedit);

  return [isEdit, toggle];
};

export default useEditState;

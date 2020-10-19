import { useState } from 'react';

const UseInputState = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const onChangeHandler = (e) => setValue(e.target.value);
  const reset = (e) => setValue('');

  return [value, onChangeHandler, reset];
};

export default UseInputState;

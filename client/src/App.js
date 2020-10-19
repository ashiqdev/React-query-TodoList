import React, { Suspense } from 'react';

const TodoApp = React.lazy(() => import('./components/TodoApp'));

function App() {
  return (
    <div className='App'>
      <Suspense fallback={<div>Loading...</div>}>
        <TodoApp />
      </Suspense>
    </div>
  );
}

export default App;

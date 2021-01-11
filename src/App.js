import React from 'react';
import { store } from './Demo/store';
import { Provider } from './miniRedux';
import Counter from './Demo/Counter';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Counter />
      </Provider>
    </div>
  );
}

export default App;

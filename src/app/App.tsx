import React from 'react';

import DragonsListComponent from './containers/dragons-list/dragons-list.component';
import './App.scss';

const App: React.FC = () => {
  return (
    <div className="App">
      <DragonsListComponent/>
    </div>
  );
};

export default App;

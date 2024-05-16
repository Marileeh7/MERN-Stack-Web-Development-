import React from 'react';
import './App.css';
import Tabs from './components/Tab';

function App() {
  const tabs = [
    {
      label: 'Pestaña 1',
      content: 'El contenido de la pestaña 1 se visualiza aquí',
      callback: () => console.log('Tab 1 clicked')
    },
    {
      label: 'Pestaña 2',
      content: 'El contenido de la pestaña 2 se visualiza aquí',
      callback: () => console.log('Tab 2 clicked')
    },
    {
      label: 'Pestaña 3',
      content: 'El contenido de la pestaña 3 se visualiza aquí',
      callback: () => console.log('Tab 3 clicked')
    }
  ];

  return (
    <div className="App bg-light text-right">
      <div className="row justify-content-center">
        <div className="col-4 p-4">
          <Tabs tabs={tabs} />
        </div>
      </div>
    </div>
  );
}

export default App;

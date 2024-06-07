import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Main from './views/Main';
import Details from './views/Detail';
import Update from './views/Update';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/products/:id" element={<Details />} />
          <Route path="/products/:id/edit" element={<Update />} />
        </Routes>
   
    </div>
  );
}
export default App;
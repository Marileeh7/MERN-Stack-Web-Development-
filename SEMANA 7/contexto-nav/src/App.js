// src/App.js
import React, { useState } from 'react';
import './App.css';
import UserContext from './componentes/UserContext';
import Wrapper from './componentes/Wrapper';
import Navbar from './componentes/Navbar';
import FormWrapper from './componentes/FormWrapper';

function App() {
  const [name, setName] = useState('Usuario');

  return (
    <div className="App bg-light">
      <UserContext.Provider value={{ name, setName }}>
        <Wrapper>
          <Navbar />
          <FormWrapper />
        </Wrapper>
      </UserContext.Provider>
    </div>
  );
}

export default App;

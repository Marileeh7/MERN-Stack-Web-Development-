import React, { useState } from 'react';
import RegisterForm from './components/FormComponent';
import FormSubmit from './components/FormSubmitComponent';
import './App.css';

function App() {
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  return (
    <div className="App">
      <RegisterForm inputs={state} setInputs={setState}/>
      <FormSubmit data={state}/>
    </div>
  );
}

export default App;
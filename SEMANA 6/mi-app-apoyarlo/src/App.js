import React from 'react';
import './App.css';
import PersonCardComponent from "./components/PersonCard";

function App() {
  return (
    <div className="App">
      <PersonCardComponent
        lastName="Doe"
        firstName="Jane"
        age={45}
        hairColor={"Black"}
      />
      <PersonCardComponent
        lastName="Smith"
        firstName="John"
        age={88}
        hairColor={"Brown"}
      />
      <PersonCardComponent
        lastName="Fillmore"
        firstName="Millard"
        age={50}
        hairColor={"Brown"}
      />
      <PersonCardComponent
        lastName="Smith"
        firstName="Maria"
        age={62}
        hairColor={"Brown"}
      />
    </div>
  );
}

export default App;

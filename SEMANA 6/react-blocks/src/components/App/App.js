import React from 'react';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Navigation from '../Navigation/Navigation';


const App =()=> {
  return (
    <div className="App">
        <Header />
        <Navigation />
        <Main/>
    </div>
  );
}

export default App;
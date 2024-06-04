import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './views/Main';

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <h1>CRM Application</h1>
                </header>
                <main>
                    <Routes>
                        <Route path="/add" element={<Main />} />
                        <Route path="/" element={<Main />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;

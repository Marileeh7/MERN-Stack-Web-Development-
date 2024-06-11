import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import AddPage from './pages/AddPage';
import EditPage from './pages/EditPages';
import './index.css';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/new" element={<AddPage />} />
                <Route path="/edit/:id" element={<EditPage />} />
            </Routes>
        </Router>
    );
};

export default App;

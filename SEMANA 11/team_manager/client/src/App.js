import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PlayerList from './components/PlayerList';
import AddPlayer from './components/AddPlayer';
import PlayerStatusGame1 from './components/PlayerStatusGame1';
import PlayerStatusGame2 from './components/PlayerStatusGame2';
import PlayerStatusGame3 from './components/PlayerStatusGame3';
import './App.css';

const App = () => {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <Link to="/players/list" className="nav-link">Manage Players</Link>
          <Link to="/players/add" className="nav-link">Add Player</Link>
          <Link to="/status/game1" className="nav-link">Manage Player Status - Game 1</Link>
          <Link to="/status/game2" className="nav-link">Manage Player Status - Game 2</Link>
          <Link to="/status/game3" className="nav-link">Manage Player Status - Game 3</Link>
        </nav>
        <div className="container">
          <Routes>
            <Route path="/players/list" element={<PlayerList />} />
            <Route path="/players/add" element={<AddPlayer />} />
            <Route path="/status/game1" element={<PlayerStatusGame1 />} />
            <Route path="/status/game2" element={<PlayerStatusGame2 />} />
            <Route path="/status/game3" element={<PlayerStatusGame3 />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;

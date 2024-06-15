import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const PlayerStatusGame3 = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/players')
      .then(response => setPlayers(response.data))
      .catch(error => console.error(error));

    const socket = io('http://localhost:8000');
    socket.on('update_player_status_game3', player => {
      setPlayers(prevPlayers => prevPlayers.map(p => p._id === player._id ? player : p));
    });

    return () => socket.disconnect();
  }, []);

  const updateStatus = (playerId, status) => {
    axios.put(`http://localhost:8000/players/${playerId}/status/game3`, { status })
      .then(response => {
        setPlayers(prevPlayers => prevPlayers.map(player =>
          player._id === playerId ? { ...player, statusGame3: status } : player
        ));
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="container">
      <h2>Player Status - Game 3</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Player</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {players.map(player => (
            <tr key={player._id}>
              <td>{player.name}</td>
              <td>
                <button
                  style={{ backgroundColor: player.statusGame3 === 'Playing' ? 'green' : 'white' }}
                  onClick={() => updateStatus(player._id, 'Playing')}
                  className="btn btn-success"
                >
                  Playing
                </button>
                <button
                  style={{ backgroundColor: player.statusGame3 === 'Not Playing' ? 'red' : 'white' }}
                  onClick={() => updateStatus(player._id, 'Not Playing')}
                  className="btn btn-danger"
                >
                  Not Playing
                </button>
                <button
                  style={{ backgroundColor: player.statusGame3 === 'Undecided' ? 'yellow' : 'white' }}
                  onClick={() => updateStatus(player._id, 'Undecided')}
                  className="btn btn-warning"
                >
                  Undecided
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerStatusGame3;


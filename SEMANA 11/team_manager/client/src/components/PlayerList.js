import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';

const PlayerList = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/players')
      .then(response => setPlayers(response.data))
      .catch(error => console.error(error));

    const socket = io('http://localhost:8000');
    socket.on('new_player', player => {
      setPlayers(prevPlayers => [...prevPlayers, player]);
    });

    socket.on('delete_player', id => {
      setPlayers(prevPlayers => prevPlayers.filter(player => player._id !== id));
    });

    return () => socket.disconnect();
  }, []);

  const deletePlayer = (e, id, name) => {
    e.preventDefault();
    if (window.confirm(`Are you sure you want to remove ${name}?`)) {
      axios.delete(`http://localhost:8000/players/${id}`)
        .then(() => {
          setPlayers(prevPlayers => prevPlayers.filter(player => player._id !== id));
        })
        .catch(error => console.error(error));
    }
  };

  return (
    <div className="container">
      <h2>Player List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Team Name</th>
            <th>Preferred Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {players.map(player => (
            <tr key={player._id}>
              <td>{player.name}</td>
              <td>{player.position}</td>
              <td>
                <button onClick={(e) => deletePlayer(e, player._id, player.name)} className="btn btn-danger">DELETE</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/players/add" className="btn btn-primary">Add Player</Link>
    </div>
  );
};

export default PlayerList;

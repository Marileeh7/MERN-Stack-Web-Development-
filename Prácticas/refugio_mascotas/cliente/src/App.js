import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './views/Dashboard';
import AddProject from './views/AddProject';
import ViewProject from './views/ViewProject';
import UpdateProject from './views/UpdateProject';
import Login from './views/Login';
import Register from './views/Register';
import io from 'socket.io-client';
import axios from 'axios';

// Configura Axios para enviar credenciales
axios.defaults.withCredentials = true;

// Asegúrate de que la URL del servidor Socket.IO sea correcta
const socket = io('http://localhost:8000', {
  transports: ['websocket'],
  pingInterval: 25000,
  pingTimeout: 20000,
  withCredentials: true
});

const App = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Configuración de los eventos de Socket.IO
    socket.on('connect', () => {
      console.log('Conectado a Socket.IO');
    });

    socket.on('disconnect', () => {
      console.log('Desconectado de Socket.IO');
    });

    socket.on('new_project', (newProject) => {
      setProjects((prevProjects) => [...prevProjects, newProject]);
    });

    socket.on('update_project', (updatedProject) => {
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project && project._id === updatedProject._id ? updatedProject : project
        )
      );
    });

    socket.on('delete_project', (idProject) => {
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project && project._id !== idProject)
      );
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('new_project');
      socket.off('update_project');
      socket.off('delete_project');
    };
  }, []);

  return (
    <Router>
      <div className="nav">
        <h1 className="site-title">Project Manager</h1>
        <Link to="/projects/new" className="btn btn-primary create-btn">Add a Project</Link>
      </div>
      <Routes>
        <Route path="/" element={<Dashboard projects={projects.filter(project => project !== null)} setProjects={setProjects} />} />
        <Route path="/projects/new" element={<AddProject />} />
        <Route path="/projects/:_id" element={<ViewProject />} />
        <Route path="/projects/update/:_id" element={<UpdateProject />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ProjectInfo from '../components/ProjectInfo';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/api/projects')
      .then(res => {
        const validProjects = res.data.projects.filter(project => project !== null);
        setProjects(validProjects.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)));
      })
      .catch(err => console.log(err));
  }, []);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const handleStart = (id) => {
    axios.put(`http://localhost:8000/api/projects/update/${id}`, { status: 'In Progress' })
      .then(res => {
        setProjects(projects.map(project => project._id === id ? res.data.project : project));
      })
      .catch(err => console.log(err));
  };

  const handleComplete = (id) => {
    axios.put(`http://localhost:8000/api/projects/update/${id}`, { status: 'Completed' })
      .then(res => {
        setProjects(projects.map(project => project._id === id ? res.data.project : project));
      })
      .catch(err => console.log(err));
  };

  const handleRemove = (id) => {
    axios.delete(`http://localhost:8000/api/projects/delete/${id}`)
      .then(() => {
        setProjects(projects.filter(project => project._id !== id));
      })
      .catch(err => console.log(err));
  };

  const filteredProjects = projects.filter(project => project.name.toLowerCase().includes(query.toLowerCase()));

  const backlogProjects = filteredProjects.filter(project => project.status === 'Backlog');
  const inProgressProjects = filteredProjects.filter(project => project.status === 'In Progress');
  const completedProjects = filteredProjects.filter(project => project.status === 'Completed');

  return (
    <div>
      <h2>Project Manager Dashboard</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search project by name..."
          value={query}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      <div className="kanban-board">
        <div className="kanban-column">
          <h3>Backlog</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Due Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {backlogProjects.map((project, index) => (
                <ProjectInfo
                  key={index}
                  project={project}
                  handleStart={handleStart}
                  handleComplete={handleComplete}
                  handleRemove={handleRemove}
                />
              ))}
            </tbody>
          </table>
        </div>
        <div className="kanban-column">
          <h3>In Progress</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Due Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {inProgressProjects.map((project, index) => (
                <ProjectInfo
                  key={index}
                  project={project}
                  handleStart={handleStart}
                  handleComplete={handleComplete}
                  handleRemove={handleRemove}
                />
              ))}
            </tbody>
          </table>
        </div>
        <div className="kanban-column">
          <h3>Completed</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Due Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {completedProjects.map((project, index) => (
                <ProjectInfo
                  key={index}
                  project={project}
                  handleStart={handleStart}
                  handleComplete={handleComplete}
                  handleRemove={handleRemove}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <button className="btn btn-primary" onClick={() => navigate('/projects/new')}>Add New Project</button>
    </div>
  );
};

export default Dashboard;

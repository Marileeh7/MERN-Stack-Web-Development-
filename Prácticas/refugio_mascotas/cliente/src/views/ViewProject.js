import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const ViewProject = () => {
  const { _id } = useParams();
  const [project, setProject] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8000/api/projects/${_id}`)
      .then(res => setProject(res.data.project))
      .catch(err => setError('Error getting project details.'));
  }, [_id]);

  return (
    <div>
      <h2>Project Details: {project.name}</h2>
      <p>Due Date: {new Date(project.dueDate).toLocaleDateString()}</p>
      <p>Status: {project.status}</p>
      <Link to="/" className="btn btn-primary">Back to Dashboard</Link>
      {error && <div className="text-danger">{error}</div>}
    </div>
  );
};

export default ViewProject;

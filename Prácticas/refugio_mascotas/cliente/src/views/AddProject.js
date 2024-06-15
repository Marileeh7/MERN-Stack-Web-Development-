import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProject = () => {
  const [form, setForm] = useState({
    name: '',
    dueDate: ''
  });
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/projects/new', form)
      .then(res => {
        if (res.data.error) {
          setError(res.data.error.errors);
        } else {
          navigate('/');
        }
      })
      .catch(err => {
        if (err.response && err.response.data.error) {
          setError(err.response.data.error);
        } else {
          console.log(err);
        }
      });
  };

  return (
    <div>
      <h2>Add New Project</h2>
      <form onSubmit={onSubmitHandler}>
        <div className="form-group">
          <label htmlFor="name">Project Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={onChangeHandler}
            className="form-control"
          />
          {error.name && <span className="text-danger">{error.name.message}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={onChangeHandler}
            className="form-control"
          />
          {error.dueDate && <span className="text-danger">{error.dueDate.message}</span>}
        </div>
        <button type="submit" className="btn btn-primary">Add Project</button>
        {error['name'] && error['name'].kind === 'unique' && (
          <div className="alert alert-danger" role="alert">
            Ya existe un proyecto con el mismo nombre.
          </div>
        )}
      </form>
    </div>
  );
};

export default AddProject;

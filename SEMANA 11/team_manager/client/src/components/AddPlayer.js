import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddPlayer = () => {
  const [form, setForm] = useState({
    name: '',
    position: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/players', form);
      if (res.data.errors) {
        setErrors(res.data.errors);
      } else {
        setForm({
          name: '',
          position: ''
        });
        setErrors({});
        navigate('/players/list');
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        setErrors(err.response.data.errors);
      } else if (err.response && err.response.data && err.response.data.message) {
        setErrors({ message: err.response.data.message });
      } else {
        setErrors({ message: "Ocurrió un error. Inténtalo de nuevo más tarde." });
      }
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="form-container">
      <h2>Add Player</h2>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          className="form-control"
          onChange={onChangeHandler}
          value={form.name}
          placeholder="Enter player name"
        />
        {errors.name && <span className="text-danger">{errors.name}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="position">Position</label>
        <input
          type="text"
          name="position"
          className="form-control"
          onChange={onChangeHandler}
          value={form.position}
          placeholder="Enter player position"
        />
      </div>
      <button type="submit" className="btn btn-primary" disabled={!form.name || form.name.length < 2}>ADD</button>
      {errors.message && <span className="text-danger">{errors.message}</span>}
    </form>
  );
};

export default AddPlayer;

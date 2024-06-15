import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormProject from '../components/FormProject';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProject = () => {
  const { _id } = useParams();
  const [form, setForm] = useState({
    name: '',
    dueDate: ''
  });

  const [error, setError] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/projects/${_id}`)
      .then(res => setForm(res.data.project))
      .catch(err => console.log(err));
  }, [_id]);

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8000/api/projects/update/${_id}`, form)
      .then(res => {
        if (res.data.error) {
          setError(res.data.error.errors);
        } else {
          navigate('/');
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h2>Update Project</h2>
      <FormProject
        form={form}
        onChangeHandler={onChangeHandler}
        onSubmitHandler={onSubmitHandler}
        error={error}
      />
    </div>
  );
};

export default UpdateProject;

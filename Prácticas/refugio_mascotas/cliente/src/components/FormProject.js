import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ButtonLink = ({ to, children, className }) => (
  <Link to={to} className={`btn ${className}`}>
    {children}
  </Link>
);

const FormProject = ({ onSubmitHandler, onChangeHandler, form, error }) => {
  const [touched, setTouched] = useState({
    name: false,
    dueDate: false
  });

  const handleBlur = (e) => {
    setTouched({
      ...touched,
      [e.target.name]: true
    });
  };

  return (
    <form className="form-container" onSubmit={(e) => { e.preventDefault(); onSubmitHandler(e); }}>
      <div className="form-group">
        <label htmlFor="name">Project Name</label>
        <input
          type="text"
          name="name"
          className="form-control"
          onChange={onChangeHandler}
          onBlur={handleBlur}
          value={form.name}
          placeholder="Enter the project name"
        />
        {(error.name || (touched.name && !form.name)) && (
          <span className="text-danger">{error.name ? error.name.message : 'The name is required.'}</span>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="dueDate">Due Date</label>
        <input
          type="date"
          name="dueDate"
          className="form-control"
          onChange={onChangeHandler}
          onBlur={handleBlur}
          value={form.dueDate}
          placeholder="Enter the due date"
        />
        {(error.dueDate || (touched.dueDate && !form.dueDate)) && (
          <span className="text-danger">{error.dueDate ? error.dueDate.message : 'The due date is required.'}</span>
        )}
      </div>
      <div className="form-group form-btn-container">
        <input type="submit" value="Submit" className="btn btn-primary submit-btn" />
        <ButtonLink to="/" className="btn btn-primary home-btn">All Projects</ButtonLink>
      </div>
    </form>
  );
};

export default FormProject;

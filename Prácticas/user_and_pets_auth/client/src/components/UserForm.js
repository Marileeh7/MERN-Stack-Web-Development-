import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import _ from "lodash";

const UserForm = (props) => {
  const { formType, setUser } = props;

  const [userCredentials, setUserCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessages, setErrorMessages] = useState({});

  const navigate = useNavigate();

  const handleOnChangeUserFields = (e) => {
    let userCredentialsToUpdate = { ...userCredentials };
    userCredentialsToUpdate = {
      ...userCredentialsToUpdate,
      [e.target.name]: e.target.value,
    };
    setUserCredentials(userCredentialsToUpdate);
  };

  const handleOnSubmitRegistration = (e) => {
    e.preventDefault();
    if (formType === "register") {
      registerUser();
    } else {
      loginUser();
    }
  };

  const registerUser = async () => {
    try {
      let res = await axios.post(
        "http://localhost:8000/api/users/register",
        userCredentials,
        { withCredentials: true }
      );

      setUserCredentials({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      loginUser();
    } catch (err) {
      console.log("Error: ", err.response.data);
      updateErrorMessages(err);
    }
  };

  const loginUser = async () => {
    try {
      const { email, password } = userCredentials;
      let res = await axios.post(
        "http://localhost:8000/api/users/login",
        { email, password },
        { withCredentials: true }
      );
      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/");
    } catch (err) {
      console.log("Error: ", err.response.data);
      updateErrorMessages(err);
    }
  };

  const updateErrorMessages = (err) => {
    let errorMessagesToUpdate = {};
    if (formType === "register") {
      let errors = err.response.data.errors?.errors;
      errorMessagesToUpdate = _.mapValues(errors, (error) => error.message);
    } else {
      errorMessagesToUpdate = { login: "Invalid Login. Please try again." };
    }
    setErrorMessages(errorMessagesToUpdate);
  };

  return (
    <div className="py-3">
      <h3 className="text-center">
        {formType === "register" ? <span>Register</span> : <span>Login</span>}
      </h3>
      <form onSubmit={handleOnSubmitRegistration} className="my-3">
        {formType === "register" && (
          <div className="mb-2 row text-end">
            <label htmlFor="name" className="col-sm-3 col-form-label">
              Name:
            </label>
            <div className="col-sm-7">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="John Doe"
                onChange={handleOnChangeUserFields}
                value={userCredentials?.name}
                className="form-control"
              />
              <div className="text-danger small text-start">
                {errorMessages?.name}
              </div>
            </div>
          </div>
        )}
        <div className="mb-2 row text-end">
          <label htmlFor="email" className="col-sm-3 col-form-label">
            Email:
          </label>
          <div className="col-sm-7">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="john.doe@example.com"
              onChange={handleOnChangeUserFields}
              value={userCredentials?.email}
              className="form-control"
            />
            <div className="text-danger small text-start">
              {errorMessages?.email}
            </div>
          </div>
        </div>
        <div className="mb-2 row text-end">
          <label htmlFor="password" className="col-sm-3 col-form-label">
            Password:
          </label>
          <div className="col-sm-7">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="********"
              onChange={handleOnChangeUserFields}
              value={userCredentials?.password}
              className="form-control"
            />
            <div className="text-danger small text-start">
              {errorMessages?.password}
            </div>
            <div className="text-danger small text-start">
              {errorMessages?.login}
            </div>
          </div>
        </div>
        {formType === "register" && (
          <div className="mb-2 row text-end">
            <label htmlFor="confirmPassword" className="col-sm-3 col-form-label">
              Confirm Password:
            </label>
            <div className="col-sm-7">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="********"
                onChange={handleOnChangeUserFields}
                value={userCredentials?.confirmPassword}
                className="form-control"
              />
              <div className="text-danger small text-start">
                {errorMessages?.confirmPassword}
              </div>
            </div>
          </div>
        )}
        <div className="text-center">
          <button type="submit" className="mt-2 px-4 btn btn-sm btn-primary">
            {formType === "register" ? <span>Register</span> : <span>Login</span>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;

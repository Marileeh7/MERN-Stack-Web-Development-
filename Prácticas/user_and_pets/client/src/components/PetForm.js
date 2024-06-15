import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import _ from "lodash";

const PetForm = ({ formType }) => {
  const [pet, setPet] = useState({
    name: "",
    type: "",
    owner: "",
  });
  const [usersList, setUsersList] = useState([]);
  const [errorMessages, setErrorMessages] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { petId } = useParams();

  const onChangePetDetailsHandler = (e) => {
    setPet({ ...pet, [e.target.name]: e.target.value });
  };

  const onSubmitPetDetailsHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (formType === "create") {
        await createPet(pet);
      } else if (formType === "update") {
        await updatePet(pet);
      }
      navigate("/");
    } catch (err) {
      console.error("Error submitting pet details:", err);
      updateErrorMessages(err);
    } finally {
      setLoading(false);
    }
  };

  const createPet = async (newPet) => {
    try {
      await axios.post("http://localhost:8000/api/pets", newPet);
    } catch (err) {
      console.error("Error creating pet:", err);
      updateErrorMessages(err);
      throw err;
    }
  };

  const updatePet = async (updatedPet) => {
    try {
      await axios.put(`http://localhost:8000/api/pets/${petId}`, updatedPet);
    } catch (err) {
      console.error("Error updating pet:", err);
      updateErrorMessages(err);
      throw err;
    }
  };

  const updateErrorMessages = (err) => {
    const errors = err.response?.data?.errors || {};
    const errorMessagesToUpdate = _.mapValues(errors, (error) => error.message);
    if (err.response?.data?.message?.includes("UUID")) {
      errorMessagesToUpdate.owner = "Please select an owner";
    }
    setErrorMessages(errorMessagesToUpdate);
  };

  const getOnePetById = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/pets/${petId}`);
      setPet({
        name: res.data.name,
        type: res.data.type,
        owner: res.data.owner._id,
      });
    } catch (err) {
      console.error("Error fetching pet:", err);
    }
  }, [petId]);

  const getAllUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/users");
      setUsersList(_.orderBy(res.data, ["last_name"], ["asc"]));
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    if (formType === "update") {
      getOnePetById();
    }
    getAllUsers();
  }, [formType, getOnePetById]);

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="mt-3 w-50 bg-light py-3">
      <form onSubmit={onSubmitPetDetailsHandler}>
        <div className="row mb-3">
          <label htmlFor="name" className="col-2 col-form-label text-left">
            Name:
          </label>
          <div className="col-5">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={pet.name}
              onChange={onChangePetDetailsHandler}
            />
            {errorMessages.name && (
              <div className="text-danger small">{errorMessages.name}</div>
            )}
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="type" className="col-2 col-form-label text-left">
            Type:
          </label>
          <div className="col-5">
            <input
              type="text"
              className="form-control"
              id="type"
              name="type"
              value={pet.type}
              onChange={onChangePetDetailsHandler}
            />
            {errorMessages.type && (
              <div className="text-danger small">{errorMessages.type}</div>
            )}
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="owner" className="col-2 col-form-label text-left">
            Owner:
          </label>
          <div className="col-5">
            <select
              className="form-select"
              id="owner"
              name="owner"
              value={pet.owner}
              onChange={onChangePetDetailsHandler}
            >
              <option value="">Select an owner</option>
              {usersList.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.first_name} {item.last_name}
                </option>
              ))}
            </select>
            {errorMessages.owner && (
              <div className="text-danger small">{errorMessages.owner}</div>
            )}
          </div>
        </div>

        <button className="btn btn-success" type="submit" disabled={loading}>
          {formType === "create" ? "Add" : "Edit"}
        </button>
      </form>
    </div>
  );
};

export default PetForm;

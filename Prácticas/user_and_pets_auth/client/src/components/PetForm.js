import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";
import _ from "lodash";
import DeleteButton from "./DeleteButton";

const PetForm = (props) => {
  // --------------------------------------------------
  // I) HOOKS AND VARIABLES
  // --------------------------------------------------

  // Variables
  const { formType, user } = props;

  // State Hooks
  const [pet, setPet] = useState({
    name: "",
    type: "",
    owner: user._id,
  });

  const [errorMessages, setErrorMessages] = useState();

  // Params and Navigate Hooks
  const navigate = useNavigate();
  const { petId } = useParams();

  // Effect Hooks
  useEffect(() => {
    if (formType === "update") {
      getOnePetById();
    }
  }, []);

  // --------------------------------------------------
  // II) HANDLERS AND AUXILIAR FUNCTIONS
  // --------------------------------------------------

  // i) Handlers

  const onChangePetDetailsHandler = (e) => {
    let petToUpdate = { ...pet };
    petToUpdate[e.target.name] = e.target.value;
    setPet(petToUpdate);

    // Above same as:
    // setPet({ ...pet, [e.target.name]: e.target.value });
  }; // setState is asynchronous, so we can't console.log(pet) right after setPet(petToUpdate)

  const onSubmitPetDetailsHandler = (e) => {
    e.preventDefault();
    if (formType === "update") {
      // Update Form
      updatePet();
    } else {
      // Create Form
      createPet();
    }
  };

  // ii) API Calls

  const getOnePetById = async () => {
    try {
      let res = await axios.get(`http://localhost:8000/api/pets/${petId}`, {
        withCredentials: true,
      });
      let petToUpdate = {
        name: res.data.name,
        type: res.data.type,
        owner: res.data.owner._id,
      };
      setPet(petToUpdate);
    } catch (err) {
      console.log(err);
    }
  };

  const createPet = async () => {
    try {
      let res = await axios.post("http://localhost:8000/api/pets", pet, {
        withCredentials: true,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
      // extract error messages from err.response.data
      updateErrorMessages(err);
    }
  };

  const updatePet = async () => {
    try {
      let res = await axios.put(
        `http://localhost:8000/api/pets/${petId}`,
        pet,
        { withCredentials: true }
      );
      navigate("/");
    } catch (err) {
      console.log(err);
      // extract error messages from err.response.data
      updateErrorMessages(err);
    }
  };

  // iii) Aux Functions
  const updateErrorMessages = (err) => {
    let errors = err.response.data.errors?.errors;
    let errorMessagesToUpdate = _.mapValues(errors, (error) => error.message);
    if (errorMessagesToUpdate.owner > "0") {
      errorMessagesToUpdate.owner = "Please select an owner";
    }
    setErrorMessages(errorMessagesToUpdate);
  };

  // --------------------------------------------------
  // III) JSX
  // --------------------------------------------------
  return (
    <div className="mt-3 w-50 bg-light p-3 border border-1">
      <form onSubmit={onSubmitPetDetailsHandler}>
        {/* Name Field */}
        <div className="row mb-3">
          <label htmlFor="name" className="col-sm-2 col-form-label text-left">
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
            <div className="text-danger small">{errorMessages?.name}</div>
          </div>
        </div>

        {/* Type Field */}
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
            <div className="text-danger small">{errorMessages?.type}</div>
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-success">
          {formType != "update" ? "Add" : "Edit"}
        </button>
        {formType == "update" && (
          <DeleteButton petId={petId} changeStyle={true} />
        )}
      </form>
    </div>
  );
};

export default PetForm;

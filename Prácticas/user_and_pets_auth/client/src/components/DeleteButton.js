import React from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import _ from "lodash";

const DeleteButton = (props) => {


  const { pet, removePetFromList, petId, changeStyle } = props;
 
  // Nagivate Hook
  const navigate = useNavigate();


  // Handlers
  const handleOnClickDeleteButton = async (e) => {
    if (pet) {
      // Coming from CreatePage
      deletePetById(pet._id); // Delete From Database (API Call to backend)
      removePetFromList(pet._id); // Delete From List State (Update in Frontend)
    } else {
      // Coming from UpdatePage
      await deletePetById(petId);
      navigate("/");
    }
  };

  // API Calls
  const deletePetById = async (petId) => {
    try {
      let res = await axios.delete("http://localhost:8000/api/pets/" + petId, {
        withCredentials: true,
      });
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <button
        className={`mx-${changeStyle ? "2" : "1"}
          btn btn-outline-danger ${changeStyle ? "" : "btn-sm py-0"}
        `}
        onClick={handleOnClickDeleteButton}
      >
        Delete
      </button>
    </>
  );
};

export default DeleteButton;

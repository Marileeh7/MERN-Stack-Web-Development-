import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import axios from "axios";

const DetailsPage = () => {
  // ---------------------------------------------
  // I) VARIABLES & HOOKS
  // ---------------------------------------------

  // State Hooks
  const [pet, setPet] = useState();

  // Param Hooks
  const { petId } = useParams();

  // Effect Hooks
  useEffect(() => {
    getOnePetById();
  }, []);

  // ---------------------------------------------
  // II) HANDLERS & AUX FUNCTIONS
  // ---------------------------------------------

  const getOnePetById = async () => {
    try {
      let res = await axios.get("http://localhost:8000/api/pets/" + petId,{
        withCredentials: true,
      });
      setPet(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ---------------------------------------------
  // III) JSX
  // ---------------------------------------------
  return (
    <div>
      <h1 className="text-decoration-underline mb-3">Super Pets Website</h1>
      <h3>{pet?.name}</h3>
      <ul>
        <li>
          <strong>Type: </strong> {pet?.type}
        </li>
        <li>
          <strong>Owner: </strong>
          <ul>
            <li>
              <strong>Name: </strong>
              {pet?.owner?.name}
            </li>
            <li>
              <strong>Email: </strong>
              {pet?.owner?.email}
            </li>

          </ul>
        </li>
      </ul>
      <hr />
      <div className="mt-2">
        <Link to={"/"}>Back to Home</Link>
      </div>
    </div>
  );
};

export default DetailsPage;

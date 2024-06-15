import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import DeleteButton from "./DeleteButton";

import axios from "axios";
import _ from "lodash";

const PetTable = (props) => {
  // ---------------------------------------------
  // I) VARIABLES & HOOKS
  // ---------------------------------------------

  // Destructuring Props
  const { user } = props;


  // State Hooks
  const [petsList, setPetsList] = useState();

  // Effect Hooks
  useEffect(() => {
    getAllPets();
  }, []);

  // ---------------------------------------------
  // II) HANDLERS & AUX FUNCTIONS
  // ---------------------------------------------

  const getAllPets = async () => {
    try {
      let res = await axios.get("http://localhost:8000/api/pets", {
        withCredentials: true,
      });
      setPetsList(_.orderBy(res.data, ["name"], ["asc"]));
    } catch (err) {
      console.log(err);
    }
  };

  const removePetFromList = (petId) => {
    // Remove pet from petsList
    setPetsList(petsList.filter((pet) => pet._id !== petId));
  };

  // ---------------------------------------------
  // III) JSX
  // ---------------------------------------------

  return (
    <div className="w-75 mt-4">
      <table className="table table-striped">
        <thead className="table-secondary">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Type</th>
            <th scope="col">Owner</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {petsList &&
            petsList.map((item, idx) => (
              <tr key={idx}>
                <th scope="row">{idx + 1}</th>
                <td>{item.name}</td>
                <td>{item.type}</td>
                <td>{item.owner?.name} </td>
                <td>
                  <Link
                    className="btn btn-link btn-sm py-0"
                    to={`pets/${item._id}`}
                  >
                    Details
                  </Link>
                  {user?._id === item.owner?._id && (
                    <>
                      |
                      <Link
                        className="mx-1 btn btn-outline-success btn-sm py-0"
                        to={`pets/${item._id}/edit`}
                      >
                        Edit
                      </Link>
                      |
                      <DeleteButton
                        pet={item}
                        removePetFromList={removePetFromList}
                      />
                    </>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default PetTable;

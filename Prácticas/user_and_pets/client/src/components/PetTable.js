import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DeleteButton from "./DeleteButton";
import axios from "axios";
import _ from "lodash";

const PetList = ({ usersList, setUsersList }) => {
  // State Hooks
  const [petsList, setPetsList] = useState([]);

  // Effect Hooks
  useEffect(() => {
    getAllPets();
  }, []);

  // Fetch all pets
  const getAllPets = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/pets");
      setPetsList(_.orderBy(res.data, ["name"], ["asc"]));
    } catch (err) {
      console.error("Error fetching pets:", err);
    }
  };

  // Remove pet from lists
  const removePetFromLists = (petId) => {
    // Remove pet from petsList
    setPetsList(petsList.filter((pet) => pet._id !== petId));

    // Remove pet from user in usersList
    const updatedUsersList = usersList.map((user) => ({
      ...user,
      pets: user.pets.filter((pet) => pet._id !== petId),
    }));
    setUsersList(updatedUsersList);
  };

  return (
    <div className="w-75 mt-4">
      <table className="table table-striped">
        <thead className="table-secondary">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Type</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {petsList.map((item, idx) => (
            <tr key={item._id}>
              <th scope="row">{idx + 1}</th>
              <td>{item.name}</td>
              <td>{item.type}</td>
              <td>
                <Link
                  className="mx-1 btn btn-link btn-sm py-0"
                  to={`pets/${item._id}`}
                >
                  Details
                </Link>
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
                  changeStyle={false}
                  removePetFromLists={removePetFromLists}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PetList;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserTable from "../components/UserTable";
import PetTable from "../components/PetTable";

const HomePage = () => {
  const [usersList, setUsersList] = useState([]);  // Inicializar como array vacío

  return (
    <div>
      <h1 className="text-decoration-underline mb-3">Super Pets Website</h1>
      <div className="d-flex align-items-center">
        <span>Add New Pet:</span>
        <Link className="mx-2 btn btn-success btn-md py-0" to={"/pets/new"}>
          New
        </Link>
      </div>
      <hr />
      <h3 className="text-decoration-underline">Current Users</h3>
      <UserTable usersList={usersList} setUsersList={setUsersList} />
      <h3 className="text-decoration-underline">List of Pets</h3>
      <PetTable usersList={usersList} />
    </div>
  );
};

export default HomePage;

import React from 'react'
import { Link } from "react-router-dom";

import PetForm from "../components/PetForm";

const UpdatePage = () => {

  // --------------------------------------------------
  // I) HOOKS AND VARIABLES
  // --------------------------------------------------

  // --------------------------------------------------
  // II) HANDLERS AND AUXILIAR FUNCTIONS
  // --------------------------------------------------

  // --------------------------------------------------
  // III) JSX
  // --------------------------------------------------
  return (
    <div>
      <h1 className="text-decoration-underline mb-3">Super Pets Website</h1>
      <h4> Update pet </h4>
      <PetForm formType={"update"} />
      <hr/>
      <div className="mt-2">
        <Link to={"/"}>Back to Home</Link>
      </div>
    </div>
  )
}

export default UpdatePage

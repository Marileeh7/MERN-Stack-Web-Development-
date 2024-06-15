import React from 'react'
import { Link } from 'react-router-dom'

import PetForm from '../components/PetForm'

const UpdatePage = (props) => {


  // Destructuring Props
  const { user } = props;

  return (
    <div>

      <h4> Update pet </h4>
      <PetForm formType={"update"} user={user}/>
      <hr/>
      <div className="mt-2">
        <Link to={"/"}>Back to Home</Link>
      </div>
    </div>
  )
}

export default UpdatePage;

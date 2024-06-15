import React from 'react'
import { Link } from 'react-router-dom'
import PetForm from '../components/PetForm'

const CreatePage = (props) => {

  const { user } = props;

 
  return (
    <div>

      <h4> Add a new pet </h4>
      <PetForm formType={"create"} user={user}/>
      <hr/>
      <div className="mt-2">
        <Link to={"/"}>Back to Home</Link>
      </div>
    </div>
  )
}

export default CreatePage;

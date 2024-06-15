import React, {useState} from 'react'
import { Link } from 'react-router-dom'

import PetTable from '../components/PetTable'

const HomePage = (props) => {

  // ---------------------------------------------
  // I) VARIABLES & HOOKS
  // ---------------------------------------------
  // Destrcuturing Props
  const { user } = props;
  // State Hooks
  const [usersList, setUsersList] = useState();


  // ---------------------------------------------
  // II) HANDLERS & AUX FUNCTIONS
  // ---------------------------------------------

  // ---------------------------------------------
  // III) JSX
  // ---------------------------------------------
  return (
    <div>
      <h3 className="mb-3">Welcome {user.name}!!!</h3>
      <div className="d-flex align-items-center">
        <span> Add new Pet:</span>
        <Link to="/pets/new" className="mx-2 btn btn-success btn-md py-0"> Add Pet</Link>
      </div>
      <hr/>
      <h3 className = "text-decoration-underline"> List of Pets</h3>
      <PetTable usersList={usersList} setUsersList={setUsersList} user={user}/>
    </div>
  )
}

export default HomePage

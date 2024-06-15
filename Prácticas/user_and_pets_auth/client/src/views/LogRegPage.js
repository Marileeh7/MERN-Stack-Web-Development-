import React from 'react'
import UserForm from '../components/UserForm'

const LogRegPage = (props) => {

  // --------------------------------------------------
  // I) HOOKS AND VARIABLES
  // --------------------------------------------------

  // i) Lifting States
  const { setUser } = props

  // --------------------------------------------------
  // II) JSX
  // --------------------------------------------------
  return (
    <div className="container mt-5">
      <hr/>
      <div className = "row">
        <div className = "col">
          <UserForm formType={"register"} setUser={setUser} />
        </div>
        <div className = "col">
          <UserForm formType={"login"} setUser={setUser} />
        </div>
      </div>
      <hr/>
    </div>
  )
}

export default LogRegPage

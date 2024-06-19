import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import LogRegPage from "./views/LogRegPage";
import HomePage from "./views/HomePage";
import DetailsPage from "./views/DetailsPage";
import CreatePage from "./views/CreatePage";
import UpdatePage from "./views/UpdatePage";
import NavBar from "./components/NavBar";


const ProtectedRoute = (props) => {
  
  const { user, redirectPath = "/login", children } = props;


  return <>{!user ? <Navigate to={redirectPath} replace /> : children}</>;
};

const PublicRoute = (props) => {
 

  // Variables
  const { user, redirectPath = "/", children } = props;

  
  return <>{user ? <Navigate to={redirectPath} replace /> : children}</>;
};


const App = () => {
  

  // Variables
  const userDetails = JSON.parse(localStorage.getItem("user"));
  const userInfo = userDetails ? userDetails : null;
  
  // State Hooks
  const [user, setUser] = useState(userInfo);

  return (
    <div className="App">
      <NavBar setUser={setUser} />
      <div className="p-3 container">
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute user={user}>
                <LogRegPage setUser={setUser} />
              </PublicRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute user={user}>
                <HomePage user={user}/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/pets/new"
            element={
              <ProtectedRoute user={user}>
                <CreatePage user={user}/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/pets/:petId"
            element={
              <ProtectedRoute user={user}>
                <DetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pets/:petId/edit"
            element={
              <ProtectedRoute user={user}>
                <UpdatePage user={user}/>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;

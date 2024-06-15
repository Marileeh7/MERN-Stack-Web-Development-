import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./views/HomePage";
import DetailsPage from "./views/DetailsPage";
import CreatePage from "./views/CreatePage";
import UpdatePage from "./views/UpdatePage";

function App() {
  return (
    <div className="App p-3 container">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pets/new" element={<CreatePage />} />
        <Route path="/pets/:petId" element={<DetailsPage />} />
        <Route path="/pets/:petId/edit" element={<UpdatePage />} />
      </Routes>
    </div>
  );
}

export default App;

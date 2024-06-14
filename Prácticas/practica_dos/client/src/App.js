import './App.css';
import PiratesView from './view/PiratesView/Pirates.view';
import PirateDetailView from './view/PirateDetailView/PirateDetail.view';
import PirateCreateView from './view/PirateCreateView/PirateCreate.view';
import HomeView from './view/HomeView/Home.view';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useState } from 'react';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute.component';

function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route index={true} path="/" element={<HomeView setUser={setUser} />} />
        <Route path="/pirates/" element={user ? <PiratesView /> : <Navigate to="/" />} />
        <Route path="/pirate/new/" element={<ProtectedRoute user={user} redirected={"/"}> <PirateCreateView /> </ProtectedRoute>} />
        <Route path="/pirate/:id" element={<ProtectedRoute user={user} redirected={"/"}> <PirateDetailView /> </ProtectedRoute>} />
        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

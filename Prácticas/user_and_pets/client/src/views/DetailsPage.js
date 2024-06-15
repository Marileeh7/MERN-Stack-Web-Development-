import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const DetailsPage = () => {

  const [pet, setPet] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Params Hooks
  const { petId } = useParams();

 

  const getOnePetById = useCallback(async () => {
    try {
      let res = await axios.get(`http://localhost:8000/api/pets/${petId}`);
      setPet(res.data);
    } catch (err) {
      setError("Error al cargar la información de la mascota.");
    } finally {
      setLoading(false);
    }
  }, [petId]);


  useEffect(() => {
    getOnePetById();
  }, [getOnePetById]);


  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1 className="text-decoration-underline mb-3">Super Pets Website</h1>
      <h3>{pet.name}</h3>
      <ul>
        <li>
          <strong>Type: </strong> {pet.type}
        </li>
        <li>
          <strong>Owner:</strong>
          <ul>
            <li>
              <strong>Name:</strong> {pet.owner?.first_name} {pet.owner?.last_name}
            </li>
            <li>
              <strong>Age:</strong> {pet.owner?.age}
            </li>
            <li>
              <strong>Interests:</strong> {pet.owner?.interests?.join(", ")}
            </li>
          </ul>
        </li>
      </ul>
      <hr/>
      <div className="mt-2">
        <Link to="/">Back to Home</Link>
      </div>
    </div>
  );
};

export default DetailsPage;

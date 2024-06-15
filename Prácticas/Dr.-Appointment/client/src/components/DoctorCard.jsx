
import React, { useState } from "react";
import BookAppointment from "../components/BookAppointment";
import { toast } from "react-hot-toast";
import axios from "../utils/api"; // Importa la instancia configurada de Axios

const DoctorCard = ({ ele }) => {
  // Estado para manejar la apertura del modal de cita
  const [modalOpen, setModalOpen] = useState(false);
  // Estado para almacenar el token del usuario
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // Función para manejar la apertura del modal
  const handleModal = () => {
    if (token === "") {
      return toast.error('You must log in first'); // Muestra un mensaje de error si el usuario no está logueado
    }
    setModalOpen(true); // Abre el modal si el usuario está logueado
  };

  return (
    <div className={`card`}>
      {/* Sección eliminada de la imagen */}
      <h3 className="card-name">
        Dr. {ele?.userId?.firstname + " " + ele?.userId?.lastname}
      </h3>
      <p className="specialization">
        <strong>Specialization: </strong>
        {ele?.specialization}
      </p>
      <p className="experience">
        <strong>Experience: </strong>
        {ele?.experience}yrs
      </p>
      <p className="fees">
        <strong>Fees per consultation: </strong>$ {ele?.fees}
      </p>
      <p className="phone">
        <strong>Phone: </strong>
        {ele?.userId?.mobile}
      </p>
      <button
        className="btn appointment-btn"
        onClick={handleModal}
      >
        Book Appointment
      </button>
      {modalOpen && (
        <BookAppointment
          setModalOpen={setModalOpen}
          ele={ele}
        />
      )}
    </div>
  );
};

export default DoctorCard; // Exporta el componente DoctorCard como el valor por defecto de este módulo

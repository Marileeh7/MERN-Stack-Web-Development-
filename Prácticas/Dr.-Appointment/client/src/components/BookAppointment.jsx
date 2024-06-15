import React, { useState } from "react";
import axios from "../utils/api"; // Importa la instancia configurada de Axios
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";

const BookAppointment = ({ setModalOpen, ele }) => {
  // Estado para manejar los detalles del formulario de cita
  const [formDetails, setFormDetails] = useState({
    date: "",
    time: "",
  });

  // Función para manejar los cambios en los campos del formulario
  const inputChange = (e) => {
    const { name, value } = e.target;
    return setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  // Función para manejar la reserva de cita
  const bookAppointment = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    try {
      // Realizar una solicitud POST para reservar una cita
      const { data } = await toast.promise(
        axios.post(
          "/appointment/bookappointment",
          {
            doctorId: ele?.userId?._id,
            date: formDetails.date,
            time: formDetails.time,
            doctorname: `${ele?.userId?.firstname} ${ele?.userId?.lastname}`,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          success: "Appointment booked successfully",
          error: "Unable to book appointment",
          loading: "Booking appointment...",
        }
      );
      setModalOpen(false); // Cerrar el modal al reservar con éxito
    } catch (error) {
      console.error("Error booking appointment", error);
      return error;
    }
  };

  return (
    <>
      <div className="modal flex-center">
        <div className="modal__content">
          <h2 className="page-heading">Book Appointment</h2>
          <IoMdClose
            onClick={() => {
              setModalOpen(false);
            }}
            className="close-btn"
          />
          <div className="register-container flex-center book">
            <form className="register-form">
              <input
                type="date"
                name="date"
                className="form-input"
                value={formDetails.date}
                onChange={inputChange}
              />
              <input
                type="time"
                name="time"
                className="form-input"
                value={formDetails.time}
                onChange={inputChange}
              />
              <button
                type="submit"
                className="btn form-btn"
                onClick={bookAppointment}
              >
                Book
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookAppointment; // Exporta el componente BookAppointment como el valor por defecto de este módulo

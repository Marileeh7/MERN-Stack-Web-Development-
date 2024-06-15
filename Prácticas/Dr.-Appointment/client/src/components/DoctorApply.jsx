import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "../utils/api"; // Importa la instancia configurada de Axios

// Configura la URL base para axios usando una variable de entorno
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

function DoctorApply() {
  // Estado para almacenar los detalles del formulario
  const [formDetails, setFormDetails] = useState({
    specialization: "",
    experience: "",
    fees: "",
    timing: "Timing",
  });

  // Función para manejar cambios en los campos del formulario
  const inputChange = (e) => {
    const { name, value } = e.target;
    return setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  // Función para manejar el envío del formulario
  const formSubmit = async (e) => {
    try {
      e.preventDefault();
      const { specialization, experience, fees, timing } = formDetails;

      // Validación simple para asegurarse de que todos los campos estén llenos
      if (!specialization || !experience || !fees || !timing) {
        return toast.error("Input field should not be empty");
      }

      // Realiza una solicitud POST a la API para enviar la aplicación
      const { data } = await toast.promise(
        axios.post(
          "/doctor/applyfordoctor",
          {
            specialization,
            experience,
            fees,
            timing,
          },
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            }
          }
        ),
        {
          pending: "Submitting application...",
          success: "Thank You for submitting the application.",
          error: "Unable to submit application",
          loading: "Submitting application...",
        }
      );
    } catch (error) {
      return error;
    }
  };

  return (
    <section className="apply-doctor-section flex-center">
      <div className="apply-doctor-container flex-center">
        <h2 className="form-heading">Apply For Doctor</h2>
        <form onSubmit={formSubmit} className="register-form">
          {/* Campo de entrada para la especialización */}
          <input
            type="text"
            name="specialization"
            className="form-input"
            placeholder="Enter your specialization"
            value={formDetails.specialization}
            onChange={inputChange}
          />
          {/* Campo de entrada para la experiencia */}
          <input
            type="text"
            name="experience"
            className="form-input"
            placeholder="Enter your experience in years"
            value={formDetails.experience}
            onChange={inputChange}
          />
          {/* Campo de entrada para las tarifas */}
          <input
            type="text"
            name="fees"
            className="form-input"
            placeholder="Enter your fees per consultation in rupees"
            value={formDetails.fees}
            onChange={inputChange}
            defaultChecked="Timings"
          />
          {/* Selección de horario */}
          <select
            name="timing"
            value={formDetails.timing}
            className="form-input"
            id="timing"
            onChange={inputChange}
          >
            <option disabled>Timings</option>
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
            <option value="night">Night</option>
          </select>
          {/* Botón de envío del formulario */}
          <button type="submit" className="btn form-btn">
            Apply
          </button>
        </form>
      </div>
    </section>
  );
}

export default DoctorApply;

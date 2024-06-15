import React, { useState } from "react";

const Contact = () => {
  // Estado para manejar los detalles del formulario de contacto
  const [formDetails, setFormDetails] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Función para manejar los cambios en los campos del formulario
  const inputChange = (e) => {
    const { name, value } = e.target;
    return setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  return (
    <section className="register-section flex-center" id="contact">
      <div className="contact-container flex-center contact">
        <h2 className="form-heading">Contact Us</h2>
        <form
          method="POST"
          action="https://formspree.io/f/xkneldwn"
          className="register-form"
        >
          {/* Campo de entrada para el nombre */}
          <input
            type="text"
            name="name"
            className="form-input"
            placeholder="Enter your name"
            value={formDetails.name}
            onChange={inputChange}
          />
          {/* Campo de entrada para el correo electrónico */}
          <input
            type="email"
            name="email"
            className="form-input"
            placeholder="Enter your email"
            value={formDetails.email}
            onChange={inputChange}
          />
          {/* Campo de texto para el mensaje */}
          <textarea
            type="text"
            name="message"
            className="form-input"
            placeholder="Enter your message"
            value={formDetails.message}
            onChange={inputChange}
            rows="8"
            cols="12"
          ></textarea>
          {/* Botón para enviar el formulario */}
          <button type="submit" className="btn form-btn">
            Send
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact; // Exporta el componente Contact como el valor por defecto de este módulo

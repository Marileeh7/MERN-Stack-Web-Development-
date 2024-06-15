import React from "react"; // Importa la biblioteca React

const AboutUs = () => {
  return (
    <>
      <section className="container">
        <h2 className="page-heading about-heading">About Us</h2>
        <div className="about">
          <div className="hero-img">
            {/* Renderiza la imagen importada */}
          </div>
          <div className="hero-content">
            {/* Contenido de texto sobre nosotros */}
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Quibusdam tenetur doloremque molestias repellat minus asperiores
              in aperiam dolor, quaerat praesentium. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Voluptatibus, repudiandae! Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Provident
              quibusdam doloremque ex? Officia atque ab dolore? Tempore totam
              non ea!
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs; // Exporta el componente AboutUs como el valor por defecto de este módulo

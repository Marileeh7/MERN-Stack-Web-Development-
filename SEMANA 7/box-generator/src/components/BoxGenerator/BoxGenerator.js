import React, { useState } from 'react';
import './BoxGenerator.css'; // Asegúrate de importar el CSS

const BoxGenerator = () => {
  const [color, setColor] = useState('');
  const [boxes, setBoxes] = useState([]);

  const handleInputChange = (e) => {
    setColor(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const rgbPattern = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/;
    if (rgbPattern.test(color) && boxes.length < 25) {
      setBoxes([...boxes, color]);
      setColor('');
    } else {
      alert("Please enter a valid RGB color or you've reached the limit of 25 colors.");
    }
  };

  return (
    <div className="box-generator">
    <form onSubmit={handleSubmit} className="form-container">
       <input
         type="text"
         value={color}
         onChange={handleInputChange}
          placeholder="Enter RGB color, e.g., rgb(255, 100, 100)"
         className="form-input" // Actualizado a 'form-input'
        />
        <button type="submit" className="form-button">Add</button>
      </form>

      <div className="boxes-container">
        {boxes.map((box, index) => (
          <div key={index} style={{ backgroundColor: box }} className="box"></div>
        ))}
      </div>
    </div>
  );
};

export default BoxGenerator;


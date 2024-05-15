import React, { useState } from 'react';
import './BoxGenerator.css';  // Asegúrate de que el CSS está importado

const BoxGenerator = () => {
  const [red, setRed] = useState('');
  const [green, setGreen] = useState('');
  const [blue, setBlue] = useState('');
  const [size, setSize] = useState('');
  const [boxes, setBoxes] = useState([]);

  const handleRGBChange = (e, setColor) => {
    setColor(e.target.value);
  };

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const sizeValid = /^\d+$/;
    const colorValid = num => num >= 0 && num <= 255 && /^\d+$/.test(num);
    if (colorValid(red) && colorValid(green) && colorValid(blue) && sizeValid.test(size) && boxes.length < 25) {
      setBoxes([...boxes, { color: `rgb(${red}, ${green}, ${blue})`, size: parseInt(size) }]);
      setRed('');
      setGreen('');
      setBlue('');
      setSize('');
    } else {
      alert("Please enter valid RGB values (0-255) for each color and a valid size as an integer.");
    }
  };

  return (
    <div className="box-generator">
      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="text"
          value={red}
          onChange={(e) => handleRGBChange(e, setRed)}
          placeholder="Red (0-255)"
          className="form-input"
        />
        <input
          type="text"
          value={green}
          onChange={(e) => handleRGBChange(e, setGreen)}
          placeholder="Green (0-255)"
          className="form-input"
        />
        <input
          type="text"
          value={blue}
          onChange={(e) => handleRGBChange(e, setBlue)}
          placeholder="Blue (0-255)"
          className="form-input"
        />
        <input
          type="text"
          value={size}
          onChange={handleSizeChange}
          placeholder="Size in pixels"
          className="form-input"
        />
        <button type="submit" className="form-button">Add Box</button>
      </form>
      <div className="boxes-container">
        {boxes.map((box, index) => (
          <div key={index} style={{ backgroundColor: box.color, width: `${box.size}px`, height: `${box.size}px`, display: 'inline-block', margin: '5px' }}></div>
        ))}
      </div>
    </div>
  );
};

export default BoxGenerator;

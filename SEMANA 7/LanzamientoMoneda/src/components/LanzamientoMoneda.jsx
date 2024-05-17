import React, { useState } from 'react';

// Función que simula el lanzamiento de una moneda
function lanzarMoneda() {
    return Math.random() > 0.5 ? 'cara' : 'cruz';
}

// Función que simula obtener cinco "caras" seguidas usando Promesas
function cincoCaras(actualizarHistorial) {
    return new Promise((resolve, reject) => {
        let contadorCaras = 0;
        let intentos = 0;
        while (contadorCaras < 5 && intentos < 100) {
            intentos++;
            let resultado = lanzarMoneda();
            actualizarHistorial(`${resultado} fue lanzada`);
            if (resultado === 'cara') {
                contadorCaras++;
            } else {
                contadorCaras = 0;
            }
        }
        if (contadorCaras === 5) {
            resolve(`Tomó ${intentos} intentos obtener cinco "caras"`);
        } else {
            reject('Se realizaron más de 100 intentos');
        }
    });
}

const LanzamientoMoneda = () => {
    const [resultado, setResultado] = useState('');
    const [historial, setHistorial] = useState([]);

    const manejarLanzamiento = () => {
        setHistorial([]); // Reiniciar historial
        cincoCaras((mensaje) => {
            setHistorial(prevHistorial => [...prevHistorial, mensaje]);
        })
            .then(res => setResultado(res))
            .catch(err => setResultado(err));
    };

    return (
        <div className="contenedor">
            <h1>Lanzamiento de Monedas</h1>
            <button className="boton" onClick={manejarLanzamiento}>Lanzar Moneda</button>
            <p>{resultado}</p>
            <h2>Historial de Lanzamientos:</h2>
            <ul>
                {historial.map((entrada, indice) => (
                    <li key={indice}>{entrada}</li>
                ))}
            </ul>
        </div>
    );
};

export default LanzamientoMoneda;

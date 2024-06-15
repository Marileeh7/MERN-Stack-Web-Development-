import React from "react"; // Importa React
import ReactDOM from "react-dom/client"; // Importa ReactDOM para renderizar la aplicación en el DOM
import App from "./App"; // Importa el componente principal de la aplicación
import { Provider } from "react-redux"; // Importa Provider de react-redux para conectar Redux con React
import store from "./redux/store"; // Importa el store de Redux

// Crea un punto de entrada en el DOM donde se montará la aplicación
const root = ReactDOM.createRoot(document.getElementById("root"));

// Renderiza la aplicación
root.render(
  // Proveedor de Redux para proporcionar el store a la aplicación
  <Provider store={store}>
    {/* Componente principal de la aplicación */}
    <App />
  </Provider>
);

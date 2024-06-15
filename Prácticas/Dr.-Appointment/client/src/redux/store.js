import { configureStore } from "@reduxjs/toolkit"; // Importa configureStore de @reduxjs/toolkit
import rootReducer from "./reducers/rootSlice"; // Importa el rootReducer desde el archivo rootSlice

// Configura el store de Redux
const store = configureStore({
  reducer: {
    root: rootReducer, // Asigna el rootReducer al slice "root"
  },
});

export default store; // Exporta el store como el valor por defecto del módulo

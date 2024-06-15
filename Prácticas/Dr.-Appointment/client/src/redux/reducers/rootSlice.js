import { createSlice } from "@reduxjs/toolkit";

// Definición del slice raíz con el nombre "root"
export const rootReducer = createSlice({
  name: "root", // Nombre del slice
  initialState: {
    loading: true, // Estado inicial de la carga
    userInfo: {}, // Información inicial del usuario
  },
  reducers: {
    // Reductor para establecer el estado de carga
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    // Reductor para establecer la información del usuario
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

// Exporta las acciones generadas por createSlice
export const { setLoading, setUserInfo } = rootReducer.actions;

// Exporta el reductor del slice como el valor por defecto
export default rootReducer.reducer;

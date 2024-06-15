import React, { lazy, Suspense } from "react"; // Importa React, lazy y Suspense para carga diferida
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Importa componentes de react-router-dom
import { Toaster } from "react-hot-toast"; // Importa Toaster de react-hot-toast para mostrar notificaciones
import { Protected, Public, Admin } from "./middleware/route"; // Importa los componentes de protección de rutas
import Loading from "./components/Loading"; // Importa el componente de carga
import Navbar from "./components/Navbar"; // Asegúrate de tener el Navbar importado si es necesario en todas las páginas

// Utiliza React.lazy para cargar los componentes de forma diferida
const Home = lazy(() => import("./pages/Home"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Appointments = lazy(() => import("./pages/Appointments"));
const Doctors = lazy(() => import("./pages/Doctors"));
const Profile = lazy(() => import("./pages/Profile"));
const Notifications = lazy(() => import("./pages/Notifications"));
const ApplyDoctor = lazy(() => import("./pages/ApplyDoctor"));
const Error = lazy(() => import("./pages/Error"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

function App() {
  return (
    <Router>
      <Toaster /> {/* Toaster para mostrar notificaciones */}
      <Navbar /> {/* Asegúrate de que el Navbar esté disponible en todas las páginas si es necesario */}
      <Suspense fallback={<Loading />}> {/* Muestra el componente Loading mientras se cargan los componentes diferidos */}
        <Routes>
          {/* Ruta para la página de inicio de sesión */}
          <Route path="/login" element={<Login />} />
          
          {/* Ruta para la página de registro, accesible solo para usuarios no autenticados */}
          <Route path="/register" element={
            <Public>
              <Register />
            </Public>
          } />

          {/* Ruta para la página principal */}
          <Route path="/" element={<Home />} />
          
          {/* Ruta para la página de doctores */}
          <Route path="/doctors" element={<Doctors />} />

          {/* Rutas protegidas que requieren autenticación */}
          <Route path="/appointments" element={
            <Protected>
              <Appointments />
            </Protected>
          } />
          <Route path="/notifications" element={
            <Protected>
              <Notifications />
            </Protected>
          } />
          <Route path="/applyfordoctor" element={
            <Protected>
              <ApplyDoctor />
            </Protected>
          } />
          <Route path="/profile" element={
            <Protected>
              <Profile />
            </Protected>
          } />

          {/* Rutas protegidas para el panel de administración, accesibles solo para administradores */}
          <Route path="/dashboard/users" element={
            <Admin>
              <Dashboard type={"users"} />
            </Admin>
          } />
          <Route path="/dashboard/doctors" element={
            <Admin>
              <Dashboard type={"doctors"} />
            </Admin>
          } />
          <Route path="/dashboard/appointments" element={
            <Protected>
              <Dashboard type={"appointments"} />
            </Protected>
          } />
          <Route path="/dashboard/applications" element={
            <Protected>
              <Dashboard type={"applications"} />
            </Protected>
          } />

          {/* Ruta para manejar cualquier ruta no definida, muestra el componente de error */}
          <Route path="*" element={<Error />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;

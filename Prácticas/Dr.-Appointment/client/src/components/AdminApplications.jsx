import React, { useState, useEffect } from "react";
import axios from "../utils/api"; // Importa axios configurado
import toast from "react-hot-toast";
import Loading from "./Loading";
import { setLoading } from "../redux/reducers/rootSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../utils/api"; // Importa la función fetchData
import Empty from "./Empty";

// Configura la URL base para axios usando una variable de entorno
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

const AdminApplications = () => {
  // Estado para almacenar las aplicaciones
  const [applications, setApplications] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);

  // Función para obtener todas las aplicaciones
  const getAllApp = async () => {
    try {
      dispatch(setLoading(true)); // Activa el estado de carga
      const temp = await fetchData(`/doctor/getnotdoctors`);
      setApplications(temp); // Actualiza el estado con las aplicaciones recibidas
      dispatch(setLoading(false)); // Desactiva el estado de carga
    } catch (error) {
      console.error("Error fetching applications", error);
      // Maneja el error adecuadamente, por ejemplo, mostrando un mensaje al usuario
      // toast.error("Error fetching applications");
    }
  };

  // Función para aceptar un usuario
  const acceptUser = async (userId) => {
    try {
      const confirm = window.confirm("Are you sure you want to accept?");
      if (confirm) {
        const { data } = await toast.promise(
          axios.put(
            "/doctor/acceptdoctor",
            { id: userId },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          ),
          {
            success: "Application accepted",
            error: "Unable to accept application",
            loading: "Accepting application...",
          }
        );
        getAllApp(); // Refresca la lista de aplicaciones
      }
    } catch (error) {
      console.error("Error accepting application", error);
      // Maneja el error adecuadamente, por ejemplo, mostrando un mensaje al usuario
      // toast.error("Error accepting application");
    }
  };

  // Función para rechazar (eliminar) un usuario
  const deleteUser = async (userId) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete?");
      if (confirm) {
        const { data } = await toast.promise(
          axios.put(
            "/doctor/rejectdoctor",
            { id: userId },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          ),
          {
            success: "Application rejected",
            error: "Unable to reject application",
            loading: "Rejecting application...",
          }
        );
        getAllApp(); // Refresca la lista de aplicaciones
      }
    } catch (error) {
      console.error("Error rejecting application", error);
      // Maneja el error adecuadamente, por ejemplo, mostrando un mensaje al usuario
      // toast.error("Error rejecting application");
    }
  };

  // Hook de efecto para cargar todas las aplicaciones al montar el componente
  useEffect(() => {
    getAllApp();
  }, []);

  return (
    <>
      {loading ? (
        <Loading /> // Muestra un componente de carga si el estado de carga está activo
      ) : (
        <section className="user-section">
          <h3 className="home-sub-heading">All Applications</h3>
          {applications.length > 0 ? (
            <div className="user-container">
              <table>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Mobile No.</th>
                    <th>Experience</th>
                    <th>Specialization</th>
                    <th>Fees</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((ele, i) => (
                    <tr key={ele._id}>
                      <td>{i + 1}</td>
                      <td>{ele.userId.firstname}</td>
                      <td>{ele.userId.lastname}</td>
                      <td>{ele.userId.email}</td>
                      <td>{ele.userId.mobile}</td>
                      <td>{ele.experience}</td>
                      <td>{ele.specialization}</td>
                      <td>{ele.fees}</td>
                      <td className="select">
                        <button
                          className="btn user-btn accept-btn"
                          onClick={() => acceptUser(ele.userId._id)}
                        >
                          Accept
                        </button>
                        <button
                          className="btn user-btn"
                          onClick={() => deleteUser(ele.userId._id)}
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <Empty /> // Muestra un componente vacío si no hay aplicaciones
          )}
        </section>
      )}
    </>
  );
};

export default AdminApplications; // Exporta el componente AdminApplications como el valor por defecto de este módulo

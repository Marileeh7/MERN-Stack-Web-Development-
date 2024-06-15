import React, { useState, useEffect } from "react";
import fetchData from "../utils/api"; // Importa fetchData desde la ubicación correcta
import axios from "../utils/api"; // Importa axios desde la ubicación correcta
import toast from "react-hot-toast";
import Loading from "./Loading";
import { setLoading } from "../redux/reducers/rootSlice";
import { useDispatch, useSelector } from "react-redux";
import Empty from "./Empty";


// Configura la URL base para axios usando una variable de entorno
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

const AdminDoctors = () => {
  // Estado para almacenar la lista de doctores
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);

  // Función para obtener todos los doctores
  const getAllDoctors = async () => {
    try {
      dispatch(setLoading(true)); // Activa el estado de carga
      const temp = await fetchData(`/doctor/getalldoctors`);
      setDoctors(temp); // Actualiza el estado con la lista de doctores recibida
      dispatch(setLoading(false)); // Desactiva el estado de carga
    } catch (error) {
      console.error("Error fetching doctors", error);
    }
  };

  // Función para eliminar un doctor
  const deleteUser = async (userId) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete?");
      if (confirm) {
        const { data } = await toast.promise(
          axios.put(
            "/doctor/deletedoctor",
            { userId },
            {
              headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          ),
          {
            success: "Doctor deleted successfully",
            error: "Unable to delete Doctor",
            loading: "Deleting Doctor...",
          }
        );
        getAllDoctors(); // Refresca la lista de doctores
      }
    } catch (error) {
      console.error("Error deleting doctor", error);
      return error;
    }
  };

  // Hook de efecto para cargar todos los doctores al montar el componente
  useEffect(() => {
    getAllDoctors();
  }, []);

  return (
    <>
      {loading ? (
        <Loading /> // Muestra un componente de carga si el estado de carga está activo
      ) : (
        <section className="user-section">
          <h3 className="home-sub-heading">All Doctors</h3>
          {doctors.length > 0 ? (
            <div className="user-container">
              <table>
                <thead>
                  <tr>
                    <th>S.No</th>
                    {/* Elimina la columna de imágenes */}
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Mobile No.</th>
                    <th>Experience</th>
                    <th>Specialization</th>
                    <th>Fees</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {doctors?.map((ele, i) => (
                    <tr key={ele?._id}>
                      <td>{i + 1}</td>
                      {/* Elimina la celda de imágenes */}
                      <td>{ele?.userId?.firstname}</td>
                      <td>{ele?.userId?.lastname}</td>
                      <td>{ele?.userId?.email}</td>
                      <td>{ele?.userId?.mobile}</td>
                      <td>{ele?.experience}</td>
                      <td>{ele?.specialization}</td>
                      <td>{ele?.fees}</td>
                      <td className="select">
                        <button
                          className="btn user-btn"
                          onClick={() => {
                            deleteUser(ele?.userId?._id);
                          }}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <Empty /> // Muestra un componente vacío si no hay doctores
          )}
        </section>
      )}
    </>
  );
};

export default AdminDoctors; // Exporta el componente AdminDoctors como el valor por defecto de este módulo

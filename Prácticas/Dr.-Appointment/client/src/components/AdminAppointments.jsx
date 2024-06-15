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

const AdminAppointments = () => {
  // Estado para almacenar las citas
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);

  // Función para obtener todas las citas
  const getAllAppoint = async () => {
    try {
      dispatch(setLoading(true)); // Activa el estado de carga
      const temp = await fetchData(`/appointment/getallappointments`);
      setAppointments(temp); // Actualiza el estado con las citas recibidas
      dispatch(setLoading(false)); // Desactiva el estado de carga
    } catch (error) {
      console.error("Error fetching appointments", error);
    }
  };

  // Función para eliminar un usuario
  const deleteUser = async (userId) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete?");
      if (confirm) {
        const { data } = await toast.promise(
          axios.delete("/user/deleteuser", {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            data: { userId },
          }),
          {
            pending: "Deleting in...",
            success: "User deleted successfully",
            error: "Unable to delete user",
            loading: "Deleting user...",
          }
        );
        getAllAppoint(); // Refresca la lista de citas
      }
    } catch (error) {
      console.error("Error deleting user", error);
      return error;
    }
  };

  // Hook de efecto para cargar todas las citas al montar el componente
  useEffect(() => {
    getAllAppoint();
  }, []);

  // Función para marcar una cita como completada
  const complete = async (ele) => {
    try {
      const { data } = await toast.promise(
        axios.put(
          "/appointment/completed",
          {
            appointid: ele?._id,
            doctorId: ele?.doctorId._id,
            doctorname: `${ele?.userId?.firstname} ${ele?.userId?.lastname}`,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          success: "Appointment booked successfully",
          error: "Unable to book appointment",
          loading: "Booking appointment...",
        }
      );

      getAllAppoint(); // Refresca la lista de citas
    } catch (error) {
      console.error("Error completing appointment", error);
      return error;
    }
  };

  return (
    <>
      {loading ? (
        <Loading /> // Muestra un componente de carga si el estado de carga está activo
      ) : (
        <section className="user-section">
          <h3 className="home-sub-heading">All Users</h3>
          {appointments.length > 0 ? (
            <div className="user-container">
              <table>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Doctor</th>
                    <th>Patient</th>
                    <th>Appointment Date</th>
                    <th>Appointment Time</th>
                    <th>Booking Date</th>
                    <th>Booking Time</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments?.map((ele, i) => (
                    <tr key={ele?._id}>
                      <td>{i + 1}</td>
                      <td>
                        {ele?.doctorId?.firstname + " " + ele?.doctorId?.lastname}
                      </td>
                      <td>
                        {ele?.userId?.firstname + " " + ele?.userId?.lastname}
                      </td>
                      <td>{ele?.date}</td>
                      <td>{ele?.time}</td>
                      <td>{ele?.createdAt.split("T")[0]}</td>
                      <td>{ele?.updatedAt.split("T")[1].split(".")[0]}</td>
                      <td>{ele?.status}</td>
                      <td>
                        <button
                          className={`btn user-btn accept-btn ${
                            ele?.status === "Completed" ? "disable-btn" : ""
                          }`}
                          disabled={ele?.status === "Completed"}
                          onClick={() => complete(ele)}
                        >
                          Complete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <Empty /> // Muestra un componente vacío si no hay citas
          )}
        </section>
      )}
    </>
  );
};

export default AdminAppointments; // Exporta el componente AdminAppointments como el valor por defecto de este módulo

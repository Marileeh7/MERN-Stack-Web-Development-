import React, { useState, useEffect } from "react";
import axios from "../utils/api"; // Importa la instancia configurada de Axios
import toast from "react-hot-toast";
import Loading from "./Loading";
import { setLoading } from "../redux/reducers/rootSlice";
import { useDispatch, useSelector } from "react-redux";
import Empty from "./Empty";
import fetchData from "../utils/api";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

const Users = () => {
  // Estado para almacenar la lista de usuarios
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);

  // Función para obtener todos los usuarios
  const getAllUsers = async () => {
    try {
      dispatch(setLoading(true)); // Activa el estado de carga
      const temp = await fetchData(`/user/getallusers`);
      setUsers(temp); // Actualiza el estado con la lista de usuarios recibida
      dispatch(setLoading(false)); // Desactiva el estado de carga
    } catch (error) {
      console.error("Error fetching users", error);
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
        getAllUsers(); // Refresca la lista de usuarios
      }
    } catch (error) {
      console.error("Error deleting user", error);
      return error;
    }
  };

  // Hook de efecto para cargar todos los usuarios al montar el componente
  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      {loading ? (
        <Loading /> // Muestra un componente de carga si el estado de carga está activo
      ) : (
        <section className="user-section">
          <h3 className="home-sub-heading">All Users</h3>
          {users.length > 0 ? (
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
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Is Doctor</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map((ele, i) => (
                    <tr key={ele?._id}>
                      <td>{i + 1}</td>
                      {/* Elimina la celda de imágenes */}
                      <td>{ele?.firstname}</td>
                      <td>{ele?.lastname}</td>
                      <td>{ele?.email}</td>
                      <td>{ele?.mobile}</td>
                      <td>{ele?.age}</td>
                      <td>{ele?.gender}</td>
                      <td>{ele?.isDoctor ? "Yes" : "No"}</td>
                      <td className="select">
                        <button
                          className="btn user-btn"
                          onClick={() => {
                            deleteUser(ele?._id);
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
            <Empty /> // Muestra un componente vacío si no hay usuarios
          )}
        </section>
      )}
    </>
  );
};

export default Users; // Exporta el componente Users como el valor por defecto de este módulo

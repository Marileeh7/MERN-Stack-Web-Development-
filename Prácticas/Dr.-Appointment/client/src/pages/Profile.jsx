import React, { useEffect, useState } from "react";
import fetchData from "../utils/api"; // Importa fetchData desde la ubicación correcta
import axios from "../utils/api"; // Importa axios desde la ubicación correcta
import toast from "react-hot-toast";
import { setLoading } from "../redux/reducers/rootSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import { jwtDecode } from "jwt-decode"; // Importación correcta

function Profile() {
  const { userId } = jwtDecode(localStorage.getItem("token")); // Uso correcto de jwtDecode
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);
  const [formDetails, setFormDetails] = useState({
    firstname: "",
    lastname: "",
    email: "",
    age: "",
    mobile: "",
    gender: "neither",
    address: "",
    password: "",
    confpassword: "",
  });

  const getUser = async () => {
    try {
      dispatch(setLoading(true));
      const data = await fetchData(`/user/getuser/${userId}`);
      setFormDetails({
        ...data,
        password: "",
        confpassword: "",
        mobile: data.mobile === null ? "" : data.mobile,
        age: data.age === null ? "" : data.age,
      });
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      toast.error("Unable to fetch user data");
    }
  };

  useEffect(() => {
    getUser();
  }, [dispatch]);

  const inputChange = (e) => {
    const { name, value } = e.target;
    return setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const formSubmit = async (e) => {
    try {
      e.preventDefault();
      const {
        firstname,
        lastname,
        email,
        age,
        mobile,
        address,
        gender,
        password,
        confpassword,
      } = formDetails;

      if (!email) {
        return toast.error("Email should not be empty");
      } else if (firstname.length < 3) {
        return toast.error("First name must be at least 3 characters long");
      } else if (lastname.length < 3) {
        return toast.error("Last name must be at least 3 characters long");
      } else if (password.length < 5) {
        return toast.error("Password must be at least 5 characters long");
      } else if (password !== confpassword) {
        return toast.error("Passwords do not match");
      }
      const { data } = await toast.promise(
        axios.put(
          "/user/updateprofile",
          {
            firstname,
            lastname,
            age,
            mobile,
            address,
            gender,
            email,
            password,
          },
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          pending: "Updating profile...",
          success: "Profile updated successfully",
          error: "Unable to update profile",
        }
      );

      setFormDetails({ ...formDetails, password: "", confpassword: "" });
    } catch (error) {
      toast.error("Unable to update profile");
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className="register-section flex-center">
          <div className="profile-container flex-center">
            <h2 className="form-heading">Profile</h2>
            <form onSubmit={formSubmit} className="register-form">
              <div className="form-same-row">
                <input
                  type="text"
                  name="firstname"
                  className="form-input"
                  placeholder="Enter your first name"
                  value={formDetails.firstname}
                  onChange={inputChange}
                />
                <input
                  type="text"
                  name="lastname"
                  className="form-input"
                  placeholder="Enter your last name"
                  value={formDetails.lastname}
                  onChange={inputChange}
                />
              </div>
              <div className="form-same-row">
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="Enter your email"
                  value={formDetails.email}
                  onChange={inputChange}
                />
                <select
                  name="gender"
                  value={formDetails.gender}
                  className="form-input"
                  id="gender"
                  onChange={inputChange}
                >
                  <option value="neither">Prefer not to say</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="form-same-row">
                <input
                  type="text"
                  name="age"
                  className="form-input"
                  placeholder="Enter your age"
                  value={formDetails.age}
                  onChange={inputChange}
                />
                <input
                  type="text"
                  name="mobile"
                  className="form-input"
                  placeholder="Enter your mobile number"
                  value={formDetails.mobile}
                  onChange={inputChange}
                />
              </div>
              <textarea
                type="text"
                name="address"
                className="form-input"
                placeholder="Enter your address"
                value={formDetails.address}
                onChange={inputChange}
                rows="2"
              ></textarea>
              <div className="form-same-row">
                <input
                  type="password"
                  name="password"
                  className="form-input"
                  placeholder="Enter your password"
                  value={formDetails.password}
                  onChange={inputChange}
                />
                <input
                  type="password"
                  name="confpassword"
                  className="form-input"
                  placeholder="Confirm your password"
                  value={formDetails.confpassword}
                  onChange={inputChange}
                />
              </div>
              <button type="submit" className="btn form-btn">
                update
              </button>
            </form>
          </div>
        </section>
      )}
    </>
  );
}

export default Profile;

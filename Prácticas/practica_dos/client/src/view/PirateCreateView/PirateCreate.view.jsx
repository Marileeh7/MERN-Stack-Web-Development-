import { useState } from "react";
import PiratesTemplate from "../../Template/Pirates.template";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../config";
import "../../App.css"; // Asegúrate de importar los estilos globales

const PirateCreateView = (props) => {
    const [data, setData] = useState({
        name: "",
        photo: "",
        treasure: 0,
        quote: "",
        position: "Captain",
        peg_leg: false,
        eye_patch: false,
        hook_hand: false
    });
    const [errors, setErrors] = useState({});
    const positions = ["Captain", "First Mate", "Quarter Master", "Boatswain", "Powder Monkey"];
    const navigate = useNavigate();

    const changeHandler = (e) => {
        let new_data = {
            ...data,
            [e.target.name]: e.target.type !== "checkbox" ? e.target.value : e.target.checked
        };
        setData(new_data);
    };

    const createPirate = (e) => {
        e.preventDefault();
        axios.post(`${baseURL}/pirates/`, data, { withCredentials: true })
            .then((response) => {
                alert("We have a new pirate in the ship");
                navigate("/pirates/");
            })
            .catch((error) => {
                if (error.response && error.response.data) {
                    setErrors(error.response.data.error);
                } else {
                    console.error("Error de respuesta del servidor:", error);
                    setErrors({ message: "Error al procesar la solicitud. Por favor, inténtalo nuevamente más tarde." });
                }
            });
    };

    const goToCrew = () => {
        navigate("/pirates/");
    };

    return (
        <PiratesTemplate 
            title="Add pirate" 
            hasButton={true} 
            buttonText="Pirate crew" 
            buttonAction={goToCrew}
        >
            <form onSubmit={createPirate}>
                <div className="row align-items-stretch my-3">
                    <div className="col-md-6">
                        <div className="mt-3 px-2">
                            <label className="form-label">Pirate Name:</label>
                            <input 
                                required 
                                minLength={2} 
                                className="form-control" 
                                type="text" 
                                name="name" 
                                onChange={changeHandler} 
                                value={data.name} 
                            />
                            <div className="form-text text-danger fw-bold">{errors.name}</div>
                        </div>
                        <div className="mt-3 px-2">
                            <label className="form-label">Image URL:</label>
                            <input 
                                required 
                                minLength={2} 
                                className="form-control" 
                                type="text" 
                                name="photo" 
                                onChange={changeHandler} 
                                value={data.photo} 
                            />
                            <div className="form-text text-danger fw-bold">{errors.photo}</div>
                        </div>
                        <div className="mt-3 px-2">
                            <label className="form-label"># of Treasures Chests:</label>
                            <input 
                                className="form-control" 
                                type="number" 
                                min={0} 
                                name="treasure" 
                                onChange={changeHandler} 
                                value={data.treasure} 
                            />
                            <div className="form-text text-danger fw-bold">{errors.treasure}</div>
                        </div>
                        <div className="mt-3 px-2">
                            <label className="form-label">Pirate catch phrase:</label>
                            <textarea 
                                required 
                                maxLength={100} 
                                className="form-control" 
                                name="quote" 
                                onChange={changeHandler} 
                                value={data.quote}
                            />
                            <div className="form-text text-danger fw-bold">{errors.quote}</div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mt-3 px-2">
                            <label className="form-label">Crew Position:</label>
                            <select 
                                className="form-select" 
                                name="position" 
                                onChange={changeHandler} 
                                value={data.position}
                            >
                                {positions.map((elemt, idx) => (
                                    <option key={idx} value={elemt}>{elemt}</option>
                                ))}
                            </select>
                            <div className="form-text text-danger fw-bold">{errors.position}</div>
                        </div>
                        <div>
                            <div className="mt-3 px-2">
                                <input 
                                    className="form-check-input" 
                                    type="checkbox" 
                                    name="peg_leg" 
                                    onChange={changeHandler} 
                                    checked={data.peg_leg} 
                                />
                                <label className="form-label">Peg Leg</label>
                                <div className="form-text text-danger fw-bold">{errors.peg_leg}</div>
                            </div>
                            <div className="mt-3 px-2">
                                <input 
                                    className="form-check-input" 
                                    type="checkbox" 
                                    name="eye_patch" 
                                    onChange={changeHandler} 
                                    checked={data.eye_patch} 
                                />
                                <label className="form-label">Eye Patch</label>
                                <div className="form-text text-danger fw-bold">{errors.eye_patch}</div>
                            </div>
                            <div className="mt-3 px-2">
                                <input 
                                    className="form-check-input" 
                                    type="checkbox" 
                                    name="hook_hand" 
                                    onChange={changeHandler} 
                                    checked={data.hook_hand} 
                                />
                                <label className="form-label">Hook Hand</label>
                                <div className="form-text text-danger fw-bold">{errors.hook_hand}</div>
                            </div>
                            <div className="mt-3 px-2">
                                <button type="submit" className="btn btn-secondary">Add Pirate</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </PiratesTemplate>
    );
};

export default PirateCreateView;

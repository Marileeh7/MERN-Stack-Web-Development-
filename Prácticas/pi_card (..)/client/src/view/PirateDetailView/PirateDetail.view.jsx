import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import PiratesTemplate from "../../templates/Pirates.template";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../config";

const PirateCreateView = () => {
    const [data, setData] = useState({
        name: '',
        photo: '',
        quote: '',
        position: 'Captain',
        treasure: 0,
        peg_leg: false,
        eye_patch: false,
        hook_hand: false,
    });
    const [errors, setErrors] = useState({});
    const positions = ["Captain", "First Mate", "Quarter Master", "Boatswain", "Powder Monkey"];
    const navigate = useNavigate();

    const changeHandler = (e) => {
        const { name, type, value, checked } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const createPirate = (e) => {
        e.preventDefault();
        setErrors({});
        axios.post(`${baseURL}/pirates/`, data, { withCredentials: true })
            .then((response) => {
                alert("We have a new pirate in the ship!");
                setData({
                    name: '',
                    photo: '',
                    quote: '',
                    position: 'Captain',
                    treasure: 0,
                    peg_leg: false,
                    eye_patch: false,
                    hook_hand: false,
                });
                navigate("/pirates/");
            })
            .catch((error) => {
                if (error.response) {
                    setErrors(error.response.data.error);
                } else {
                    setErrors({ form: "An unexpected error occurred. Please try again later." });
                }
            });
    };

    const goToCrew = () => {
        navigate("/pirates/");
    };

    return (
        <PiratesTemplate 
            title="Add Pirate" 
            hasButton={true} 
            buttonText="Pirate Crew" 
            buttonAction={goToCrew}
        >
            <form onSubmit={createPirate}>
                <Row className="d-flex align-items-stretch my-3">
                    <Col md={6}>
                        <div className="mt-3 px-2">
                            <label className="form-label">Pirate Name:</label>
                            <input required minLength={2} className="form-control" type="text" name="name" onChange={changeHandler} value={data.name} />
                            <div className="form-text text-danger fw-bold">{errors.name}</div>
                        </div>
                        <div className="mt-3 px-2">
                            <label className="form-label">Image URL:</label>
                            <input required minLength={2} className="form-control" type="text" name="photo" onChange={changeHandler} value={data.photo} />
                            <div className="form-text text-danger fw-bold">{errors.photo}</div>
                        </div>
                        <div className="mt-3 px-2">
                            <label className="form-label"># of Treasure Chests:</label>
                            <input className="form-control" type="number" min={0} name="treasure" onChange={changeHandler} value={data.treasure} />
                            <div className="form-text text-danger fw-bold">{errors.treasure}</div>
                        </div>
                        <div className="mt-3 px-2">
                            <label className="form-label">Pirate Catch Phrase:</label>
                            <textarea required maxLength={100} className="form-control" name="quote" onChange={changeHandler} value={data.quote}></textarea>
                            <div className="form-text text-danger fw-bold">{errors.quote}</div>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="mt-3 px-2">
                            <label className="form-label">Crew Position:</label>
                            <select className="form-select" name="position" onChange={changeHandler} value={data.position}>
                                {positions.map((element, idx) => (
                                    <option key={idx} value={element}>{element}</option>
                                ))}
                            </select>
                            <div className="form-text text-danger fw-bold">{errors.position}</div>
                        </div>
                        <div className="mt-3 px-2">
                            <input className="form-check-input" type="checkbox" name="peg_leg" onChange={changeHandler} checked={data.peg_leg} />
                            <label className="form-label">Peg Leg</label>
                            <div className="form-text text-danger fw-bold">{errors.peg_leg}</div>
                        </div>
                        <div className="mt-3 px-2">
                            <input className="form-check-input" type="checkbox" name="eye_patch" onChange={changeHandler} checked={data.eye_patch} />
                            <label className="form-label">Eye Patch</label>
                            <div className="form-text text-danger fw-bold">{errors.eye_patch}</div>
                        </div>
                        <div className="mt-3 px-2">
                            <input className="form-check-input" type="checkbox" name="hook_hand" onChange={changeHandler} checked={data.hook_hand} />
                            <label className="form-label">Hook Hand</label>
                            <div className="form-text text-danger fw-bold">{errors.hook_hand}</div>
                        </div>
                        <div className="mt-3 px-2">
                            <Button type="submit" className="submit-button">Add Pirate</Button>
                            {errors.form && <div className="form-text text-danger fw-bold mt-2">{errors.form}</div>}
                        </div>
                    </Col>
                </Row>
            </form>
        </PiratesTemplate>
    );
};

export default PirateCreateView;

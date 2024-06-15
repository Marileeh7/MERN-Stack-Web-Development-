import { useState } from "react"
import { Button, Col, Row } from "react-bootstrap";
import PiratesTemplate from "../../templates/Pirates.template";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../config";

const PirateCreateView = (props) => {
    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});
    const positions = ["Captain", "First Mate", "Quarter Master", "Boatswain", "Powder Monkey"]
    const navigate = useNavigate();
    
    const changeHandler = (e) => {
        let new_data = {
            ...data,
            [e.target.name]: e.target.type !== "checkbox" ? e.target.value : e.target.checked
        };
        setData(new_data)
    }

    const createPirate = (e) => {
        e.preventDefault();
        axios.post(`${baseURL}/pirates/`, data, {withCredentials: true})
            .then((response) => {
                alert("We have a new pirate in the ship");
                setData({})
            })
            .catch((error) => {
                setErrors(error.response.data.error);
            })
    }
    const goToCrew = () => {
        navigate("/pirates/")
    }
    return (
        <PiratesTemplate 
            title="Add pirate" 
            hasButton={true} 
            buttonText="Pirate crew" 
            buttonAction={() => {goToCrew()}}
        >
            <form onSubmit={createPirate}>
        <Row className="d-flex align-items-stretch my-3">
            <Col md={6} className="">
                <div className="mt-3 px-2">
                    <label className="form-label">Pirate Name:</label>
                    <div>
                        <input required minLength={2} className="form-control" type="text" name="name" onChange={changeHandler} value={data["name"]}/>
                        <div className="form-text text-danger fw-bold">{errors["name"]}</div>
                    </div>
                </div>
                <div className="mt-3 px-2">
                    <label className="form-label">Image URL:</label>
                    <div>
                        <input required minLength={2} className="form-control" type="text" name="photo" onChange={changeHandler} value={data["photo"]}/>
                        <div className="form-text text-danger fw-bold">{errors["photo"]}</div>
                    </div>
                </div>
                <div className="mt-3 px-2">
                    <label className="form-label"># of Treasures Chests:</label>
                    <div>
                        <input className="form-control" type="number" min={0} name="treasure" onChange={changeHandler} value={data["treasure"]}/>
                        <div className="form-text text-danger fw-bold">{errors["treasure"]}</div>
                    </div>
                </div>
                <div className="mt-3 px-2">
                    <label className="form-label">Pirate catch phrase:</label>
                    <div>
                        <div className="form-text text-danger fw-bold">{errors["quote"]}</div>
                        <textarea required maxLength={100} className="form-control" name="quote" onChange={changeHandler} value={data["quote"]}>

                        </textarea>
                        
                    </div>
                </div>
                
            </Col>
            <Col md={6} className="">
                <div className="mt-3 px-2">
                    <label className="form-label">Crew Position:</label>
                    <div>
                        <select className="form-select" name="position" onChange={changeHandler} value={data["position"]}>
                            {positions.map((elemt, idx) => {
                                return <option key={idx} value={elemt} selected={elemt === data["position"]}>{elemt}</option>
                            })}
                        </select>
                        <div className="form-text text-danger fw-bold">{errors["position"]}</div>
                    </div>
                </div>

                <div>
                    <div className="mt-3 px-2">
                        <input className="form-check-input" type="checkbox" name="peg_leg" onChange={changeHandler} value={data["peg_leg"]}/>
                        <label className="form-label">Peg Leg</label>
                        <div className="form-text text-danger fw-bold">{errors["peg_leg"]}</div>
                    </div>
                    <div className="mt-3 px-2">
                        <input className="form-check-input" type="checkbox" name="eye_patch" onChange={changeHandler} value={data["eye_patch"]}/>
                        <label className="form-label">Eye Patch</label>
                        <div className="form-text text-danger fw-bold">{errors["eye_patch"]}</div>
                    </div>
                    <div className="mt-3 px-2">
                        <input className="form-check-input" type="checkbox" name="hook_hand" onChange={changeHandler} value={data["hook_hand"]}/>
                        <label className="form-label">Hook Hand</label>
                        <div className="form-text text-danger fw-bold">{errors["hook_hand"]}</div>
                    </div>
                    <div className="mt-3 px-2">
                        <Button type="submit" className="submit-button">Add Pirate</Button>
                    </div>
                </div>
            </Col>
            
        </Row>
        </form>
    </PiratesTemplate>

        )
}

export default PirateCreateView
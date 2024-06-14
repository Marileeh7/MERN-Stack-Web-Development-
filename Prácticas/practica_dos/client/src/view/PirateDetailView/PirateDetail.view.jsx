import { Col, Row, Button } from "react-bootstrap";
import PiratesTemplate from "../../Template/Pirates.template";
import PirateValueComponent from "../../Components/PirateValue/PirateValue.component";
import style from "./PirateDetail.module.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../config";

const PirateDetailView = (props) => {
    const [pirate, setPirate] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    const getPirate = () => {
        axios.get(`${baseURL}/pirates/${id}`, { withCredentials: true })
            .then((response) => {
                setPirate(response.data.data[0]);
            })
            .catch((error) => {
                console.error("Error fetching pirate:", error);
            });
    };

    const editPirate = (prop, value) => {
        axios.patch(`${baseURL}/pirates/${id}`, { [prop]: value }, { withCredentials: true })
            .then((response) => {
                setPirate((prevPirate) => ({
                    ...prevPirate,
                    [prop]: value
                }));
            })
            .catch((error) => {
                console.error("Error updating pirate:", error);
            });
    };

    useEffect(getPirate, [id]);

    if (!pirate) {
        return <PiratesTemplate title="Loading..." hasButton={false}></PiratesTemplate>;
    }

    const goToCrew = () => {
        navigate("/pirates/");
    };

    return (
        <PiratesTemplate title={pirate.name ?? "No hay pirata"} hasButton={false}>
            <Row className="d-flex align-items-stretch my-3">
                <Col md={6}>
                    <Row className="d-flex justify-content-center">
                        <img className={`${style["mw-75"]} ${style["mh-400"]} ${style["keep-aspect"]}`} src={pirate.photo} alt="Pirate picture" />
                    </Row>
                    <Row className="d-flex justify-content-center">
                        <h3 className="text-center text-lg">{pirate.quote}</h3>
                    </Row>
                </Col>
                <Col md={6} className="bg-white p-5 rounded border border-dark border-3">
                    <PirateValueComponent
                        keyLabel={"position"}
                        valueLabel={pirate.position}
                        hasButton={false}
                    />
                    <PirateValueComponent
                        keyLabel={"treasure"}
                        valueLabel={pirate.treasure}
                        hasButton={false}
                    />
                    <PirateValueComponent
                        keyLabel={"Peg leg"}
                        valueLabel={pirate.peg_leg ? "YES" : "NO"}
                        hasButton={true}
                        value={pirate.peg_leg}
                        buttonText={!pirate.peg_leg ? "YES" : "NO"}
                        buttonAction={() => {
                            editPirate("peg_leg", !pirate.peg_leg);
                        }}
                    />
                    <PirateValueComponent
                        keyLabel={"Eye Patch"}
                        valueLabel={pirate.eye_patch ? "YES" : "NO"}
                        hasButton={true}
                        buttonText={!pirate.eye_patch ? "YES" : "NO"}
                        value={pirate.eye_patch}
                        buttonAction={() => {
                            editPirate("eye_patch", !pirate.eye_patch);
                        }}
                    />
                    <PirateValueComponent
                        keyLabel={"Hook Hand"}
                        valueLabel={pirate.hook_hand ? "YES" : "NO"}
                        hasButton={true}
                        buttonText={!pirate.hook_hand ? "YES" : "NO"}
                        value={pirate.hook_hand}
                        buttonAction={() => {
                            editPirate("hook_hand", !pirate.hook_hand);
                        }}
                    />
                    <div className="mt-3">
                        <Button variant="secondary" onClick={goToCrew}>
                            Back to Pirate List
                        </Button>
                    </div>
                </Col>
            </Row>
        </PiratesTemplate>
    );
};

export default PirateDetailView;
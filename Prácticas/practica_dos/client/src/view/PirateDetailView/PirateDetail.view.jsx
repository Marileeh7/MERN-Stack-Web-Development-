import PiratesTemplate from "../../Template/Pirates.template";
import PirateValueComponent from "../../Components/PirateValue/PirateValue.component";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../config";
import "../../App.css"; // Asegúrate de importar los estilos globales

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
            <div className="row align-items-stretch my-3">
                <div className="col-md-6">
                    <div className="row justify-content-center">
                        <img className="mw-75 mh-400 keep-aspect" src={pirate.photo} alt="Pirate picture" />
                    </div>
                    <div className="row justify-content-center">
                        <h3 className="text-center text-lg">{pirate.quote}</h3>
                    </div>
                </div>
                <div className="col-md-6 bg-white p-5 rounded border border-dark border-3">
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
                        <button className="btn btn-secondary" onClick={goToCrew}>
                            Back to Pirate List
                        </button>
                    </div>
                </div>
            </div>
        </PiratesTemplate>
    );
};

export default PirateDetailView;

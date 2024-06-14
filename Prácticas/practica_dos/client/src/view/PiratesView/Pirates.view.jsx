import PiratesTemplate from "../../Template/Pirates.template";
import PirateCardComponent from "../../Components/PirateCard/PirateCard.component";
import { Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../config";
import { useEffect, useState } from "react";

const PiratesView = (props) => {

    const [pirates, setPirates] = useState([]);
    const navigate = useNavigate();

    const getPirate = () => {
        axios.get(`${baseURL}/pirates/`, {withCredentials: true})
            .then((response) => {
                setPirates(response.data.data.sort((a, b) => {
                    if (a.name > b.name) {
                        return 1;
                    } else if (a.name < b.name) {
                        return -1;
                    } else {
                        return 0;
                    }
                }));
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const deletePirate =(id) => {
        axios.delete(`${baseURL}/pirates/${id}`, {withCredentials: true})
            .then((response) => {
                setPirates(
                    pirates.filter((pirate) => pirate._id != id)
                )
            })
            .catch((error)=> {
                console.log(error);
            })
    }

    useEffect(getPirate, []);

    return (
        <PiratesTemplate
            title="Pirate Crew"
            hasButton={true}
            buttonText="Create Pirate"
            buttonAction={() => { navigate("/pirate/new/")}
        }
        >
            <Col xs={8}>
                {pirates.map(((pirate) => {
                    return <PirateCardComponent
                        image={pirate.photo}
                        name={pirate.name}
                        id={pirate._id}
                        key={pirate._id}
                        deletePirate={deletePirate}
                    />})
                    )
                }
            </Col>
        </PiratesTemplate>

        
    )
}

export default PiratesView;
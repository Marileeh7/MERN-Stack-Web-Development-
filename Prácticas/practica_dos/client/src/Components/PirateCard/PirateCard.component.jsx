import { useNavigate } from "react-router-dom"
import style from "./PirateCard.module.css"
import "../../App.css"; // Asegúrate de importar los estilos globales

const PirateCardComponent = (props) => {

    const navigate = useNavigate();
    const navigateToDetail = () => {
        navigate(`/pirate/${props.id}`);
    }

    return (
        <div className="row bg-white py-2 my-3">
            <div className="col-xs-3">
                <img 
                    className={style.pirateImage} 
                    src={props.image} 
                    alt="Pirate image" 
                />
            </div>
            <div className="col-xs-9">
                <div className="row mt-3">
                    <div className="col text-center">
                        <h5>{props.name}</h5>
                    </div>
                </div>
                <div className="row my-3">
                    <div className="col d-flex justify-content-center">
                        <button onClick={navigateToDetail} className="mx-5 btn btn-danger">View Pirate</button>
                        <button onClick={() => {
                            props.deletePirate(props.id);
                        }} className="mx-5 btn btn-danger">Walk the plank</button>
                    </div>
                </div>
            </div>    
        </div>
    )
}

export default PirateCardComponent

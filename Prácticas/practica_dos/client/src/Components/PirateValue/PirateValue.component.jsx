import style from "./PirateValue.module.css";
import "../../App.css"; // Asegúrate de importar los estilos globales

const PirateValueComponent = (props) => {
    return (
        <div className="row">
            <div className="col mt-3">
                <label className="fw-bold text-uppercase">{props.keyLabel}:</label>                
            </div>
            <div className="col mt-3">
                <span>{props.valueLabel}</span>
            </div>
            <div className="col mt-3">
                {
                    props.hasButton ?
                    <button 
                        className={`btn w-50 ${props.value ? "btn-danger" : "btn-success"}`}
                        onClick={props.buttonAction}
                    >
                        {props.buttonText}
                    </button> : null
                }
            </div>
        </div>
    )
}

export default PirateValueComponent;

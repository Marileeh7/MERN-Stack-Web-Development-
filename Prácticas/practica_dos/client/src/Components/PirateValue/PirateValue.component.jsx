import { Button, Col, Row } from "react-bootstrap";
import style from "./PirateValue.module.css";

const PirateValueComponent = (props) => {
    return (
        <Row>
            <Col className="mt-3">
                <label className="fw-bold text-uppercase" >{props.keyLabel}:</label>                
            </Col>
            <Col className="mt-3">
                <span className="">{props.valueLabel}</span>
            </Col>
            <Col className="mt-3">
            {
                    props.hasButton ?
                    
                    <Button 
                        className={`w-50 ${props.value ? "btn-danger" : "btn-success"}`}
                        onClick={props.buttonAction}
                    >
                        {props.buttonText}
                    </Button> : null
                }
            </Col>
        </Row>
    )
}

export default PirateValueComponent;
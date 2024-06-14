import {Container, Row, Col} from "react-bootstrap";
import styles from './Pirates.module.css';

const PiratesTemplate = (props) => {

    return (
        <Container className={styles.bgOrange}>
            <Row className={`d-flex ${styles.header}`}>
                <Col className={styles.absolutePosition}>
                    <h1 className={styles.centerTitle}>{props.title}</h1>
                    {props.hasButton ? 
                        <button className={styles.endButton} onClick={props.buttonAction}>
                            {props.buttonText}
                        </button> :
                        null
                    }
                </Col>
            </Row>
            <Row className={`d-flex justify-content-center ${styles.content}`} >
                {props.children}
            </Row>
        </Container>
    )
}

export default PiratesTemplate;
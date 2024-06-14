import { Col, Row } from "react-bootstrap"
import PiratesTemplate from "../../Template/Pirates.template"
import UserRegister from "../../Components/UserRegister/UserRegister.component"
import UserLogin from "../../Components/UserLogin/UserLogin.component"

const HomeView = (props) => {


    return (
        <PiratesTemplate title="Welcome to Pirate Crew" hasButton={false}>
                <Row>
                    <Col md={6}>
                        <UserRegister/>
                    </Col>
                    <Col md={6}>
                        <UserLogin setUser={props.setUser} />
                    </Col>
                </Row>
        </PiratesTemplate>
    )
}


export default HomeView;
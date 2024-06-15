import { Col, Row } from "react-bootstrap"
import PiratesTemplate from "../../templates/Pirates.template"
import UserRegister from "../../components/UserRegister/UserRegister.component"
import UserLogin from "../../components/UserLogin/UserLogin.component"

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
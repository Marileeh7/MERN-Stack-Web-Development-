import PiratesTemplate from "../../Template/Pirates.template"
import UserRegister from "../../Components/UserRegister/UserRegister.component"
import UserLogin from "../../Components/UserLogin/UserLogin.component"
import "../../App.css"; // Asegúrate de importar los estilos globales

const HomeView = (props) => {
    return (
        <PiratesTemplate title="Welcome to Pirate Crew" hasButton={false}>
            <div className="row">
                <div className="col-md-6">
                    <UserRegister />
                </div>
                <div className="col-md-6">
                    <UserLogin setUser={props.setUser} />
                </div>
            </div>
        </PiratesTemplate>
    )
}

export default HomeView;

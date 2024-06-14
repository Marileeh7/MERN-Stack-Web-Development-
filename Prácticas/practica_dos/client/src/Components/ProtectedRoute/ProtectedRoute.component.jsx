import { Navigate } from "react-router-dom";

const ProtectedRoute = (props) => {
    const {user, redirected } = props;

    return (<>
        {user ? props.children : <Navigate to={redirected} />}
    </>)
}

export default ProtectedRoute;
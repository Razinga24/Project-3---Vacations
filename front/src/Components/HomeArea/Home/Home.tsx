import { Navigate } from "react-router-dom";
import useVerifyLoggedIn from "../../../Hooks/useVerifyLoggedIn";
import "./Home.css";
import { NavLink } from "react-router-dom";

function Home(): JSX.Element {

    const user = useVerifyLoggedIn();

    if(user) return <Navigate to="/vacations"/>

    return (
        <div className="Home">
            <div className="upperPart">
                <h1>Welcome to TravelTide!</h1>
                <h3>Let the flow of adventure guide you to unforgettable destinations.<br/> Your next journey starts here!</h3>
            </div>
            <div className="lowerPart">
                <button><NavLink to="/login">Login</NavLink></button> |
                <button><NavLink to="/register">Register</NavLink></button>
            </div>
        </div>
    );
}

export default Home;

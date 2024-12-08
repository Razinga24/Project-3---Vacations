import "./RouteNotFound.css";
import pageNotFound from "../../../Assets/Images/pageNotFound.jpg";

function RouteNotFound(): JSX.Element {
    return (
        <div className="RouteNotFound">
			<img src={pageNotFound} alt="page-not-found" />
        </div>
    );
}

export default RouteNotFound;

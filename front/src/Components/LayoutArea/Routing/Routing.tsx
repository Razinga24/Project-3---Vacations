import { Navigate, Route, Routes } from "react-router-dom";
import "./Routing.css";
import Home from "../../HomeArea/Home/Home";
import RouteNotFound from "../RouteNotFound/RouteNotFound";
import Login from "../../AuthArea/AuthMenu/Login/Login";
import Register from "../../AuthArea/AuthMenu/Register/Register";
import Vacations from "../../VacationsArea/Vacations/Vacations";
import AddVacation from "../../VacationsArea/AddVacation/AddVacation";
import EditVacation from "../../VacationsArea/EditVacation/EditVacation";
import VacationsAdmin from "../../VacationsArea/VacationsAdmin/VacationsAdmin";
import VacationsGraph from "../../VacationsArea/VacationsGraph/VacationsGraph";

function Routing(): JSX.Element {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />

            <Route path="/vacations" element={<Vacations />} />
            <Route path="/vacations-graph" element={<VacationsGraph />} />
            <Route path="/vacations-admin" element={<VacationsAdmin />} />
            <Route path="/vacations/add" element={<AddVacation />} />
            <Route path="/vacations/edit/:vacationId" element={<EditVacation />} />            

            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>

            <Route path="*" element={<RouteNotFound />}/>

        </Routes>
    );
}

export default Routing;

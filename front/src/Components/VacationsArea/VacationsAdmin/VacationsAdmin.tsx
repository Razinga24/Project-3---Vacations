import { Pagination, PaginationItem, Stack } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import useVerifyLoggedIn from "../../../Hooks/useVerifyLoggedIn";
import { ChangeEvent, useEffect, useState } from "react";
import VacationModel from "../../../Models/VacationModel";
import vacationService from "../../../Services/VacationsService";
import notifyService from "../../../Services/NotifyService";
import { Link } from "react-router-dom";
import "./VacationsAdmin.css";
import VacationCardAdmin from "../VacationsCardAdmin/VacationsCardAdmin";

function VacationsAdmin(): JSX.Element {

    useVerifyLoggedIn();

    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    useEffect(() => {

        vacationService.getAllVacations()
            .then(vacations => setVacations(vacations))
            .catch(error => notifyService.error(error));

    }, []);

    const totalPageCount = Math.ceil(vacations.length / itemsPerPage);

    const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };


    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedVacations = vacations.slice(startIndex, endIndex);


    const deleteVacation = async (vacationId: number) => {

        try {
            await vacationService.deleteVacation(vacationId);
            setVacations(vacations => vacations.filter(v => v.vacationId !== vacationId));
            notifyService.success("Vacation has been successfully deleted");

        } catch (err: any) {
            notifyService.error(err);
        }

    }

    return (
        <div className="VacationsAdmin">

            <Link to="/vacations/add">➕Add Vacation</Link>

            <div className="cards">
                {displayedVacations.map((v) => (
                    <VacationCardAdmin key={v.vacationId} vacation={v} delVacation={deleteVacation} />
                ))}
            </div>


            <div className="pagination">
                <Stack spacing={2}>
                    <Pagination
                        count={totalPageCount}
                        page={currentPage}
                        onChange={handlePageChange}
                        renderItem={(item) => (
                            <PaginationItem
                                slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                                {...item}
                            />
                        )}
                    />
                </Stack>
            </div>

        </div>
    );
}

export default VacationsAdmin;
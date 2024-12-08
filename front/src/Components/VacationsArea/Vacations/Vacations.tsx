import { Checkbox, Pagination, PaginationItem, Stack } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import useVerifyLoggedIn from "../../../Hooks/useVerifyLoggedIn";
import { ChangeEvent, useEffect, useState } from "react";
import VacationModel from "../../../Models/VacationModel";
import vacationService from "../../../Services/VacationsService";
import notifyService from "../../../Services/NotifyService";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store";
import Loader from "../../ToolsArea/Loader/Loader";
import "./Vacations.css";
import VacationCard from "../VacationsCard/VacationsCard";

function Vacations(): JSX.Element {

    useVerifyLoggedIn();

    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;
    const vacationsArr = useSelector((state: RootState) => state.vacations.vacationsList);
    const [favoriteOnly, setFavoriteOnly] = useState<boolean>(false);
    const [activeOnly, setActiveOnly] = useState<boolean>(false);
    const [notStartedOnly, setNotStartedOnly] = useState<boolean>(false);
    const [totalPageCount, setTotalPageCount] = useState<number>(1);
    const user = useSelector((state: RootState) => state.auth.user);

    // Function to reset other checkboxes when one is selected
    const handleCheckboxChange = (type: string) => {
        switch (type) {
            case "favorite":
                setFavoriteOnly(!favoriteOnly);
                setActiveOnly(false);
                setNotStartedOnly(false);
                break;
            case "active":
                setActiveOnly(!activeOnly);
                setFavoriteOnly(false);
                setNotStartedOnly(false);
                break;
            case "notStarted":
                setNotStartedOnly(!notStartedOnly);
                setFavoriteOnly(false);
                setActiveOnly(false);
                break;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                let fetchedVacations;

                if (favoriteOnly) {
                    fetchedVacations = await vacationService.getAllVacationsByUserId(user?.userId);
                    fetchedVacations = fetchedVacations.filter(v => v.isFollowing);
                } else {
                    fetchedVacations = await vacationService.getAllVacations();
                }

                const filteredVacations = fetchedVacations.filter(v =>
                    (!notStartedOnly || new Date(v.startDate) > new Date()) &&
                    (!activeOnly || (new Date(v.startDate) <= new Date() && new Date(v.endDate) >= new Date()))
                );

                setCurrentPage(1); // Resetting to the first page when filters change
                setVacations(filteredVacations);
                setTotalPageCount(Math.ceil(filteredVacations.length / itemsPerPage));

            } catch (err: any) {
                notifyService.error(err);
            }
        };

        fetchData();
    }, [favoriteOnly, activeOnly, notStartedOnly, user?.userId]);

    const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const displayedVacations = vacations.slice(startIndex, endIndex);

    if (!vacationsArr.length) return <Loader />;

    return (
        <div className="Vacations">
            <div className="inputCss">
                <div>
                    <label>
                        <span>Favorite Vacations</span>
                        <Checkbox
                            onChange={() => handleCheckboxChange("favorite")}
                            checked={favoriteOnly}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        <span>Upcoming Vacations</span>
                        <Checkbox
                            onChange={() => handleCheckboxChange("notStarted")}
                            checked={notStartedOnly}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        <span>Active Vacations</span>
                        <Checkbox
                            onChange={() => handleCheckboxChange("active")}
                            checked={activeOnly}
                        />
                    </label>
                </div>
            </div>
            <br />
            <div className="cards">
                {displayedVacations.map((v) => (
                    <VacationCard key={v.vacationId} vacation={v} />
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

export default Vacations;

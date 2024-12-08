import "./VacationsGraph.css";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from "react";
import { Bar } from 'react-chartjs-2';
import VacationModel from "../../../Models/VacationModel";
import vacationService from "../../../Services/VacationsService";
import notifyService from "../../../Services/NotifyService";
import { CSVLink } from 'react-csv';
import { Box, Button } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function VacationsGraph(): JSX.Element {


    const [vacations, setVacations] = useState<VacationModel[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const vacations = await vacationService.getAllVacations();
                setVacations(vacations);

            } catch (err: any) {
                notifyService.error(err);
            }
        };

        fetchData();
    }, []);

    const labels = vacations.map(vacation => vacation.destination);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Vacation Destinations Bar Chart',
            },
        },
    };

    const data = {
        labels,
        datasets: [
            {
                label: 'Vacations Graph',
                data: vacations.map((v) => v.followersCount),
                backgroundColor: 'navy',
            }
        ],
    };

    return (

        <Box sx={{ display: 'flex' }} className="VacationsGraph">
            <CSVLink
                data={vacations}
                headers={['destination', 'followersCount']}
                filename="vacations.csv"
                target="_blank"
            >
                <div className="graph">
                    <Button size="small" variant="text"> <DownloadIcon /> Download CSV</Button>
                </div>

            </CSVLink>
            <Bar options={options} data={data} />
        </Box>

    );
}

export default VacationsGraph;


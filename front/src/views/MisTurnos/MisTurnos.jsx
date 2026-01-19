import { useEffect, useState } from 'react';
import Turno from '../../components/Turno/Turno';
import Styles from './MisTurnos.module.css';
import axios from 'axios';


export default function MisTurnos({ userId }) {

    const [turnos, setTurnos] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/users/${userId}`)
            .then(({ data }) => {
                const fetchedTurnos = data.data.appointments;

                // 2 Days deadline logic
                const today = new Date();
                today.setHours(0, 0, 0, 0); // Reset time part for accurate date comparison

                const deadline = new Date(today);
                deadline.setDate(today.getDate() - 2); // 2 days ago

                const filteredTurnos = fetchedTurnos.filter(turno => {
                    const turnoDate = new Date(turno.date);
                    // Fix timezone offset issue if date string is simplified (YYYY-MM-DD)
                    // Assuming turno.date is YYYY-MM-DD, parsing it directly might set it to UTC 00:00
                    // which could be previous day in local time. 
                    // Let's create date ensuring we treat it as local date or just compare string parts if consistent.
                    // Safer: add 'T00:00:00' if missing to parse in local time or specific logic.
                    // For simplicity here, relying on standard Date parse, but adding time component to ensure it's treated as local midnight usually helps:
                    const turnoDateSafe = new Date(turno.date + 'T00:00:00');

                    return turnoDateSafe >= deadline;
                });

                // Sort: Newest created first. Assuming higher ID means newer, or sort by date/time
                // If ID is auto-increment, sort by ID desc is safest for "latest created".
                filteredTurnos.sort((a, b) => b.id - a.id);

                setTurnos(filteredTurnos);
            })
            .catch(() => { })
    }, [userId]);

    return (
        <div className={Styles.container}>
            <div className={Styles.title}>
                <h1 >MIS TURNOS</h1>
            </div>
            <div className={Styles.turnosContainer}>

                {
                    turnos.length > 0 ?
                        turnos.map(turno => (
                            <Turno
                                key={turno.id}
                                id={turno.id}
                                date={turno.date}
                                time={turno.time}
                                description={turno.description}
                                status={turno.status}
                                setTurnos={setTurnos}
                            />
                        )
                        ) : (
                            <p>No tienes turnos programados.</p>
                        )
                }

            </div>
        </div>

    )
}
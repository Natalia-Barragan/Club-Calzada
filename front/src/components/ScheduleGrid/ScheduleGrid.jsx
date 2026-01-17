import styles from './ScheduleGrid.module.css';
import Swal from 'sweetalert2';

const HOURS = [
    "14:00", "15:00", "16:00", "17:00", "18:00",
    "19:00", "20:00", "21:00", "22:00", "23:00"
];

// Helper to get dates for the week starting from startDate
const getWeekDates = (startDate) => {
    // If no startDate provided, default to current week's Monday
    let baseDate = startDate ? new Date(startDate) : new Date();

    if (!startDate) {
        const dayOfWeek = baseDate.getDay();
        const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
        baseDate.setDate(baseDate.getDate() + diffToMonday);
    }

    const weekDates = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date(baseDate);
        date.setDate(baseDate.getDate() + i);
        weekDates.push(date);
    }
    return weekDates;
};

const DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

export default function ScheduleGrid({ resourceName, appointments, startDate }) {

    const weekDates = getWeekDates(startDate);

    const handleSlotClick = (appointment) => {
        if (!appointment) return;

        Swal.fire({
            title: 'Detalles de la Reserva',
            html: `
                <div style="text-align: left;">
                    <p><strong>Usuario:</strong> ${appointment.user?.name || 'Desconocido'}</p>
                    <p><strong>DNI:</strong> ${appointment.user?.nDni || 'N/A'}</p>
                    <p><strong>Email:</strong> ${appointment.user?.email || 'N/A'}</p>
                    <p><strong>Fecha:</strong> ${appointment.date}</p>
                    <p><strong>Hora:</strong> ${appointment.time} hs</p>
                    <p><strong>Actividad:</strong> ${appointment.description}</p>
                </div>
            `,
            icon: 'info',
            confirmButtonColor: '#2ecc71',
            customClass: {
                popup: styles.swalPopup,
                title: styles.swalTitle
            }
        });
    };

    // Helper to find appointment for a specific cell
    const getAppointmentForSlot = (dayDate, hour) => {
        const dateString = dayDate.toISOString().split('T')[0];

        return appointments.find(app =>
            app.date === dateString &&
            app.time === hour &&
            app.status !== 'cancelled'
        );
    };

    return (
        <div className={styles.gridContainer}>
            <h3 className={styles.title}>{resourceName}</h3>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Horario</th>
                        {DAYS.map((day, index) => (
                            <th key={day}>
                                {day} <br />
                                <small>{weekDates[index].getDate()}/{weekDates[index].getMonth() + 1}</small>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {HOURS.map(hour => (
                        <tr key={hour}>
                            <td>{hour}</td>
                            {weekDates.map((date, index) => {
                                const appointment = getAppointmentForSlot(date, hour);
                                return (
                                    <td key={index}>
                                        <div
                                            className={`${styles.cell} ${appointment ? styles.occupied : styles.free}`}
                                            onClick={() => appointment && handleSlotClick(appointment)}
                                        >
                                            {appointment ? 'Reservado' : 'Libre'}
                                        </div>
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

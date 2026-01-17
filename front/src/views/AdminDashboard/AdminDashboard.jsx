import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import styles from './AdminDashboard.module.css';
import ScheduleGrid from '../../components/ScheduleGrid/ScheduleGrid';

export default function AdminDashboard() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/appointments`);
                setAppointments(data.data);
            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudieron cargar los turnos',
                });
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filterByResource = (resource) => {
        return appointments.filter(app => app.description === resource);
    };

    if (loading) return <div className={styles.loading}>Cargando panel...</div>;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Panel de Administración - Cronograma Semanal</h1>

            <section className={styles.section}>
                <ScheduleGrid
                    resourceName="Cancha Cubierta"
                    appointments={filterByResource('Cancha Cubierta')}
                />
                <ScheduleGrid
                    resourceName="Cancha Aire Libre 1"
                    appointments={filterByResource('Cancha Aire Libre 1')}
                />
                <ScheduleGrid
                    resourceName="Cancha Aire Libre 2"
                    appointments={filterByResource('Cancha Aire Libre 2')}
                />
                <ScheduleGrid
                    resourceName="Pileta"
                    appointments={filterByResource('Pileta')}
                />
                <ScheduleGrid
                    resourceName="Gimnasio"
                    appointments={filterByResource('Gimnasio')}
                />
            </section>
        </div>
    );
}

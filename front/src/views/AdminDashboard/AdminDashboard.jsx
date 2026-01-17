import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import styles from './AdminDashboard.module.css';

export default function AdminDashboard() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/appointments`);
                setAppointments(data.data);
            } catch (error) {
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

    if (loading) return <div className={styles.loading}>Cargando panel...</div>;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Panel de Administración</h1>

            <section className={styles.section}>
                <h2>Reservas</h2>
                {appointments.length === 0 ? (
                    <p>No hay reservas registradas.</p>
                ) : (
                    <div className={styles.tableResponsive}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Fecha</th>
                                    <th>Hora</th>
                                    <th>Actividad</th>
                                    <th>Usuario</th>
                                    <th>DNI</th>
                                    <th>Email</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.map((app) => (
                                    <tr key={app.id}>
                                        <td>{new Date(app.date).toLocaleDateString()}</td>
                                        <td>{app.time}</td>
                                        <td>{app.description}</td>
                                        <td>{app.user?.name || 'N/A'}</td>
                                        <td>{app.user?.nDni || 'N/A'}</td>
                                        <td>{app.user?.email || 'N/A'}</td>
                                        <td>
                                            <span className={`${styles.status} ${styles[app.status]}`}>
                                                {app.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </div>
    );
}

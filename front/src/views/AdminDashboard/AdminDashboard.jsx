import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import styles from './AdminDashboard.module.css';
import ScheduleGrid from '../../components/ScheduleGrid/ScheduleGrid';

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    // State for Tabs
    const [activeTab, setActiveTab] = useState('Cancha Cubierta');

    // State for Date Navigation
    const [currentDate, setCurrentDate] = useState(new Date());

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

    const handleNextWeek = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() + 7);
        setCurrentDate(newDate);
    };

    const handlePrevWeek = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() - 7);
        setCurrentDate(newDate);
    };

    const RESOURCES = [
        'Cancha Cubierta',
        'Cancha Roja (exterior)',
        'Cancha Verde (exterior)',
        'Pileta',
        'Gimnasio'
    ];

    if (loading) return <div className={styles.loading}>Cargando panel...</div>;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <button className={styles.backButton} onClick={() => navigate('/')}>
                    &larr; Volver al Inicio
                </button>
                <h1 className={styles.title}>Panel de Administración</h1>
                <div style={{ width: '100px' }}></div>
            </div>

            {/* Tabs Navigation */}
            <div className={styles.tabsContainer}>
                {RESOURCES.map(resource => (
                    <button
                        key={resource}
                        className={`${styles.tabButton} ${activeTab === resource ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab(resource)}
                    >
                        {resource}
                    </button>
                ))}
            </div>

            {/* Date Navigation */}
            <div className={styles.dateNavigation}>
                <button onClick={handlePrevWeek} className={styles.navButton}>&larr; Semana Anterior</button>
                <span className={styles.currentDateLabel}>
                    Semana del {currentDate.toLocaleDateString()}
                </span>
                <button onClick={handleNextWeek} className={styles.navButton}>Siguiente Semana &rarr;</button>
            </div>

            <section className={styles.section}>
                <ScheduleGrid
                    resourceName={activeTab}
                    appointments={filterByResource(activeTab)}
                    startDate={currentDate}
                />
            </section>
        </div>
    );
}

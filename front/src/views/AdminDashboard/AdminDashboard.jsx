import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import styles from './AdminDashboard.module.css';
import ScheduleGrid from '../../components/ScheduleGrid/ScheduleGrid';

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // State for Tabs
    const [activeTab, setActiveTab] = useState('Cancha Cubierta');

    // State for Date Navigation
    const [currentDate, setCurrentDate] = useState(new Date());

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const headers = { Authorization: `Bearer ${token}` };

            const [appointmentsRes, usersRes] = await Promise.all([
                axios.get(`${import.meta.env.VITE_API_URL}/appointments`, { headers }),
                axios.get(`${import.meta.env.VITE_API_URL}/users`, { headers })
            ]);
            setAppointments(appointmentsRes.data.data);
            setAllUsers(usersRes.data.data);
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudieron cargar los datos',
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
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
                <button 
                    className={`${styles.tabButton} ${activeTab === 'Socios' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('Socios')}
                >
                    Todos los Socios
                </button>
                <button 
                    className={`${styles.tabButton} ${activeTab === 'Deudores' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('Deudores')}
                >
                    Socios Deudores
                </button>
            </div>

            {(activeTab === 'Socios' || activeTab === 'Deudores') ? (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        {activeTab === 'Socios' ? 'Listado Completo de Socios' : 'Socios con Pagos Pendientes'}
                    </h2>
                    <div className={styles.userList}>
                        <table className={styles.userTable}>
                            <thead>
                                <tr>
                                    <th>Nº Socio</th>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>DNI</th>
                                    <th>Estado Pagos</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allUsers
                                    .filter(user => activeTab === 'Socios' ? true : !user.active)
                                    .slice()
                                    .sort((a, b) => (a.lastName || "").localeCompare(b.lastName || ""))
                                    .map(user => (
                                    <tr key={user.id}>
                                        <td>{user.memberNumber || 'PROV.'}</td>
                                        <td>{user.name}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.nDni}</td>
                                        <td>
                                            <span className={user.active ? styles.statusActive : styles.statusInactive}>
                                                {user.active ? 'AL DÍA' : 'DEUDOR'}
                                            </span>
                                        </td>
                                        <td>
                                            <div className={styles.actionGroup}>
                                                <button 
                                                    className={user.active ? styles.deactivateBtn : styles.activateBtn}
                                                    onClick={() => toggleUserStatus(user)}
                                                    title={user.active ? 'Marcar como Deudor' : 'Marcar como Al Día'}
                                                >
                                                    {user.active ? 'Pasar a Deudor' : 'Pasar a Al Día'}
                                                </button>
                                                <button 
                                                    className={styles.historyBtn}
                                                    onClick={() => handleViewHistory(user)}
                                                >
                                                    Historial
                                                </button>
                                                <button 
                                                    className={styles.addPaymentBtn}
                                                    onClick={() => handleRegisterPayment(user)}
                                                >
                                                    + Pago
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <p style={{ marginTop: '20px', color: '#888', fontSize: '0.9rem' }}>
                            {activeTab === 'Socios' ? 'Nota: Aquí se muestran todos los socios registrados.' : 'Nota: Aquí se muestran solo los socios con mora o sin pago registrado.'}
                        </p>
                    </div>
                </section>
            ) : (
                <>
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
                </>
            )}
        </div>
    );

    // --- Funciones de Gestión Movidas Adentro ---
    async function toggleUserStatus(user) {
        const newStatus = !user.active;
        const token = localStorage.getItem('token');
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/users/${user.id}`, { active: newStatus }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            Swal.fire({
                icon: 'success',
                title: 'Estado actualizado',
                text: `El socio ahora está ${newStatus ? 'al día' : 'en mora'}.`,
                background: '#1E1E1E',
                color: 'white',
                timer: 1500
            }).then(() => fetchData()); // <--- CAMBIO: Refreso silencioso
        } catch (e) {
            Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo actualizar el estado' });
        }
    }

    async function handleViewHistory(user) {
        const token = localStorage.getItem('token');
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/cobros/user/${user.id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const payments = data.data;

            let historyHtml = `
                <div style="text-align: left; max-height: 300px; overflow-y: auto;">
                    <table style="width: 100%; border-collapse: collapse; color: white;">
                        <thead>
                            <tr style="border-bottom: 2px solid #555;">
                                <th style="padding: 10px;">Fecha</th>
                                <th style="padding: 10px;">Mes</th>
                                <th style="padding: 10px;">Monto</th>
                            </tr>
                        </thead>
                        <tbody>
            `;

            if (payments.length === 0) {
                historyHtml += '<tr><td colspan="3" style="padding: 20px; text-align: center;">No hay pagos registrados.</td></tr>';
            } else {
                payments.forEach(p => {
                    historyHtml += `
                        <tr style="border-bottom: 1px solid #444;">
                            <td style="padding: 8px;">${new Date(p.paymentDate).toLocaleDateString()}</td>
                            <td style="padding: 8px;">${p.month}</td>
                            <td style="padding: 8px;">$${p.amount}</td>
                        </tr>
                    `;
                });
            }

            historyHtml += '</tbody></table></div>';

            Swal.fire({
                title: `Historial: ${user.name} ${user.lastName}`,
                html: historyHtml,
                background: '#1a1a1a',
                color: 'white',
                width: '600px',
                confirmButtonColor: '#2ecc71'
            });
        } catch (e) {
            Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo cargar el historial' });
        }
    }

    async function handleRegisterPayment(user) {
        const months = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];
        const currentYear = new Date().getFullYear();
        const years = [currentYear - 1, currentYear, currentYear + 1];
        
        const concepts = [
            'Cuota Mensual',
            'Matrícula',
            'Actividad Deportiva',
            'Pileta',
            'Alquiler de Cancha',
            'Otros'
        ];

        const { value: formValues } = await Swal.fire({
            title: 'Registrar Nuevo Pago',
            background: '#1a1a1a',
            color: 'white',
            html: `
                <div style="display: flex; flex-direction: column; gap: 15px; text-align: left; padding: 10px;">
                    <div style="display: flex; gap: 10px;">
                        <div style="flex: 1;">
                            <label style="font-size: 0.85rem; color: #aaa;">Mes:</label>
                            <select id="swal-month" class="swal2-input" style="margin: 5px 0; width: 100%; font-size: 0.95rem;">
                                ${months.map(m => `<option value="${m}" ${m === months[new Date().getMonth()] ? 'selected' : ''}>${m}</option>`).join('')}
                            </select>
                        </div>
                        <div style="flex: 1;">
                            <label style="font-size: 0.85rem; color: #aaa;">Año:</label>
                            <select id="swal-year" class="swal2-input" style="margin: 5px 0; width: 100%; font-size: 0.95rem;">
                                ${years.map(y => `<option value="${y}" ${y === currentYear ? 'selected' : ''}>${y}</option>`).join('')}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label style="font-size: 0.85rem; color: #aaa;">Concepto:</label>
                        <select id="swal-concept" class="swal2-input" style="margin: 5px 0; width: 100%; font-size: 0.95rem;">
                            ${concepts.map(c => `<option value="${c}">${c}</option>`).join('')}
                        </select>
                    </div>

                    <div>
                        <label style="font-size: 0.85rem; color: #aaa;">Monto ($):</label>
                        <input id="swal-amount" type="number" class="swal2-input" placeholder="0.00" style="margin: 5px 0; width: 100%; font-size: 0.95rem;">
                    </div>
                </div>
            `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Registrar Pago',
            confirmButtonColor: '#2ecc71',
            cancelButtonText: 'Cancelar',
            preConfirm: () => {
                const month = document.getElementById('swal-month').value;
                const year = document.getElementById('swal-year').value;
                const amount = document.getElementById('swal-amount').value;
                const concept = document.getElementById('swal-concept').value;
                
                if (!amount || amount <= 0) {
                    Swal.showValidationMessage('Por favor ingresá un monto válido');
                    return false;
                }
                
                return { 
                    userId: user.id, 
                    month: `${month} ${year}`, 
                    amount: parseFloat(amount), 
                    concept 
                };
            }
        });

        if (formValues) {
            const token = localStorage.getItem('token');
            try {
                await axios.post(`${import.meta.env.VITE_API_URL}/cobros`, formValues, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                Swal.fire({
                    icon: 'success',
                    title: 'Pago registrado',
                    text: 'El socio ha sido activado y el pago quedó asentado en su historial.',
                    background: '#1a1a1a',
                    color: 'white',
                    timer: 2000
                }).then(() => fetchData()); // <--- CAMBIO: Refreso silencioso
            } catch (e) {
                Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo registrar el pago' });
            }
        }
    }
}

import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import Swal from 'sweetalert2';
import styles from './UserProfile.module.css';

const UserProfile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            // Fetch fresh data from backend
            axios.get(`${import.meta.env.VITE_API_URL}/users/${parsedUser.id}`)
                .then(res => {
                    setUser(res.data.data);
                })
                .catch(err => console.error(err));
        }
    }, []);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: user?.name || '',
            email: user?.email || '',
            nDni: user?.nDni || '',
            birthdate: user?.birthdate ? new Date(user.birthdate).toISOString().split('T')[0] : ''
        },
        validate: (values) => {
            const errors = {};
            if (!values.name) errors.name = 'Requerido';
            if (!values.email) errors.email = 'Requerido';
            else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) errors.email = 'Email inválido';
            if (!values.nDni) errors.nDni = 'Requerido';
            if (!values.birthdate) errors.birthdate = 'Requerido';
            return errors;
        },
        onSubmit: (values) => {
            if (!user) return;

            axios.put(`${import.meta.env.VITE_API_URL}/users/${user.id}`, values)
                .then(res => {
                    // Update local storage if needed, or just state
                    const updatedUser = { ...user, ...res.data.data };
                    setUser(updatedUser);
                    localStorage.setItem('user', JSON.stringify(updatedUser));

                    Swal.fire({
                        icon: 'success',
                        title: 'Perfil Actualizado',
                        text: 'Tus datos se han guardado correctamente.',
                        background: '#1E1E1E',
                        color: 'white',
                        confirmButtonColor: '#eebb13'
                    });
                })
                .catch(err => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'No se pudo actualizar el perfil.',
                        background: '#1E1E1E',
                        color: 'white'
                    });
                });
        }
    });

    if (!user) return <div className={styles.container}><p style={{ color: 'white' }}>Cargando perfil...</p></div>;

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>MI PERFIL</h1>
                <form className={styles.form} onSubmit={formik.handleSubmit}>
                    <div className={styles.field}>
                        <label className={styles.label}>Nombre Completo</label>
                        <input
                            type="text"
                            name="name"
                            className={styles.input}
                            onChange={formik.handleChange}
                            value={formik.values.name}
                        />
                        {formik.errors.name && <p className={styles.error}>{formik.errors.name}</p>}
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>Email</label>
                        <input
                            type="email"
                            name="email"
                            className={styles.input}
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                        {formik.errors.email && <p className={styles.error}>{formik.errors.email}</p>}
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>DNI</label>
                        <input
                            type="number"
                            name="nDni"
                            className={styles.input}
                            onChange={formik.handleChange}
                            value={formik.values.nDni}
                        />
                        {formik.errors.nDni && <p className={styles.error}>{formik.errors.nDni}</p>}
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>Fecha de Nacimiento</label>
                        <input
                            type="date"
                            name="birthdate"
                            className={styles.input}
                            onChange={formik.handleChange}
                            value={formik.values.birthdate}
                        />
                        {formik.errors.birthdate && <p className={styles.error}>{formik.errors.birthdate}</p>}
                    </div>

                    <button type="submit" className={styles.button}>
                        Guardar Cambios
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserProfile;

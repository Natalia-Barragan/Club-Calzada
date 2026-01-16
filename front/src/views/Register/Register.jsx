
import styles from './Register.module.css';
import { useFormik } from 'formik';
import { registerFormValidate } from '../../helpers/formValidate';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function Register() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: '',
            nDni: '',
            birthdate: '',
            email: '',
            username: '',
            password: ''
        },
        initialErrors: {
            name: '',
            nDni: '',
            birthdate: '',
            email: '',
            username: '',
            password: ''
        },
        validate: registerFormValidate,
        onSubmit: (values) => {
            axios.post(`${import.meta.env.VITE_API_URL}/users/register`, values)
                .then(res => {
                    if (res.status === 201) {
                        Swal.fire({
                            title: '¡Usuario Registrado!',
                            text: 'Bienvenido a Club Calzada',
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 2000,
                            customClass: {
                                popup: styles.swalPopup,
                                title: styles.swalTitle,
                                htmlContainer: styles.swalText
                            }
                        });
                        navigate('/login');
                    }
                })
                .catch((err) => {
                    let errorMsg = "Error al registrar usuario";

                    if (err.response?.data?.error) {
                        if (err.response.data.error.includes('email')) {
                            errorMsg = `El email ${formik.values.email} ya está registrado.`;
                        } else if (err.response.data.error.includes('usuario')) {
                            errorMsg = `El usuario ${formik.values.username} ya existe.`;
                        } else if (err.response.data.error.includes('nDni')) {
                            errorMsg = `El DNI ${formik.values.nDni} ya está registrado.`;
                        } else {
                            errorMsg = err.response.data.error;
                        }
                    }

                    Swal.fire({
                        icon: 'error',
                        title: 'Error de Registro',
                        text: errorMsg,
                        confirmButtonColor: "#2ecc71",
                        customClass: {
                            popup: styles.swalPopup,
                            title: styles.swalTitle,
                            htmlContainer: styles.swalText
                        }
                    });
                })
        },
        validateOnChange: true,
        validateOnBlur: true,
    })

    return (
        <div className={styles.registerContainer}>
            <div className={styles.registerCard}>
                <h1 className={styles.title}>Crear Cuenta</h1>

                <form className={styles.form} onSubmit={formik.handleSubmit}>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Nombre Completo</label>
                        <input
                            className={styles.input}
                            type="text"
                            name="name"
                            placeholder="Ej: Juan Pérez"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                        />
                        {formik.touched.name && formik.errors.name && (
                            <span className={styles.error}>{formik.errors.name}</span>
                        )}
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>DNI</label>
                        <input
                            className={styles.input}
                            type="number"
                            name="nDni"
                            placeholder="Sin puntos"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.nDni}
                        />
                        {formik.touched.nDni && formik.errors.nDni && (
                            <span className={styles.error}>{formik.errors.nDni}</span>
                        )}
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Fecha de Nacimiento</label>
                        <input
                            className={styles.input}
                            type="date"
                            name="birthdate"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.birthdate}
                        />
                        {formik.touched.birthdate && formik.errors.birthdate && (
                            <span className={styles.error}>{formik.errors.birthdate}</span>
                        )}
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Email</label>
                        <input
                            className={styles.input}
                            type="email"
                            name="email"
                            placeholder="tu@email.com"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <span className={styles.error}>{formik.errors.email}</span>
                        )}
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Usuario</label>
                        <input
                            className={styles.input}
                            type="text"
                            name="username"
                            placeholder="Elige un nombre de usuario"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}
                        />
                        {formik.touched.username && formik.errors.username && (
                            <span className={styles.error}>{formik.errors.username}</span>
                        )}
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Contraseña</label>
                        <input
                            className={styles.input}
                            type="password"
                            name="password"
                            placeholder="Mínimo 8 caracteres"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                        {formik.touched.password && formik.errors.password && (
                            <span className={styles.error}>{formik.errors.password}</span>
                        )}
                    </div>

                    <button className={styles.button} type="submit" disabled={!(formik.isValid && formik.dirty)}>
                        REGISTRARME
                    </button>

                    <div className={`${styles.footer} ${styles.fullWidth}`}>
                        ¿Ya tienes cuenta? <Link to="/login" className={styles.link}>Inicia Sesión</Link>
                    </div>

                </form>
            </div>
        </div>
    );
}
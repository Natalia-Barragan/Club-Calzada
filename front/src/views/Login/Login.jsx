
import styles from './Login.module.css';
import { useFormik } from 'formik';
import { loginFormValidate } from '../../helpers/formValidate';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validate: loginFormValidate,
    onSubmit: (values) => {
      // Logic unchanged, just verifying if endpoints match. 
      // Assumption: backend is configured via env var
      axios.post(`${import.meta.env.VITE_API_URL}/users/login`, values)
        .then(res => {
          if (res.status === 200) {
            localStorage.setItem('user', JSON.stringify(res.data.user))

            Swal.fire({
              title: `¡Bienvenido!`,
              text: 'Has iniciado sesión correctamente',
              icon: 'success',
              timer: 1500,
              showConfirmButton: false,
              customClass: {
                popup: styles.swalPopup,
                title: styles.swalTitle,
                htmlContainer: styles.swalText
              }
            });

            navigate('/');
          }
        })
        .catch(err => {
          const errorMsg = err?.response?.data?.error || err?.response?.data?.message || "Error al iniciar sesión";
          Swal.fire({
            icon: 'error',
            title: 'Error de Acceso',
            text: errorMsg,
            showConfirmButton: true,
            confirmButtonColor: '#2ecc71',
            customClass: {
              popup: styles.swalPopup,
              title: styles.swalTitle,
              htmlContainer: styles.swalText
            }
          });
        });
    },
    validateOnChange: true,
    validateOnBlur: true
  });

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <h1 className={styles.title}>Iniciar Sesión</h1>

        <form className={styles.form} onSubmit={formik.handleSubmit}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Usuario</label>
            <input
              className={styles.input}
              type="text"
              name="username"
              placeholder="Tu nombre de usuario"
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
              placeholder="Tu contraseña"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <span className={styles.error}>{formik.errors.password}</span>
            )}
          </div>

          <button
            className={styles.button}
            type="submit"
            disabled={!(formik.isValid && formik.dirty)}
          >
            INGRESAR
          </button>

          <div className={styles.footer}>
            ¿No tienes cuenta? <Link to="/register" className={styles.link}>Regístrate</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

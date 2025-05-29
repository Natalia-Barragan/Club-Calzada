
import styles from './Login.module.css';
import { useFormik } from 'formik';
import { loginFormValidate } from '../../helpers/formValidate';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function Login() {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validate: loginFormValidate,
    onSubmit: (values) => {
      axios.post('http://localhost:3000/users/login', values)
        .then(res => {
            if(res.status === 200){
            Swal.fire({
                title: '¡Bienvenido!',
                text: 'Inicio de sesión exitoso',
                icon: 'success'
            });
            }
        })
        .catch(err => {
          const errorMsg = err?.response?.data?.error || err?.response?.data?.message || "Error al iniciar sesión";
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: errorMsg
          });
        });
    },
    validateOnChange: true,
    validateOnBlur: true
  });

  return (
    <form className={styles.loginForm} onSubmit={formik.handleSubmit}>
      <h1 className={styles.title}>Iniciar Sesión</h1>

      <div>
        <label className={styles.label}>USUARIO:</label>
        <input
          className={styles.input}
          type="text"
          name="username"
          placeholder="Ingrese su username"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />
        {formik.touched.username && formik.errors.username && (
          <label className={styles.error}>{formik.errors.username}</label>
        )}
      </div>

      <div>
        <label className={styles.label}>CONTRASEÑA:</label>
        <input
          className={styles.input}
          type="password"
          name="password"
          placeholder="Ingrese su contraseña"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password && (
          <label className={styles.error}>{formik.errors.password}</label>
        )}
      </div>

      <button
        className={styles.button}
        type="submit"
        disabled={!(formik.isValid && formik.dirty)}
      >
        INGRESAR
      </button>
    </form>
  );
}


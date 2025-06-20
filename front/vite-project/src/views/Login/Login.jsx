
import styles from './Login.module.css';
import { useFormik } from 'formik';
import { loginFormValidate } from '../../helpers/formValidate';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function Login() {

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validate: loginFormValidate,
    onSubmit: (values) => {
      const userJson = localStorage.getItem('user');
      const user = userJson ? JSON.parse(userJson) : null;
      const nombre = user ? user.nombre : values.username;

      axios.post('http://localhost:3000/users/login', values)
        .then(res => {
            if(res.status === 200){
              localStorage.setItem('user', JSON.stringify(res.data.user))
                
                Swal.fire({
                  title: `¡Bienvenido ${nombre}!`,
                  icon: 'success',
                  timer: 1300,
                  showConfirmButton: false,
                  customClass: {
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
            title: 'Error',
            text: errorMsg,
            showConfirmButton: false,
            timer: 1300,
            customClass: {
              title: styles.swalTitle,  
              text: styles.swalText                              
            }            
          });
        });
    },
    validateOnChange: true,
    validateOnBlur: true
  });

  return (
    <form className={styles.loginForm} onSubmit={formik.handleSubmit}>
      <h1 className={styles.title}>INICIAR SESIÓN</h1>

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

      <div className={styles.registerLink}>
        <p>¿No estas registrado? <a href="/register">REGISTRARSE</a></p>
      </div>
    </form>
  );
}


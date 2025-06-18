import styles from '../Navbar/Navbar.module.css';
import logo from '../../assets/logo.jpg';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';


const Navbar = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

    useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);
    }
  }, []);

  const handlerLogOut = () => {
    const user = localStorage.getItem('user');

    if (!user) {
      // No hay usuario logueado, podés omitir todo o mostrar un alert distinto si querés
      return;
    }

    Swal.fire({
      icon: 'warning',
      title: 'Atención',
      text: 'Sesión cerrada correctamente.',
    }).then(() => {
      localStorage.removeItem('user');
      navigate("/login");
    });
     
  };

  return (
    <nav className={styles.navbar}>
      <img className={styles.logo} src={logo} alt="logo" />
      <ul className={styles.navLinks}>
        <li>
          <Link to="/" className={`${styles.link} ${location.pathname === '/' ? styles.active : ''}`}>INICIO</Link>
        </li>
        <li>
          <Link to="/agendarTurno" className={`${styles.link} ${location.pathname === '/agendarTurno' ? styles.active : ''}`}>AGENDAR TURNO</Link>
        </li>
        <li>
          <Link to="/misTurnos" className={`${styles.link} ${location.pathname === '/misTurnos' ? styles.active : ''}`}>MIS TURNOS</Link>
        </li>
        <li>
          <Link to="/register" className={`${styles.link} ${location.pathname === '/register' ? styles.active : ''}`}>REGISTRARSE</Link>
        </li>
        <li>
          <Link to="/login" className={`${styles.link} ${styles.cta} ${location.pathname === '/login' ? styles.active : ''}`}>INGRESAR</Link>
        </li>
        <li>
          <Link className={`${styles.link} ${styles.logoutBtn}`} onClick={handlerLogOut}>SALIR</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;




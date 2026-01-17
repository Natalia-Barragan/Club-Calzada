import styles from './Navbar.module.css';
import logo from '../../assets/logo.jpg';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

const Navbar = ({ user, setUser }) => {

  const navigate = useNavigate();
  const location = useLocation();

  const handlerLogOut = () => {
    const storedUser = localStorage.getItem('user');

    if (!storedUser) {
      return;
    }

    Swal.fire({
      icon: 'success',
      title: 'Cerraste sesión',
      text: '¡Hasta pronto!',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#0f8940',
      showCloseButton: false,
      customClass: {
        popup: styles.swalPopup,
        title: styles.swalTitle,
        htmlContainer: styles.swalText
      }
    }).then(() => {
      localStorage.removeItem('user');
      setUser(null);
      navigate("/login");
    });

  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <img className={styles.logo} src={logo} alt="Club Calzada" />
        <span className={styles.title}>Club Calzada</span>
      </div>

      <ul className={styles.navLinks}>
        {user && (
          <>
            <li>
              <Link to="/" className={`${styles.link} ${location.pathname === '/' ? styles.active : ''}`}>Inicio</Link>
            </li>
            <li>
              <Link to="/agendarTurno" className={`${styles.link} ${location.pathname === '/agendarTurno' ? styles.active : ''}`}>Reservar</Link>
            </li>
            <li>
              <Link to="/misTurnos" className={`${styles.link} ${location.pathname === '/misTurnos' ? styles.active : ''}`}>Mis Turnos</Link>
            </li>
            {user.role === 'admin' && (
              <li>
                <Link to="/admin" className={`${styles.link} ${location.pathname === '/admin' ? styles.active : ''}`}>Admin</Link>
              </li>
            )}
          </>
        )}
      </ul>

      <div className={styles.actions}>
        {user ? (
          <>
            <span className={styles.userWelcome}>{user.name}</span>
            <button onClick={handlerLogOut} className={styles.logoutBtn}>Salir</button>
          </>
        ) : (
          <>
            <Link to="/register" className={styles.registerLink}>Registrarse</Link>
            <Link to="/login" className={styles.loginBtn}>Ingresar</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

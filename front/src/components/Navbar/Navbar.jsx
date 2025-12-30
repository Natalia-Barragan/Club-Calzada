import styles from '../Navbar/Navbar.module.css';
import logo from '../../assets/logo.jpg';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';



const Navbar = ({ user, setUser}) => {

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
      <img className={styles.logo} src={logo} alt="logo" />
      <ul className={styles.navLinks}>

        {!user && (
          <>
            <li>
              <Link to="/register" className={`${styles.link} ${location.pathname === '/register' ? styles.active : ''}`}>REGISTRARSE</Link>
            </li>
            <li>
              <Link to="/login" className={`${styles.link} ${styles.cta} ${location.pathname === '/login' ? styles.active : ''}`}>INGRESAR</Link>
            </li>
          </>
        )}
        { user &&(
          <>    
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
              <Link className={`${styles.link} ${styles.logoutBtn}`} onClick={handlerLogOut}>SALIR</Link>
            </li>
          </>   
        )}
      </ul>
    </nav>
  );
};

export default Navbar;




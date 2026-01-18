import { useState } from 'react';
import styles from './Navbar.module.css';
import logo from '../../assets/logo.jpg';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

const Navbar = ({ user, setUser }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

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

      <button className={styles.hamburger} onClick={toggleMenu} aria-label="Menu">
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </button>

      <ul className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`}>
        {user && (
          <>
            <li>
              <Link to="/" onClick={closeMenu} className={`${styles.link} ${location.pathname === '/' ? styles.active : ''}`}>Inicio</Link>
            </li>
            <li>
              <Link to="/agendarTurno" onClick={closeMenu} className={`${styles.link} ${location.pathname === '/agendarTurno' ? styles.active : ''}`}>Reservar</Link>
            </li>
            <li>
              <Link to="/misTurnos" onClick={closeMenu} className={`${styles.link} ${location.pathname === '/misTurnos' ? styles.active : ''}`}>Mis Turnos</Link>
            </li>
            {user.role === 'admin' && (
              <li>
                <Link to="/admin" onClick={closeMenu} className={`${styles.link} ${location.pathname === '/admin' ? styles.active : ''}`}>Admin</Link>
              </li>
            )}

            {/* Mobile Actions (moved here for mobile view) */}
            <li className={styles.mobileActions}>
              <span className={styles.userWelcome}>{user.name}</span>
              <button onClick={handlerLogOut} className={styles.logoutBtn}>Salir</button>
            </li>
          </>
        )}

        {!user && (
          <li className={styles.mobileActions}>
            <Link to="/register" onClick={closeMenu} className={styles.registerLink}>Registrarse</Link>
            <Link to="/login" onClick={closeMenu} className={styles.loginBtn}>Ingresar</Link>
          </li>
        )}
      </ul>


      <div className={styles.desktopActions}>
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

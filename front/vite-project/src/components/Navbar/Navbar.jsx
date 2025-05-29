import styles from '../Navbar/Navbar.module.css';
import logo from '../../assets/logo.jpg';
const Navbar = () => {
    return(
        <nav className={styles.navbar}>
            <img className={styles.logo} src={logo} alt="logo"></img>
            <ul className={styles.navLinks}>
                <li><a href="#home">Inicio</a></li>
                <li><a href="#reservas">Reservas</a></li>
                <li><a href="#contacto">Contacto</a></li>
                <li><a href="#login" className={styles.cta}>Ingresar</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;
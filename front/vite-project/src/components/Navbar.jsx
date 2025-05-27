import styles from '../components/Navbar/Navbar.module.css';
const Navbar = () => {
    return(
        <nav className={styles.navbar}>
            <ul>
                <li className="nav-item">
                    <a className="nav-link" href="/">Home</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/about">My appointments</a>     
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/contact">Contact</a>        
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
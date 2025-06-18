import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

function NotFound() {
    return (
        <div className={styles.container}>
            <h1>404</h1>
            <p className={styles.title}>Página no encontrada</p>
            <Link to="/" className={styles.link}>VOLVER AL INICIO</Link>
        </div>
    );
};

export default NotFound;
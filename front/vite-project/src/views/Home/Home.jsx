import styles from "./Home.module.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div >
         <h1 className={styles.title}> BIENVENIDO AL CLUB CALZADA </h1>

         <h3>¿Querés <Link to="/agendarTurno" className={styles.link}> Agendar un turno </Link>
         ahora?</h3>
    </div>
  );
};

export default Home;
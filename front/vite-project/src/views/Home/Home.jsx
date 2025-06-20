import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import logoAlmanaque from "../../assets/logoAlmanaque.jpg";

const Home = () => {
  const userJson = localStorage.getItem('user');
  const user = userJson ? JSON.parse(userJson) : null;
  return (
    <div >
        <h1 className={styles.title}> BIENVENIDO {(user.name).toUpperCase()} AL CLUB CALZADA </h1>

        <div className={styles.container}>               
     
          <Link to="/agendarTurno" className={styles.almanaque}>
            <img className={styles.img} src={logoAlmanaque} alt="almanaque" />
          </Link>

        </div>               
        
    </div>
  );
};

export default Home;
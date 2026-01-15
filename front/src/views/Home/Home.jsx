import styles from "./Home.module.css";
import { Link } from "react-router-dom";
// Assuming you might want to use icons, but let's stick to simple text/emoji for now if no icons installed
// or check package.json for react-icons. It was in package.json!
import { FaFutbol, FaDumbbell, FaTableTennis, FaSwimmingPool } from 'react-icons/fa';

const Home = () => {
  const userJson = localStorage.getItem('user');
  const user = userJson ? JSON.parse(userJson) : null;

  return (
    <div className={styles.homeContainer}>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Club Calzada</h1>
        <p className={styles.heroSubtitle}>
          {user ? `¡Hola, ${user.name}! ` : ''}
          Excelencia deportiva y pasión en cada disciplina. Únete a la comunidad más grande del barrio.
        </p>
        <Link to="/agendarTurno" className={styles.ctaButton}>
          Reservar Cancha
        </Link>
      </section>

      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>Nuestras Actividades</h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <FaFutbol className={styles.cardIcon} />
            <h3 className={styles.cardTitle}>Fútbol 5</h3>
            <p className={styles.cardText}>Canchas de césped sintético de última generación.</p>
          </div>
          <div className={styles.card}>
            <FaDumbbell className={styles.cardIcon} />
            <h3 className={styles.cardTitle}>Gimnasio</h3>
            <p className={styles.cardText}>Equipamiento moderno y entrenadores calificados.</p>
          </div>

          <div className={styles.card}>
            <FaSwimmingPool className={styles.cardIcon} />
            <h3 className={styles.cardTitle}>Natación</h3>
            <p className={styles.cardText}>Pileta climatizada para todas las edades.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
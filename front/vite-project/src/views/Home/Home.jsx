import Navbar from "../../components/Navbar/Navbar";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div >
         <Navbar />
         <h1 className={styles.title}> BIENVENIDO AL CLUB CALZADA </h1>
    </div>
  );
};

export default Home;
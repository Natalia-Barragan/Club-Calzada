import Navbar from "../components/Navbar";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <>
        <h1 className={styles.title}> HOME </h1>
        <Navbar />
    </>
  );
};

export default Home;
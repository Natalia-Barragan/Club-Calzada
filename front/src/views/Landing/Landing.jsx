import React from 'react';
import styles from './Landing.module.css';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
    const navigate = useNavigate();

    return (
        <div className={styles.landingContainer}>
            <div className={styles.landingCard}>
                <h1 className={styles.title}>CLUB CALZADA</h1>

                <button
                    className={styles.button}
                    onClick={() => navigate('/login')}
                >
                    INICIAR SESIÓN
                </button>
            </div>
        </div>
    );
}

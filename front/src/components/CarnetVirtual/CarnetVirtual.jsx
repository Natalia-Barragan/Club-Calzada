import { useRef } from 'react';
import styles from './CarnetVirtual.module.css';
import logoFondo from '../../assets/logo-fondo.png';
import html2canvas from 'html2canvas';
import { LuDownload } from "react-icons/lu";

const CarnetVirtual = ({ user }) => {
  const cardRef = useRef(null);

  if (!user) return null;

  const downloadCard = () => {
    if (cardRef.current) {
        html2canvas(cardRef.current, {
            useCORS: true, 
            scale: 2, // Mejora la calidad de la descarga
            backgroundColor: null // Mantiene transparencia de los bordes redondeados si la hay
        }).then(canvas => {
            const link = document.createElement('a');
            link.download = `Carnet_${user.name}_${user.lastName}.png`;
            link.href = canvas.toDataURL();
            link.click();
        });
    }
  };


  return (
    <div className={styles.carnetContainer}>
      <div className={styles.card} ref={cardRef}>
        <div className={styles.watermark}>
          <img src={logoFondo} alt="watermark" />
        </div>
        <div className={styles.cardBody}>
          <div className={styles.header}>
            <div className={styles.logo}>
              <span className={styles.logoSubtext}>CLUB ATLÉTICO Y SOCIAL</span>
              <span className={styles.logoText}>VILLA CALZADA</span>
            </div>
            <div className={`${styles.memberStatus} ${!user.active ? styles.inactive : ''}`}>
              {user.active ? 'SOCIO ACTIVO' : 'SOCIO INACTIVO'}
            </div>
          </div>

          <div className={styles.content}>
            <div className={styles.photoSection}>
              <div className={styles.photoContainer}>
                <img 
                  src={user.photoUrl || "https://www.freeiconspng.com/uploads/user-icon-png-person-user-profile-icon-20.png"} 
                  alt="Foto de perfil" 
                  className={styles.photo}
                />
              </div>
              <div className={styles.memberNumber}>
                <span className={styles.label}>Nº SOCIO</span>
                <span className={styles.value}>{user.memberNumber || 'PROVISORIO'}</span>
              </div>
            </div>

            <div className={styles.infoSection}>
              <div className={styles.infoGroup}>
                <span className={styles.label}>NOMBRE</span>
                <span className={styles.value}>{user.name.toUpperCase()}</span>
              </div>
              <div className={styles.infoGroup}>
                <span className={styles.label}>APELLIDO</span>
                <span className={styles.value}>{(user.lastName || '').toUpperCase()}</span>
              </div>
              <div className={styles.infoGroup}>
                <span className={styles.label}>DNI</span>
                <span className={styles.value}>{user.nDni}</span>
              </div>
            </div>
          </div>

          <div className={styles.footer}>
            <div className={styles.since}>DESDE {new Date(user.createdAt || Date.now()).getFullYear()}</div>
          </div>
        </div>
        <div className={styles.cardGlow}></div>
      </div>
      <button className={styles.downloadButton} onClick={downloadCard}>
        <LuDownload /> Descargar Carnet
      </button>
    </div>
  );
};

export default CarnetVirtual;

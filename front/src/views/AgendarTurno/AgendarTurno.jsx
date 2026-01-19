import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { dateTimeValidate } from '../../helpers/formValidate';
import axios from 'axios';
import Swal from 'sweetalert2';
import styles from '../AgendarTurno/AgendarTurno.module.css';
import pelotaImg from '../../assets/pelota2.gif';

const AgendarTurno = () => {

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      date: '',
      time: '',
      activity: 'Cancha', // Default category
      subOption: 'Cancha Cubierta' // Default specific option
    },
    initialErrors: {
      date: 'Campo requerido',
      time: 'Campo requerido'
    },
    validate: dateTimeValidate,
    onSubmit: (values) => {
      const userJson = localStorage.getItem('user');
      const user = JSON.parse(userJson);

      // Determine the final description based on activity
      let finalDescription = values.activity;
      if (values.activity === 'Cancha') {
        finalDescription = values.subOption;
      }

      const schedule = {
        date: values.date,
        time: values.time,
        description: finalDescription,
        userId: user.id
      };

      axios.post(`${import.meta.env.VITE_API_URL}/appointments/schedule`, schedule)
        .then(res => {
          if (res.status === 201) {
            Swal.fire({
              title: `¡RESERVA CONFIRMADA!\n${finalDescription}`,
              color: "white",
              background: "#1E1E1E",
              showConfirmButton: false,
              timer: 3000,
              backdrop: `rgba(0, 0, 0, 0.4)
                            url("${pelotaImg}")
                            center 
                            no-repeat
                          `,
              customClass: {
                title: styles.swalTitle,
              }
            }).then(() => {
              navigate('/');
            });
            formik.resetForm();
          }
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error al reservar',
            text: err.response?.data?.message || 'Inténtalo de nuevo',
            background: "#1E1E1E",
            color: "white"
          });
        });
    }
  })

  return (
    <div className={styles.agendarContainer}>
      <h1 className={styles.pageTitle}>AGENDAR TURNO</h1>

      <div className={styles.agendarCard}>
        <form className={styles.form} onSubmit={formik.handleSubmit}>

          {/* Activity Selector */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="activity">ACTIVIDAD</label>
            <select
              id="activity"
              name="activity"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.activity}
              className={styles.select}
            >
              <option value="Cancha">Canchas</option>
              <option value="Pileta">Pileta</option>
              <option value="Gimnasio">Gimnasio</option>
            </select>
          </div>

          {/* Sub-Option for Canchas */}
          {formik.values.activity === 'Cancha' && (
            <div className={styles.field}>
              <label className={styles.label} htmlFor="subOption">TIPO DE CANCHA</label>
              <select
                id="subOption"
                name="subOption"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.subOption}
                className={styles.select}
              >
                <option value="Cancha Cubierta">Cancha Cubierta</option>
                <option value="Cancha Roja (exterior)">Cancha Roja (exterior)</option>
                <option value="Cancha Verde (exterior)">Cancha Verde (exterior)</option>
              </select>
            </div>
          )}

          <div className={styles.field}>
            <label className={styles.label} htmlFor="date">FECHA</label>
            <input
              id="date"
              type="date"
              name="date"
              min={new Date().toISOString().split('T')[0]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.date}
              className={styles.input}
            />
            {formik.errors.date && (
              <p className={styles.error}>{formik.errors.date}</p>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="time">HORA</label>
            <input
              id="time"
              type="time"
              name="time"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.time}
              className={styles.input}
            />
            {formik.errors.time && (
              <p className={styles.error}>{formik.errors.time}</p>
            )}
          </div>

          <button
            type="submit"
            className={styles.button}
            disabled={Object.keys(formik.errors).length > 0}
          >
            CONFIRMAR RESERVA
          </button>
        </form>
      </div>
    </div>
  )

}

export default AgendarTurno;
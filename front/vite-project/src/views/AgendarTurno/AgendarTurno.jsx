import { useFormik } from 'formik';  
import { dateTimeValidate } from '../../helpers/formValidate';
import axios from 'axios';
import Swal from 'sweetalert2';
import styles from '../AgendarTurno/AgendarTurno.module.css';
import pelotaImg from '../../assets/pelota2.gif';


const AgendarTurno = () => {

    const formik = useFormik({

        initialValues: {
            date: '',
            time: ''
        },
        initialErrors: {
            date: 'Campo requerido',
            time: 'Campo requerido'
        },
        validate: dateTimeValidate,
        onSubmit: (values) => {
            const userJson = localStorage.getItem('user');
            const user = JSON.parse(userJson);
            const schedule = { ...values, userId: user.id };
            console.log(schedule);
            axios.post(`http://localhost:3000/appointments/schedule`, schedule)
                .then(res => {
                    if (res.status === 201) {
                        Swal.fire({
                          
                          title: "¡YA RESERVAMOS TU CANCHA!",
                          // padding: "3em",
                          color: "white",
                          background: "transparent",
                          showConfirmButton: false,
                          timer: 2500,
                        
                          backdrop: `rgba(15, 137, 64, 0.3)
                            url("${pelotaImg}")
                            center 
                            no-repeat
                          `,
                          customClass: {
                            title: styles.swalTitle,
                          }   


                        });
                      formik.resetForm();
                    }
                });
        }
    })

    return (
        <div>
            <h1>AGENDAR TURNO</h1>

            <form className={styles.form} onSubmit={formik.handleSubmit}>
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
    AGENDAR
  </button>
</form>

        </div>
    )
    
}

export default AgendarTurno
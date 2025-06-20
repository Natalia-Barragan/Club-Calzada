import Swal from 'sweetalert2';
import axios from 'axios';
import Style from './Turno.module.css';

function Turno({ id, date, time, status, setTurnos }) {
  const handlerCancel = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      icon: 'question',
      showCancelButton: true,      
      confirmButtonColor: "#0f8940",
      cancelButtonColor: "#d32828cf",
      confirmButtonText: 'Cancelar',
      cancelButtonText: 'No, mantener',
      customClass: {
        title: Style.swalTitle,
      }
      
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.put(`http://localhost:3000/appointments/cancel/${id}`);

          setTurnos(prev =>
            prev.map(t => t.id === id ? { ...t, status: 'cancelled' } : t)
          );

          Swal.fire({
            icon: 'success',
            title: 'Turno cancelado',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              title: Style.swalTitle,
            }
          });
        } catch {
          Swal.fire('Error', 'No se pudo cancelar el turno.', 'error', {
            customClass: {
              title: Style.swalTitle,
            }
          });
        }
      }
    });
  };

  return (
    <div className={Style.turnoContainer}>
      <h1 className={Style.title}>Turno</h1>
      <p className={Style.p}>Fecha: {date}</p>
      <p className={Style.p}>Hora: {time}</p>
      <p className={status === "active" ? Style.active : Style.cancelled}>{status}</p>
        <div className={Style.buttonContainer}>
            <button className={Style.button}
            onClick={handlerCancel}
            disabled={status === 'cancelled'}
            style={status === 'cancelled' ? { visibility: 'hidden' } : {}}>
            Cancelar
            </button>
        </div>
    </div>
  );
}

export default Turno;



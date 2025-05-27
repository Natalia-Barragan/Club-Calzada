import Style from './Turno.module.css';

function Turno({ id, date, time, status }) {
    return (
        <div className={Style.turnoContainer}>
            <h1 className={Style.title}>Turno {id}</h1>
            <p className={Style.p}>Fecha: {date}</p>
            <p className={Style.p}>Hora: {time}</p>            
            <p className={Style.p}>Estado: {status}</p>
        </div>
    );
}

export default Turno;
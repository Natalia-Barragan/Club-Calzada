import Style from './Turno.module.css';

function Turno({ date, time, status }) {
    return (
        <div className={Style.turnoContainer}>
            <h1 className={Style.title}>Turno</h1>
            <p className={Style.p}>Fecha: {date}</p>
            <p className={Style.p}>Hora: {time}</p>            
            <p className={Style.p}>Estado: {status}</p>
            <div type="submit" className={Style.buttonContainer}>
                <button className={Style.button}>Cancelar</button>
            </div>
        </div>
    );
}

export default Turno;
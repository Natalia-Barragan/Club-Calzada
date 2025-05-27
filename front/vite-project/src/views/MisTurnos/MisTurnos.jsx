import { useState } from 'react';
import myAppointments from '../../helpers/myAppointments';
import Turno from '../../components/Turno/Turno';
import Styles from './MisTurnos.module.css';


export default function MisTurnos() {

    const [turnos, setTurnos] = useState(myAppointments);

    return (
        <div className={Styles.container}>
            <div className={Styles.title}>
            <h1 >Mis Turnos</h1>
            </div>
            <div className={Styles.turnosContainer}>

                {
                    turnos.length > 0 ? 
                        turnos.map(turno => (
                            <Turno
                            key={turno.id}
                            id={turno.id}
                            date={turno.date}
                            time={turno.time}
                            status={turno.status}
                            />                    
                        )
                    ) : (
                        <p>No tienes turnos programados.</p>
                    )
                }
              
            </div>
        </div>
        
    )
}
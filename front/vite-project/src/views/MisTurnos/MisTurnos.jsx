import { useEffect, useState } from 'react';
import Turno from '../../components/Turno/Turno';
import Styles from './MisTurnos.module.css';
import axios from 'axios';


export default function MisTurnos() {

    const [turnos, setTurnos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/appointments/')
            .then(info => {
                setTurnos(info.data.data);
            })
            .catch(error => {
                console.error('Error fetching appointments:', error);
            });
    }, []);
        
    return (
        <div className={Styles.container}>
            <div className={Styles.title}>
            <h1 >MIS TURNOS</h1>
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
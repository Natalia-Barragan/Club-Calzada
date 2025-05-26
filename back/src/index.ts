import server from './server';
import { config } from './config/envs';
import "reflect-metadata";
import { AppDataSource } from './config/data-sources';

AppDataSource.initialize()
  .then(() => {

    console.log('Conexion a la base de datos establecida');
     console.log('Entidades cargadas:', AppDataSource.entityMetadatas.map(e => e.name));

    server.listen(config.PORT, () => {
      console.log(`Server is running on port ${config.PORT}`);
    });     
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:');
    console.log(error);
  });




import server from './server';
import { config } from './config/envs';
import "reflect-metadata";
import { AppDataSource } from './config/data-sources';

AppDataSource.initialize()
  .then(() => {
    server.listen(config.PORT);     
  })
  .catch((error) => {
  });




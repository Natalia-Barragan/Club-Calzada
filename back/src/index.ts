import server from './server';
import { config } from './config/envs';
import "reflect-metadata";
import { AppDataSource } from './config/data-sources';

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully");
    server.listen(config.PORT, () => {
      console.log(`Server listening on port ${config.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  });




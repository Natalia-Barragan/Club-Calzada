import server from './server';
import { config } from './config/envs';
import "reflect-metadata";
import { AppDataSource } from './config/data-sources';

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully");
    server.listen(config.PORT, () => {
      console.log(`--- CLUB CALZADA API IS UP ON PORT ${config.PORT} ---`);
    });
    
    // KEEP ALIVE: Prevent clean exit in some Express 5 configurations
    setInterval(() => {}, 60000);
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  });




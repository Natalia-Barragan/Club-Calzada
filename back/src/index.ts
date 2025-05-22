import server from './server';
import { PORT } from './config/envs';

console.log("🚀 SERVIDOR INICIADO – ¡ESTOS SON TUS CAMBIOS!");

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// por ejemplo, justo antes de `export default server;` en server.ts
server.get('/', (_req, res) => {
  res.status(200).json({ message: 'API viva y escuchando' });
});




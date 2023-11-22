import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors(
    {
        origin: '*',
    }
));

io.on("connection", (socket) => {
    console.log("Usuario conectado");
  
    socket.on("asociarSolicitudId", ({ solicitudId }) => {
      // Asociar solicitudId con la conexión del socket
      socket.solicitudId = solicitudId;
      console.log(`Socket asociado con solicitudId: ${solicitudId}`);
    });
  
    socket.on("disconnect", () => {
      console.log("Usuario desconectado");
    });
  });  
  

server.listen(3000, () => {
    console.log('listening on *:3000');
});
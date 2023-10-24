const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname + '/public'));

// Función para generar un nombre aleatorio
function generateRandomName() {
    const adjetivos = ['Rojo', 'Azul', 'Verde', 'Amarillo', 'Morado', 'Naranja', 'Loco', 'Listo', 'Feliz'];
    const sujeto = ['Gato', 'Perro', 'Elefante', 'Leon', 'Mono', 'Jirafa', 'Tigre', 'Panda', 'Kanguro', 'Delfin'];
    const randomAdjetivo = adjetivos[Math.floor(Math.random() * adjetivos.length)];
    const randomsujeto = sujeto[Math.floor(Math.random() * sujeto.length)];
    return `${randomsujeto}-${randomAdjetivo}`;
}

io.on('connection', (socket) => {
    const username = generateRandomName(); // Genera un nombre aleatorio
    socket.emit('user connected', username); // Envía el nombre al cliente

    socket.on('chat message', (msg) => {
        io.emit('chat message', `${username}: ${msg}`);
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

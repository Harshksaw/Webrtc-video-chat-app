import express, { type Request, type Response } from 'express';
import { PORT } from './config/serverConfig';
const app = express();
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import roomHandler from './handlers/roomHandler';

app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'ok' });
});


const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});



io.on("connection", (socket) => {
    console.log("a user connected");

    roomHandler(socket);
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});


server.listen(PORT, () => console.log(`API on http://localhost:${PORT}`));

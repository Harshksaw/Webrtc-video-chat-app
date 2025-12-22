import express, { type Request, type Response } from 'express';
import { PORT } from './config/serverConfig';
const app = express();
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

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
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});


console.log('API on http://localhost:3001');
app.listen(PORT , () => console.log('API on http://localhost:3001'));

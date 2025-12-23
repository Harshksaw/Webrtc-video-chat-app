import { Socket } from "socket.io";
import { v4 as UUIDv4 } from "uuid";

const roomHandler = (socket: Socket) => {

    const createRoom = () => {
        const roomId = UUIDv4();
        socket.join(roomId);
        socket.emit("room_created", { roomId });
        console.log(`Room created with id ${roomId} by ${socket.id}`);
    }

    const joinRoom = ({ roomId }: { roomId: string }) => {
        socket.join(roomId);
        socket.to(roomId).emit("user_joined", { userId: socket.id });
        socket.emit("joined_room", { roomId });
        console.log(`User ${socket.id} joined room ${roomId}`);
    }

    const leaveRoom = ({ roomId }: { roomId: string }) => {
        socket.leave(roomId);
        socket.to(roomId).emit("user_left", { userId: socket.id });
        console.log(`User ${socket.id} left room ${roomId}`);
    }

    socket.on("create_room", createRoom);
    socket.on("join_room", joinRoom);
    socket.on("leave_room", leaveRoom);
}

export default roomHandler;

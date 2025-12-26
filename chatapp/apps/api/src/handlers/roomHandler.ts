import { Socket } from "socket.io";
import { v4 as UUIDv4 } from "uuid";
import IRoomParams from "../interfaces/IRoomParams";

const rooms:Record<string, string[]> = {};
const roomHandler = (socket: Socket) => {

    //the below map stores for a room what all peers have joined


    const createRoom = () => {
        const roomId = UUIDv4();
        socket.join(roomId);

        rooms[roomId] = [];

        socket.emit("room_created", { roomId });

        console.log(`Room created with id ${roomId} by ${socket.id}`);
    }

    const joinedRoom = ({ roomId , peerId }:IRoomParams) => {

        if(rooms[roomId]) {
            //if room id exisits then push the peer id
            
            rooms[roomId].push(peerId);
            socket.join(roomId);
            // socket.to(roomId).emit("user_joined", { userId: peerId });
            // socket.emit("joined_room", { roomId });
            socket.emit("get-users",{
                roomId,
                participants: rooms[roomId]
            })
        }else {
            rooms[roomId] = [peerId];
        }
        
        console.log(`User ${socket.id} joined room ${roomId}`);
    }

    const leaveRoom = ({ roomId }: { roomId: string }) => {
        socket.leave(roomId);
        socket.to(roomId).emit("user_left", { userId: socket.id });
        console.log(`User ${socket.id} left room ${roomId}`);
    }

    socket.on("create_room", createRoom);
    socket.on("join_room", joinedRoom);
    socket.on("leave_room", leaveRoom);
}

export default roomHandler;

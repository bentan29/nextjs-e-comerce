// lib/socketServer.ts
import { Server } from "socket.io";
let io: Server | null = null;

export function initSocket(httpServer: any) {
    io = new Server(httpServer);
    return io;
}

export function getIO() {
    if (!io) {
        throw new Error("Socket.IO no inicializado. Asegúrate de llamar a initSocket primero.");
    }
    return io;
}
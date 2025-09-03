import {createServer} from "node:http";
import Next from "next";
import {Server, Socket} from "socket.io";
import { IncomingMessage, ServerResponse } from "http";

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "localhost";
const port = parseInt(process.env.PORT || "3000", 10);

const app = Next({dev, hostname, port});
const handle = app.getRequestHandler();

app.prepare().then(() => {

    // const httpServer = createServer(handle);
    // crear servidor http compatible con Next
    const httpServer = createServer(
        (req: IncomingMessage, res: ServerResponse) => {
            handle(req, res);
        }
    );
    const io = new Server(httpServer);

    io.on("connection", (socket: Socket) => {
        // socket.on("join-update-stock", (productSize: string) => {
        //     socket.join(productSize);
        // })

        //- Admin entra a una sala especial
        socket.on("join-admin", () => {
            socket.join("admin");
            console.log(`Admin joined: ${socket.id}`);
        });

        // 👉 escuchar cuando se pague una orden
        socket.on("new-order", (payload: any) => {
            console.log("🟢 Orden recibida:", payload);
            // reenviamos solo a admins
            io.to("admin").emit("new-order", payload);
        });

        socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });

    //-Escuchamos el servidor 
    httpServer.listen(port, () => {
        console.log(`Server running on http://${hostname}:${port}`);
    })
})
'use client'

import {io} from 'socket.io-client'
export const socket = io()



// 'use client'

// import { io, Socket } from 'socket.io-client'

// // 🔹 Asegurate de usar siempre la URL del servidor (en dev y prod)
// const URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3000'

// // 🔹 Tipamos el socket para que tengas autocompletado en eventos
// export const socket: Socket = io(URL, {
//   autoConnect: true,   // Se conecta automáticamente
//   transports: ['websocket'], // Más estable que polling
// })
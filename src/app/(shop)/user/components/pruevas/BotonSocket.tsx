'use client'

import { Button } from '@/components/ui/button'
import { socket } from '@/lib/socketClient';
import React from 'react'

export const BotonSocket = () => {
    
    const handleSocket = () => {
        socket.emit("new-order", {'order': 'hola'});
    }
    return (
        <Button onClick={handleSocket}>Envio socket</Button>
    )
}

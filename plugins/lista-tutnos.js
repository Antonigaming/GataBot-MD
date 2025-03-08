import PhoneNumber from 'awesome-phonenumber';
import { promises } from 'fs';
import { join } from 'path';

const MAX_PARTICIPANTS = 40;

let handler = async (m, { conn }) => {
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();

    // Inicializar la lista de participantes en la base de datos si no existe
    if (!global.db.data.participants) {
        global.db.data.participants = {};
    }

    // Obtener la lista de participantes para el día actual
    let participants = global.db.data.participants[currentDate] || [];

    // Comprobar si la lista está llena
    if (participants.length >= MAX_PARTICIPANTS) {
        return conn.reply(m.chat, `🚫 La lista está llena. Puedes apuntarte para la lista de mañana.`, m);
    }

    // Obtener el número de WhatsApp del usuario
    const userNumber = m.sender.split('@')[0];

    // Verificar si el usuario ya está en la lista
    if (participants.some(participant => participant.number === userNumber)) {
        return conn.reply(m.chat, `❌ Ya estás en la lista.`, m);
    }

    // Agregar el participante a la lista
    participants.push({
        id: m.sender,         // ID del usuario
        number: userNumber,   // Número de WhatsApp del usuario
        name: `Usuario ${userNumber}`, // Nombre proporcionado por el usuario
        date: currentDate,    // Fecha
        time: currentTime     // Hora
    });

    // Guardar la lista actualizada en la base de datos
    global.db.data.participants[currentDate] = participants;

    // Responder con un mensaje de confirmación y la lista de participantes
    let message = `✅ Has sido agregado a la lista como Usuario ${userNumber}.\n\nLista de participantes:\n\n`;
    for (let i = 0; i < MAX_PARTICIPANTS; i++) {
        if (participants[i]) {
            message += `${i + 1}. ${participants[i].number} (Agregado el ${participants[i].date} a las ${participants[i].time})\n`;
        } else {
            message += `${i + 1}. [vacio ❌]\n`;
        }
    }

    await conn.reply(m.chat, message, m);
};

// Comando para agregar participantes
handler.command = /^al$/i;

export default handler;

// Código para mostrar la lista de participantes completa
let showListHandler = async (m, { conn }) => {
    const currentDate = new Date().toLocaleDateString();
    let participants = global.db.data.participants[currentDate] || [];

    let message = 'Lista de participantes:\n\n';
    for (let i = 0; i < MAX_PARTICIPANTS; i++) {
        if (participants[i]) {
            message += `${i + 1}. ${participants[i].number} - ${participants[i].name} (Agregado el ${participants[i].date} a las ${participants[i].time})\n`;
        } else {
            message += `${i + 1}. [vacio ❌]\n`;
        }
    }

    await conn.reply(m.chat, message, m);
};

// Comando para mostrar la lista
showListHandler.command = /^moslist$/i;

export { showListHandler };

// Código para borrar la lista de participantes, solo puede ser ejecutado por el dueño del bot
let clearListHandler = async (m, { conn }) => {
    const botOwner = '18098781279'; // Reemplaza esto con tu número de teléfono

    // Verificar si el comando fue ejecutado por el dueño del bot
    if (m.sender.split('@')[0] !== botOwner) {
        return conn.reply(m.chat, `❌ No tienes permiso para ejecutar este comando.`, m);
    }

    // Reinicializar la lista de participantes
    global.db.data.participants = {};

    await conn.reply(m.chat, `✅ La lista ha sido borrada y reinicializada.`, m);
};

// Comando para borrar la lista
clearListHandler.command = /^borrarlista$/i;

export { clearListHandler };

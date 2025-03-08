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

    // Pedir al usuario que introduzca un número
    await conn.reply(m.chat, `Por favor, proporciona un número para agregar a la lista:`, m);

    // Esperar la respuesta del usuario
    const numberResponse = await conn.waitForMessage(m.sender);

    // Validar el número
    if (!numberResponse.body || isNaN(numberResponse.body) || participants.some(participant => participant.number === numberResponse.body)) {
        return conn.reply(m.chat, `❌ Número no válido o ya está en la lista. No se pudo agregar.`, m);
    }

    // Pedir al usuario que introduzca un nombre
    await conn.reply(m.chat, `Por favor, proporciona un nombre para agregar a la lista:`, m);

    // Esperar la respuesta del usuario
    const nameResponse = await conn.waitForMessage(m.sender);

    // Validar el nombre
    if (!nameResponse.body) {
        return conn.reply(m.chat, `❌ Nombre no válido. No se pudo agregar a la lista.`, m);
    }

    // Agregar el participante a la lista
    participants.push({
        id: m.sender,         // ID del usuario
        number: numberResponse.body, // Número proporcionado por el usuario
        name: nameResponse.body, // Nombre proporcionado por el usuario
        date: currentDate,    // Fecha
        time: currentTime     // Hora
    });

    // Guardar la lista actualizada en la base de datos
    global.db.data.participants[currentDate] = participants;

    // Responder con un mensaje de confirmación
    await conn.reply(m.chat, `✅ Has sido agregado a la lista como ${nameResponse.body}.`, m);
};

// Comando para agregar participantes
handler.command = /^AL$/i;

export default handler;

// Código para mostrar la lista de participantes con espacios vacíos
let listHandler = async (m, { conn }) => {
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
listHandler.command = /^ML$/i;

export { listHandler };

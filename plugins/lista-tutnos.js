
import { xpRange } from '../lib/levelling.js';
import PhoneNumber from 'awesome-phonenumber';
import { promises } from 'fs';
import { join } from 'path';

const MAX_PARTICIPANTS = 40;

let handler = async (m, { conn }) => {
    const currentDate = new Date().toLocaleDateString();

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

    // Pedir al usuario que introduzca un nombre
    await conn.reply(m.chat, `Por favor, proporciona un nombre para agregar a la lista:`, m);

    // Esperar la respuesta del usuario
    const nameResponse = await conn.waitForMessage(m.sender);

    // Validar el nombre
    if (!nameResponse.body) {
        return conn.reply(m.chat, `❌ Nombre no válido. No se pudo agregar a la lista.`, m);
    }

    // Verificar si el usuario ya está en la lista
    if (participants.some(participant => participant.id === m.sender)) {
        return conn.reply(m.chat, `❌ Ya estás en la lista como ${participants.find(participant => participant.id === m.sender).name}.`, m);
    }

    // Agregar el participante a la lista
    participants.push({
        id: m.sender,        // ID del usuario
        name: nameResponse.body // Nombre proporcionado por el usuario
    });

    // Guardar la lista actualizada en la base de datos
    global.db.data.participants[currentDate] = participants;

    // Responder con un mensaje de confirmación
    await conn.reply(m.chat, `✅ Has sido agregado a la lista como ${nameResponse.body}.`, m);
};

// Comando para agregar participantes
handler.command = /^agregar lista$/i;

export default handler;

// Código adicional para gestión de nivel de experiencia y otra información
let additionalHandler = async (m, { conn }) => {
    let { exp, limit, level, role } = global.db.data.users[m.sender];
    let { min, xp, max } = xpRange(level, global.multiplier);

    let d = new Date();
    let locale = 'es';
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5];
    let week = d.toLocaleDateString(locale, { weekday: 'long' });
    let date = d.toLocaleDateString(locale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).format(d);
    let time = d.toLocaleTimeString(locale, {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    });

    let { money } = global.db.data.users[m.sender];

    // Aquí puedes añadir más lógica para responder o procesar información del usuario
};

// Comando adicional si es necesario
additionalHandler.command = /^apuntar$/i;

export default additionalHandler;
                     

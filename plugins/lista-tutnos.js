import PhoneNumber from 'awesome-phonenumber';
import { promises } from 'fs';
import { join } from 'path';
import moment from 'moment-timezone';

// Constantes
const MAX_PARTICIPANTS = 40;
const botOwner = '18098781279'; // Reemplaza esto con tu número de teléfono

// Inicializa la base de datos de participantes si no existe
const initializeParticipantsDB = () => {
    if (!global.db.data.participants) {
        global.db.data.participants = {};
    }
};

// Obtiene la lista de participantes para el día actual
const getParticipantsList = (currentDate) => {
    return global.db.data.participants[currentDate] || [];
};

// Formatea la lista de participantes para mostrarla
const formatParticipantsList = (participants) => {
    let message = '';
    for (let i = 0; i < MAX_PARTICIPANTS; i++) {
        if (participants[i]) {
            message += `${i + 1}. ${participants[i].number} - ${participants[i].name} (Agregado el ${participants[i].date} a las ${participants[i].time})\n`;
        } else {
            message += `${i + 1}. [vacio ❌]\n`;
        }
    }
    return message;
};

// Maneja el comando para agregar participantes
const handleAddParticipant = async (m, conn) => {
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();

    initializeParticipantsDB();

    let participants = getParticipantsList(currentDate);

    if (participants.length >= MAX_PARTICIPANTS) {
        return conn.reply(m.chat, `🚫 La lista está llena. Puedes apuntarte para la lista de mañana.`, m);
    }

    const userNumber = m.sender.split('@')[0];

    if (participants.some(participant => participant.number === userNumber)) {
        return conn.reply(m.chat, `❌ Ya estás en la lista.`, m);
    }

    participants.push({
        id: m.sender,
        number: userNumber,
        name: `Usuario ${userNumber}`,
        date: currentDate,
        time: currentTime
    });

    global.db.data.participants[currentDate] = participants;

    await conn.reply(m.chat, `✅ Has sido agregado a la lista como Usuario ${userNumber}.\n\nLista de participantes:\n\n${formatParticipantsList(participants)}`, m);
};

// Maneja el comando para mostrar la lista de participantes
const handleShowList = async (m, conn) => {
    const currentDate = new Date().toLocaleDateString();
    let participants = getParticipantsList(currentDate);

    await conn.reply(m.chat, `Lista de participantes:\n\n${formatParticipantsList(participants)}`, m);
};

// Maneja el comando para borrar la lista de participantes
const handleClearList = async (m, conn) => {
    // Verificar si el comando fue ejecutado por el dueño del bot
    if (m.sender.split('@')[0] !== botOwner) {
        return conn.reply(m.chat, `❌ No tienes permiso para ejecutar este comando. Solo el dueño del bot puede hacerlo.`, m);
    }

    global.db.data.participants = {};

    await conn.reply(m.chat, `✅ La lista ha sido borrada y reinicializada.`, m);
};

// Muestra el menú de opciones
const showMenu = async (m, conn, usedPrefix) => {
    const lugarFecha = moment().tz('America/Lima');
    const formatoFecha = {
        weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    };
    lugarFecha.locale('es', formatoFecha);
    const horarioFecha = lugarFecha.format('dddd, DD [de] MMMM [del] YYYY || HH:mm A').replace(/^\w/, (c) => c.toUpperCase());

    const menu = `⎔ \`\`\`${horarioFecha}\`\`\`
⎔ *Opciones de Lista de Turnos*
⎔ *Selecciona una opción:*
⎔ *Ver Lista* ➺ ${usedPrefix}moslist
⎔ *Borrar Lista* ➺ ${usedPrefix}borrarlista (Solo el dueño del bot)
`.trim();

    const buttonParamsJson = JSON.stringify({
        title: "Opciones de Lista de Turnos",
        description: "Seleccione una opción",
        sections: [
            {
                title: "🔖 Opciones", highlight_label: "Popular",
                rows: [
                    { header: "📋 Ver Lista", title: "🔓 Para: Todos", description: "Ver la lista de participantes", id: usedPrefix + "moslist" },
                    { header: "🗑️ Borrar Lista", title: "🔒 Para: Dueño", description: "Borrar la lista de participantes", id: usedPrefix + "borrarlista" }
                ]
            }
        ]
    });

    const interactiveMessage = {
        body: { text: menu },
        footer: { text: `Si algo no funciona utilice el comando *${usedPrefix}menu2*` },
        header: { title: `⭐ *------- MENÚ -------* ⭐\nOpciones de Lista de Turnos`, subtitle: "Seleccione una opción", hasMediaAttachment: false },
        nativeFlowMessage: { buttons: [{ 
            name: "single_select",
            buttonParamsJson
        }]
    }};

    const message = { messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 }, interactiveMessage };
    await conn.relayMessage(m.chat, { viewOnceMessage: { message } }, {});
};

// Comando para agregar participantes
let handler = async (m, { conn, usedPrefix }) => {
    if (m.text.includes('ml')) {
        await showMenu(m, conn, usedPrefix);
    } else {
        await handleAddParticipant(m, conn);
    }
};
handler.command = /^(al|ml)$/i;

export default handler;

// Comando para mostrar la lista
let showListHandler = async (m, { conn }) => {
    await handleShowList(m, conn);
};
showListHandler.command = /^moslist$/i;

export { showListHandler };

// Comando para borrar la lista
let clearListHandler = async (m, { conn }) => {
    await handleClearList(m, conn);
};
clearListHandler.command = /^borrarlista$/i;

export { clearListHandler };

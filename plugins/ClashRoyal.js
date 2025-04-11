import axios from 'axios';

const cardTranslations = {
    // Traducciones completas de cartas de Clash Royale
    "Knight": "Caballero",
    "Archers": "Arqueras",
    "Giant": "Gigante",
    "Musketeer": "Mosquetera",
    "Baby Dragon": "Dragón Bebé",
    "Mini P.E.K.K.A": "Mini P.E.K.K.A",
    "Valkyrie": "Valquiria",
    "Hog Rider": "Montapuercos",
    "Wizard": "Mago",
    "Prince": "Príncipe",
    "Skeletons": "Esqueletos",
    "Bomber": "Bombardero",
    "Fireball": "Bola de Fuego",
    "Arrows": "Flechas",
    "Zap": "Descarga",
    "Goblin Barrel": "Barril de Duendes",
    "Inferno Tower": "Torre Infernal",
    "Balloon": "Globo",
    "Witch": "Bruja",
    // Agregar el resto de las cartas aquí
};

const handler = async (m, { conn, text }) => {
    const codeRegex = /^(\.CRJ|jcr|playerc royal) (\d{4,})$/i;
    const match = text.match(codeRegex);

    if (!match) {
        conn.reply(
            m.chat,
            '_Por favor ingresa un código de jugador válido de Clash Royale. Ejemplo: .CRJ 2640_',
            m
        );
        return;
    }

    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6Ijk0MzA0NDYwLTFkN2UtNGYzYi04ODM2LWY5MjFkNzlhMzgxMiIsImlhdCI6MTc0NDMyMjYzOCwic3ViIjoiZGV2ZWxvcGVyLzRlMzE1MDg4LWJjZDUt ZTU3MS0yNWQxLTRiYjc2NTg4MGNlNCIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyI0NS43OS4yMTguNzkiXSwidHlwZSI6ImNsaWVudCJ9XX0.uebZ6L06NIkl1ZkS-v0sU-G10gfL_2bEcl8AocZGfCYhTulJxuXjEUjY6qm9ON9uyfBkhLxOkJJCu--4NMgOYg';
    const playerId = match[2];
    const apiUrl = `https://proxy.royaleapi.dev/v1/players/%23${playerId}`;

    try {
        const response = await axios.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const playerInfo = response.data;

        // Extraer información de los mazos
        let message = `👤 **Nombre del Jugador:** ${playerInfo.name}\n🏅 **Nivel del Jugador:** ${playerInfo.expLevel}\n\n`;
        message += `🃏 **Mazos Actuales:**\n\n`;

        playerInfo.currentDeck.forEach((card, index) => {
            const translatedName = cardTranslations[card.name] || card.name; // Traducir al español si hay traducción disponible
            message += `${index + 1}. ${translatedName} (Nivel ${card.level})\n`;
        });

        conn.reply(m.chat, message, m);
    } catch (error) {
        handleError(error, conn, m);
    }
};

// Manejo de errores
const handleError = (error, conn, m) => {
    if (error.response && error.response.status === 404) {
        conn.reply(
            m.chat,
            '_El código de jugador no es válido o el jugador no existe._',
            m
        );
    } else {
        console.error('Error al buscar la información del jugador:', error);
        conn.reply(
            m.chat,
            '_Ha ocurrido un error al buscar la información del jugador. Por favor verifica el código del jugador._',
            m
        );
    }
};

// Definición del comando
handler.command = /^(\.CRJ|jcr|playerc royal) (\d{4,})$/i;

export default handler;

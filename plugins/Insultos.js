// Plugin .alex: Insultos contextuales, estructurado, limpio y con respuesta contundente.
// Solo responde en grupos y a usuarios registrados.

function generarInsultosExtras(cantidad) {
  const plantillas = [
    "Si fueras {objeto}, ni para adorno servirías.",
    "Tan irrelevante como {cosaInutil}.",
    "En el mundo de los {mundo}, tú serías el {peor}.",
    "Tu {cualidad} es tan baja como el {objetoBajo}.",
    "Más rancio que {cosaIrrelevante}.",
    "Eres el {elemento} de los {cosas} inútiles.",
    "Si fueras {tecnologia}, estarías {estado}.",
    "Tu humor es tan oscuro que absorbe la luz.",
    "Si fueras backup, perderías hasta los memes.",
    "Hasta el silencio te esquiva.",
    "Serías admin en un grupo de bots.",
    "Eres el bug que ni el QA encuentra.",
    "Si fueras playlist, sólo tendrías anuncios.",
    "Eres el recordatorio de lo lejos que está el estándar.",
    "Tu lógica es un bug sin fix.",
    "Si fueras antivirus, traerías virus.",
    "Eres la notificación que ni el spam quiere.",
    "Hasta el bot se aburre de responderte.",
    "Serías el jefe final del tutorial de la vida.",
    "Tienes menos chispa que una piedra mojada.",
    "Tu existencia es un error de compilación.",
    "Tus aportes sólo suman para restar."
  ];

  const cosasInutiles = [
    "un paraguas en el desierto", "un cenicero en una moto",
    "una cuchara en una caja de herramientas", "un bolígrafo sin tinta"
  ];

  const mundos = ["robots", "humanos", "plantas", "apps", "memes", "errores"];
  const peores = ["bug", "virus", "fallo", "glitch", "pantallazo azul"];
  const tecnologias = ["app", "sistema operativo", "antivirus", "bot", "backup"];
  const estados = ["desinstalado", "infectado", "colgado", "sin soporte", "en pantalla azul"];
  const cualidades = ["autoestima", "inteligencia", "paciencia", "humildad"];
  const objetosBajos = ["subsuelo", "fondo del mar", "cueva sin fondo"];
  const cosasIrrelevantes = [
    "el historial de un router público", "un fax en 2025", "el manual de una tostadora"
  ];
  const elementos = ["rey", "jefe", "emperador", "dios"];
  const cosas = ["cosas", "cosas inútiles", "errores", "fracasos"];
  const objetos = ["adorno", "piedra", "pegatina", "chiste"];

  const extras = [];
  for (let i = 0; i < cantidad; i++) {
    let plantilla = plantillas[Math.floor(Math.random() * plantillas.length)];
    plantilla = plantilla
      .replace(/{objeto}/g, objetos[Math.floor(Math.random() * objetos.length)])
      .replace(/{cosaInutil}/g, cosasInutiles[Math.floor(Math.random() * cosasInutiles.length)])
      .replace(/{mundo}/g, mundos[Math.floor(Math.random() * mundos.length)])
      .replace(/{peor}/g, peores[Math.floor(Math.random() * peores.length)])
      .replace(/{tecnologia}/g, tecnologias[Math.floor(Math.random() * tecnologias.length)])
      .replace(/{estado}/g, estados[Math.floor(Math.random() * estados.length)])
      .replace(/{cualidad}/g, cualidades[Math.floor(Math.random() * cualidades.length)])
      .replace(/{objetoBajo}/g, objetosBajos[Math.floor(Math.random() * objetosBajos.length)])
      .replace(/{cosaIrrelevante}/g, cosasIrrelevantes[Math.floor(Math.random() * cosasIrrelevantes.length)])
      .replace(/{elemento}/g, elementos[Math.floor(Math.random() * elementos.length)])
      .replace(/{cosas}/g, cosas[Math.floor(Math.random() * cosas.length)]);
    extras.push(plantilla);
  }
  return extras;
}

const insultosContextuales = [
  {
    keywords: ["manco", "noob", "torpe"],
    respuestas: [
      "¿Manco? Si tú fueras un control, ni los botones te funcionarían.",
      "Para manco tú, que no sirves ni de calentamiento.",
      "Si hubiera torneo de mancos, llegarías tarde y perderías en la entrada."
    ]
  },
  {
    keywords: ["inutil", "inútil", "inservible"],
    respuestas: [
      "Inútil es poco, contigo la palabra toma otro nivel.",
      "No sirves ni para prueba de fallos.",
      "Tu inutilidad es legendaria, deberían darte un diploma."
    ]
  },
  {
    keywords: ["feo", "fea", "horrible"],
    respuestas: [
      "Feo es poco, tu foto rompe cámaras.",
      "Eres la razón por la que la belleza es relativa.",
      "Si fueras emoji, serías el de error visual."
    ]
  },
  {
    keywords: ["rata", "ratero", "robar"],
    respuestas: [
      "¿Rata? Te queda pequeño, eres el jefe de la cloaca.",
      "Hasta las ratas te ven y se cambian de acera.",
      "Eres el ejemplo de por qué existen trampas."
    ]
  },
  {
    keywords: ["toxico", "tóxico", "veneno"],
    respuestas: [
      "Tan tóxico que ni los químicos te quieren.",
      "Tu presencia contamina más que un vertedero.",
      "Si fueras gas, serías el primero en evacuar el edificio."
    ]
  },
  {
    keywords: ["lloron", "llorón", "llorona", "llorar"],
    respuestas: [
      "Llorón nivel: lagrimal en mantenimiento.",
      "Tus lágrimas ya tienen club de fans.",
      "Si te pagaran por llorar, ya serías millonario."
    ]
  },
  {
    keywords: ["tryhard", "esforzado", "forzado"],
    respuestas: [
      "Tryhard y sigues igual de malo.",
      "Ni con hacks te sale una buena.",
      "Esfuerzo sin resultados, tu especialidad."
    ]
  },
  {
    keywords: ["tonto", "tonta", "bobo", "burro", "idiota"],
    respuestas: [
      "Tonto no, lo siguiente.",
      "Si la estupidez fuera arte, serías el Da Vinci.",
      "Tu IQ tiene números negativos."
    ]
  }
];

const insultosGenerales = [
  "Si la mediocridad tuviera nombre, el tuyo estaría en letras mayúsculas y negritas.",
  "Eres el pantallazo azul del grupo: cada vez que apareces, todo se detiene.",
  "Eres tan innecesario que ni el universo te tiene en cuenta a la hora de desperdiciar energía.",
  "Agradece que te respondo, es un lujo que no todo el mundo se puede permitir.",
  "Podría insultarte con clase, pero prefiero no rebajarme tanto.",
  "Tu optimismo es como el WiFi público: inestable y lento.",
  "Tu presencia baja la media de inteligencia de cualquier sala.",
  "Hasta el silencio se aburre cuando hablas.",
  "Eres el bug sin solución de esta conversación.",
  "Tu existencia es la mejor prueba de que la evolución falla.",
  "Si la ignorancia doliera, estarías gritando desde que naciste.",
  "Tu aporte es como el WiFi público: lento y nadie lo quiere usar.",
  "Eres el virus del grupo, pero ni el antivirus te detecta.",
  "Si fueras aire, ni los pulmones te aceptarían.",
  "Tu autoestima es como tu inteligencia: escasa y ausente.",
  "Tu futuro es tan brillante como un eclipse a medianoche.",
  "Si fueras luz al final del túnel, seguro que es un tren que viene de frente.",
  "Eres el ejemplo perfecto de por qué la evolución tiene bugs.",
  "Tu nivel es tan bajo que ni el infierno te acepta en la whitelist.",
  "Si fueras backup, perderías hasta las ganas de existir.",
  "Eres tan gris que hasta las nubes te usan de ejemplo.",
  "Si fueras spoiler, serías la alerta de tsunami en el desierto.",
  "Tus argumentos son el error 404 de la lógica.",
  "Eres la excepción que ni el bug quiere capturar.",
  "Hasta el silencio se aburre contigo.",
  "Eres la notificación que nadie abre.",
  "Si fueras backup, te perderías en la nube.",
  "Si fueras meme, serías el que solo entienden en funerales.",
  "Tus aportes a la conversación son como el oxígeno en el vacío: absolutamente innecesarios."
];

const mainCallInsults = [
  "¿Para qué mierda me llamas si solo vas a escribir mi nombre? Andate a hacer algo con tu vida.",
  "¿Solo escribes '.alex'? ¿En serio? Haz algo útil.",
  "¿Me mencionas solo para esto? Hazte ver.",
  "¿Así nomás? Usa mi nombre para algo más interesante, por favor.",
  "¿Te aburres mucho o solo buscas atención? Haz algo productivo."
];

const allInsults = [
  ...insultosGenerales,
  ...generarInsultosExtras(700)
];

function buscarInsultoContextual(texto) {
  texto = texto.toLowerCase();
  for (const grupo of insultosContextuales) {
    for (const palabra of grupo.keywords) {
      if (texto.includes(palabra)) {
        const respuestas = grupo.respuestas;
        if (Math.random() < 0.25) {
          return `"${palabra.charAt(0).toUpperCase()}${palabra.slice(1)}"? ${respuestas[Math.floor(Math.random() * respuestas.length)]}`;
        }
        return respuestas[Math.floor(Math.random() * respuestas.length)];
      }
    }
  }
  return allInsults[Math.floor(Math.random() * allInsults.length)];
}

function randomMainCallInsult() {
  return mainCallInsults[Math.floor(Math.random() * mainCallInsults.length)];
}

// NOTA: Adaptado para GataBotMD, handler recibe (m, { conn, args, isGroup, isRegistered })
const handler = async (m, { conn, args, isGroup, isRegistered }) => {
  if (!isGroup) return;
  if (!isRegistered && !m.fromMe) return;
  if (!args[0]) return await conn.reply(m.chat, randomMainCallInsult(), m);

  const texto = args.join(' ');
  return await conn.reply(m.chat, buscarInsultoContextual(texto), m);
};

handler.help = ['alex [texto]'];
handler.tags = ['fun', 'insulto'];
handler.command = ['alex'];
handler.group = true;
handler.register = true;

export default handler;

const SRS = {
  season: { number: 42, title: "Temporada 42" },

// MÁNAGERS / EQUIPOS - TEMPORADA 42 (32 confirmados)
  pilotos: [
    { pos: 1, nombre: "Vasvo Lao", equipo: "55 Williams F1 Team" },
    { pos: 2, nombre: "Lorena Portillo", equipo: "01 FORD MUSTANG" },
    { pos: 3, nombre: "Alexis Iceman", equipo: "00 CRT Competition" },
    { pos: 4, nombre: "Fab Man", equipo: "11 Racing Club" },
    { pos: 5, nombre: "Bruno Leal", equipo: "Red Bull Argen" },
    { pos: 6, nombre: "Cesar Garcia roco alvarez", equipo: "89 WILLIAMS RACING TEAM" },
    { pos: 7, nombre: "Romus Toras", equipo: "50 Rizia Royal Racing" },
    { pos: 8, nombre: "Юрий Клинский", equipo: "Сектор Газ" },
    { pos: 9, nombre: "Carlos Fragoso", equipo: "Williams Racing" },
    { pos: 10, nombre: "Cristian Ezpeleta", equipo: "99 Campos Racing F1" },
    { pos: 11, nombre: "Gonzalo Matias Salinas", equipo: "17 Jordan Grand Prix" },
    { pos: 12, nombre: "Bongain François", equipo: "Red Bull Racing F1 Team" },
    { pos: 13, nombre: "Jorge Pell", equipo: "83 Lotus Cars" },
    { pos: 14, nombre: "Eduardo Calvo", equipo: "72 Foxtrot GP" },
    { pos: 15, nombre: "André Prov", equipo: "Tortuga" },
    { pos: 16, nombre: "Rui Ferrari", equipo: "ruiFerrari" },
    { pos: 17, nombre: "Alan Campos", equipo: "43 Williams Racing" },
    { pos: 18, nombre: "José Ortiz", equipo: "43 Campos Racing F1" },
    { pos: 19, nombre: "Chema Burgués", equipo: "24 Andretti William Hill F2" },
    { pos: 20, nombre: "Julio Maidana", equipo: "50 Titan F1 Team" },
    { pos: 21, nombre: "Omar De Leon", equipo: "10 Scuderia Ferrari" },
    { pos: 22, nombre: "Aimar Pedreira Sanchez", equipo: "Titán F1 Team" },
    { pos: 23, nombre: "Jorge Fernández", equipo: "12 Kimoa Racing F1 Team" },
    { pos: 24, nombre: "Roma Dos", equipo: "Roma Astur" },
    { pos: 25, nombre: "Ruben Ramirez", equipo: "25 Kimoa Racing F1 Team" },
    { pos: 26, nombre: "Leoo Ferreira", equipo: "TheGoat Ferreira" },
    { pos: 27, nombre: "Antonio Pinillos", equipo: "Infiniti Red Bull Racing F1 Team" },
    { pos: 28, nombre: "1C3M4N .", equipo: "PREMA RACING" },
    { pos: 29, nombre: "Dionysis Kalamakis", equipo: "21 Titan F1 Team by Vitality Motorsports" },
    { pos: 30, nombre: "Samuel Guevara Salazar", equipo: "211 Scuderia Ferrari" },
    { pos: 31, nombre: "Valdi CT", equipo: "777 Cadillac Saint Laurent Kimoa" },
    { pos: 32, nombre: "Pablinho Da Silva", equipo: "00 FoxTrot GP" },
  ],

// â”€â”€ JORNADAS â€” FASE 1 (J1-J8) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 28 mÃ¡nagers, 14 duelos 1v1 por jornada, sin descanso (28 es par).
  // Emparejamientos generados aleatoriamente; posA/posB/ganador se
  // rellenan al llegar el resultado real de cada carrera.
  jornadas: [
    {
      numero: 1,
      nombre: "Prueba",
      circuito: "Circuito de prueba",
      completada: false,
      descansa: null,
      enfrentamientos: [
        { equipoA: "55 Williams F1 Team", equipoB: "01 FORD MUSTANG", posA: null, posB: null, ganador: null },
        { equipoA: "00 CRT Competition", equipoB: "11 Racing Club", posA: null, posB: null, ganador: null },
        { equipoA: "50 Rizia Royal Racing", equipoB: "Red Bull Argen", posA: null, posB: null, ganador: null },
        { equipoA: "Williams Racing", equipoB: "99 Campos Racing F1", posA: null, posB: null, ganador: null },
      ],
    },
  ],
  copaT39: {
    temporada: 39,
    fases: [
      { numero: 1, desde: 1, hasta: 8, tipo: "directa", cupo: 8 },
      { numero: 2, desde: 9, hasta: 10, tipo: "corte", eliminar: 4 },
      { numero: 3, desde: 11, hasta: 18, tipo: "corte", eliminar: 4 },
    ],
  },

  eliminatorias: {
    octavos: [],
    cuartos: [],
    semis: [],
    final: null,
  },

  // â”€â”€ BONOS DE PUNTOS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // Tortuga (AndrÃ© Prov) descansa en J1 por ser campeÃ³n de T38;
  // se le suman 3 pts de salida (el valor de una jornada ganada).
  // No corre en J1 â€” sus resultados no deben incluirle esa jornada.
  bonos: {
    Tortuga: 3,
  },

  // â”€â”€ SUPERCOPA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // Trofeo aparte, no cuenta para la Copa de Verano ni sus fases.
  supercopa: {
    temporada: 39,
    campeon: "50 Rizia Royal Racing", // Romus Toras
  },

  // â”€â”€ SOCIAL / REDES â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  redes: [
    { label: "TikTok", href: "https://www.tiktok.com/@calvo.plan?_r=1&_t=ZN-93aEsFGNWVi" },
    { label: "Twitch", href: "https://www.twitch.tv/sergiote_g20" },
    { label: "Twitch Alt", href: "https://www.twitch.tv/prodigss" },
    { label: "YouTube", href: "https://youtube.com/@spanishracingseries?si=9LkAzkI-EK1h5c3W" },
    { label: "Discord", href: "https://discord.gg/anDChwwQA" },
    { label: "Instagram", href: "https://www.instagram.com/spanishracingseries_?igsh=MXZiMnczNXBraDJobw==" },
    { label: "WhatsApp", href: "https://chat.whatsapp.com/KVf4sll1iDi8RmqroMjWDa" },
  ],
};

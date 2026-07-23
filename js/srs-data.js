// ============================================================
// SPANISH RACING SERIES — DATA T38
// Compactado: objetos en una línea para reducir el tamaño del
// archivo. Estructura corregida: eliminatorias/redes vuelven a
// estar al mismo nivel que jornadas. Resultados de J8, J9 y J10
// restaurados (se habían perdido al fusionar el archivo).
// ============================================================

const SRS = {
  season: { number: 39, title: "Temporada 39" },

  // ── PILOTOS / CLASIFICACIÓN FINAL DE LA FASE DE LIGA (tras J10 · Singapur) ──
  // puntos = 3 × jornadas ganadas por el equipo (J1–J10 completadas).
// ── PILOTOS / EQUIPOS — TEMPORADA 39 (29/32 confirmados) ────
  pilotos: [
    { pos: 1, nombre: "Romus Toras", equipo: "50 Rizia Royal Racing", puntos: 0 },
    { pos: 2, nombre: "Valdi CT", equipo: "Kimoa Racing F1 Team", puntos: 0 },
    { pos: 3, nombre: "André Prov", equipo: "Tortuga", puntos: 0 },
    { pos: 4, nombre: "Álvaro Molinelli", equipo: "49 Honda Repsol", puntos: 0 },
    { pos: 5, nombre: "Vasvo Lao", equipo: "Subaru F1 Team", puntos: 0 },
    { pos: 6, nombre: "Andres Greniuk", equipo: "63 CRT Competition", puntos: 0 },
    { pos: 7, nombre: "Sergio Solano", equipo: "13 CRT Competition", puntos: 0 },
    { pos: 8, nombre: "Giacomina Leclerc", equipo: "23 Foxtrot GP", puntos: 0 },
    { pos: 9, nombre: "Cristian Ezpeleta", equipo: "99 Campos Racing F1", puntos: 0 },
    { pos: 10, nombre: "Alexis Iceman", equipo: "00 CRT Competition", puntos: 0 },
{ pos: 11, nombre: "Leoo Ferreira", equipo: "07 Foxtrot GP", puntos: 0 },
    { pos: 12, nombre: "Juan Garcia", equipo: "Williams F1", puntos: 0 },
    { pos: 13, nombre: "Bongain François", equipo: "83 Campos Racing F1", puntos: 0 },
    { pos: 14, nombre: "José Ortiz", equipo: "43 Campos Racing F1", puntos: 0 },
    { pos: 15, nombre: "Fran White Academy", equipo: "F. W. A.", puntos: 0 },
    { pos: 16, nombre: "Julio Maidana", equipo: "50 Kimoa Racing F1 Team", puntos: 0 },
    { pos: 17, nombre: "Antonio Pinillos", equipo: "Red Bull Pinkustercia F1 Team", puntos: 0 },
    { pos: 18, nombre: "Lara Williams", equipo: "13 Hispania Racing Team", puntos: 0 },
    { pos: 19, nombre: "Cristóbal Farías Galleguillos", equipo: "Zetta RT", puntos: 0 },
    { pos: 20, nombre: "Alejandro Alonso", equipo: "3 Zetta Racing", puntos: 0 },
    { pos: 21, nombre: "SUELIN Brauner de Ávila", equipo: "61877324754035", puntos: 0 },
    { pos: 22, nombre: "Nelson David Quiroz", equipo: "9 ART Grand prix", puntos: 0 },
    { pos: 23, nombre: "Christian Horny", equipo: "15 Zeta Racing", puntos: 0 },
    { pos: 24, nombre: "Rui Ferrari", equipo: "Aston Martin F1", puntos: 0 },
    { pos: 25, nombre: "Saúl González", equipo: "99 León Racing team", puntos: 0 },
    { pos: 26, nombre: "Eduardo Calvo", equipo: "72 Foxtrot GP", puntos: 0 },
    { pos: 27, nombre: "Alan Campos", equipo: "Williams Racing", puntos: 0 },
    { pos: 28, nombre: "Carlos Ruiz Mateos", equipo: "53 Red Bull Racing Fly Emirates", puntos: 0 },
    { pos: 29, nombre: "Samuel Guevara Salazar", equipo: "211 Subaru Powered By 555", puntos: 0 },
  ],

  // ── PARTICIPANTES DE LA COPA (29/32 confirmados) ────────────
  copa: {
    participantes: [
      { pos: 1, nombre: "Romus Toras" }, { pos: 2, nombre: "Valdi CT" }, { pos: 3, nombre: "André Prov" },
      { pos: 4, nombre: "Álvaro Molinelli" }, { pos: 5, nombre: "Vasvo Lao" }, { pos: 6, nombre: "Andres Greniuk" },
      { pos: 7, nombre: "Sergio Solano" }, { pos: 8, nombre: "Giacomina Leclerc" }, { pos: 9, nombre: "Cristian Ezpeleta" },
      { pos: 10, nombre: "Alexis Iceman" }, { pos: 11, nombre: "Leoo Ferreira" }, { pos: 12, nombre: "Juan Garcia" },
      { pos: 13, nombre: "Bongain François" }, { pos: 14, nombre: "José Ortiz" }, { pos: 15, nombre: "Fran White Academy" },
      { pos: 16, nombre: "Julio Maidana" }, { pos: 17, nombre: "Antonio Pinillos" }, { pos: 18, nombre: "Lara Williams" },
      { pos: 19, nombre: "Cristóbal Farías Galleguillos" }, { pos: 20, nombre: "Alejandro Alonso" }, { pos: 21, nombre: "SUELIN Brauner de Ávila" },
      { pos: 22, nombre: "Nelson David Quiroz" }, { pos: 23, nombre: "Christian Horny" }, { pos: 24, nombre: "Rui Ferrari" },
      { pos: 25, nombre: "Saúl González" }, { pos: 26, nombre: "Eduardo Calvo" }, { pos: 27, nombre: "Alan Campos" },
      { pos: 28, nombre: "Carlos Ruiz Mateos" }, { pos: 29, nombre: "Samuel Guevara Salazar" },
    ],
  },

  // ── PARTICIPANTES DE LA COPA (32 managers) ──────────────────
  copa: {
    participantes: [
      { pos: 1, nombre: "Romus Toras" }, { pos: 2, nombre: "Valdi CT" }, { pos: 3, nombre: "Álvaro Molinelli" },
      { pos: 4, nombre: "André Prov" }, { pos: 5, nombre: "Giacomina Leclerc" }, { pos: 6, nombre: "Andres Greniuk" },
      { pos: 7, nombre: "Sergio Solano" }, { pos: 8, nombre: "Vasvo Lao" }, { pos: 9, nombre: "Luis Reynoso" },
      { pos: 10, nombre: "Cristian Ezpeleta" }, { pos: 11, nombre: "Leo Ferreira" }, { pos: 12, nombre: "Javier Martín" },
      { pos: 13, nombre: "Thiago Campos" }, { pos: 14, nombre: "Alexis Iceman" }, { pos: 15, nombre: "Eduardo Calvo" },
      { pos: 16, nombre: "Bongain François" }, { pos: 17, nombre: "Fran White Academy" }, { pos: 18, nombre: "Freya Anafi" },
      { pos: 19, nombre: "José Ortiz" }, { pos: 20, nombre: "Álvaro Redondo" }, { pos: 21, nombre: "Marco Rodríguez" },
      { pos: 22, nombre: "Julio Maidana" }, { pos: 23, nombre: "Cristóbal Farías Galleguillos" }, { pos: 24, nombre: "Antonio Pinillos" },
      { pos: 25, nombre: "Alejandro Alonso" }, { pos: 26, nombre: "Templario VCR" }, { pos: 27, nombre: "Lara Williams" },
      { pos: 28, nombre: "Marc cr Rayo" }, { pos: 29, nombre: "Rui Acacio" }, { pos: 30, nombre: "Francisco Martínez" },
      { pos: 31, nombre: "Christian Horny" }, { pos: 32, nombre: "Leandro Fernández" },
    ],
  },

  // ── JORNADAS ─────────────────────────────────────────────────
  // enfrentamiento: { equipoA, posA, equipoB, posB, ganador: 'A'|'B'|null }
  // resultados: clasificación individual de la carrera (null si no disponible)

  jornadas: [
    { numero: 1, circuito: "", completada: false, resultados: null },
    { numero: 2, circuito: "", completada: false, resultados: null },
    { numero: 3, circuito: "", completada: false, resultados: null },
    { numero: 4, circuito: "", completada: false, resultados: null },
    { numero: 5, circuito: "", completada: false, resultados: null },
    { numero: 6, circuito: "", completada: false, resultados: null },
    { numero: 7, circuito: "", completada: false, resultados: null },
    { numero: 8, circuito: "", completada: false, resultados: null },
    { numero: 9, circuito: "", completada: false, resultados: null },
    { numero: 10, circuito: "", completada: false, resultados: null },
    { numero: 11, circuito: "", completada: false, resultados: null },
    { numero: 12, circuito: "", completada: false, resultados: null },
    { numero: 13, circuito: "", completada: false, resultados: null },
    { numero: 14, circuito: "", completada: false, resultados: null },
    { numero: 15, circuito: "", completada: false, resultados: null },
    { numero: 16, circuito: "", completada: false, resultados: null },
    { numero: 17, circuito: "", completada: false, resultados: null },
    { numero: 18, circuito: "", completada: false, resultados: null },
    { numero: 19, circuito: "", completada: false, resultados: null },
    { numero: 20, circuito: "", completada: false, resultados: null },
    { numero: 21, circuito: "", completada: false, resultados: null },
    { numero: 22, circuito: "", completada: false, resultados: null },
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

  // ── SOCIAL / REDES ───────────────────────────────────────────
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
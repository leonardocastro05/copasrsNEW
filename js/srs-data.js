const SRS = {
  season: { number: 42, title: "Temporada 42" },

  // MÁNAGERS / EQUIPOS - TEMPORADA 42 (32 confirmados)
  pilotos: [
    { pos: 1, nombre: "Vasvo Lao", equipo: "55 Williams F1 Team" },
    { pos: 2, nombre: "Lorena Portillo", equipo: "01 FORD MUSTANG" },
    { pos: 3, nombre: "Alexis Iceman", equipo: "00 CRT Competition" },
    { pos: 4, nombre: "Fab Man", equipo: "11 Racing Club" },
    { pos: 5, nombre: "Bruno Leal", equipo: "Red Bull Argen" },
    {
      pos: 6,
      nombre: "Cesar Garcia roco alvarez",
      equipo: "89 WILLIAMS RACING TEAM",
    },
    { pos: 7, nombre: "Romus Toras", equipo: "50 Rizia Royal Racing" },
    { pos: 8, nombre: "Юрий Клинский", equipo: "Сектор Газ" },
    { pos: 9, nombre: "Carlos Fragoso", equipo: "Williams Racing" },
    { pos: 10, nombre: "Cristian Ezpeleta", equipo: "99 Campos Racing F1" },
    {
      pos: 11,
      nombre: "Gonzalo Matias Salinas",
      equipo: "17 Jordan Grand Prix",
    },
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
    {
      pos: 27,
      nombre: "Antonio Pinillos",
      equipo: "Infiniti Red Bull Racing F1 Team",
    },
    { pos: 28, nombre: "1C3M4N .", equipo: "PREMA RACING" },
    {
      pos: 29,
      nombre: "Dionysis Kalamakis",
      equipo: "21 Titan F1 Team by Vitality Motorsports",
    },
    {
      pos: 30,
      nombre: "Samuel Guevara Salazar",
      equipo: "211 Scuderia Ferrari",
    },
    { pos: 31, nombre: "Valdi CT", equipo: "777 Cadillac Saint Laurent Kimoa" },
    { pos: 32, nombre: "Pablinho Da Silva", equipo: "00 FoxTrot GP" },
  ],

  // â”€â”€ JORNADAS â€” FASE 1 (J1-J8) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 32 managers, 16 duelos 1v1 por jornada, sin descanso (32 es par).
  // La J1 empareja posiciones consecutivas para equilibrar la dificultad
  // inicial con el mismo criterio para todos. Las siguientes jornadas usan
  // la rotacion habitual; posA/posB/ganador se rellenan con los resultados.
  jornadas: [],

};

function crearJornadasTemporada() {
  var circuitos = [
    ["China", "16/11"],
    ["Japón", "23/11"],
    ["Bahréin", "30/11"],
    ["Arabia Saudí", "07/12"],
    ["Miami", "14/12"],
    ["Emilia-Romaña", "21/12"],
    ["Mónaco", "28/12"],
    ["España", "04/01"],
    ["Canadá", "11/01"],
    ["Austria", "18/01"],
    ["Gran Bretaña", "25/01"],
    ["Bélgica", "01/02"],
    ["Hungría", "08/02"],
  ];
  var equipos = SRS.pilotos.map(function (p) {
    return p.equipo;
  });
  var jornadas = [];

  circuitos.forEach(function (circuito, ronda) {
    var orden = equipos.slice();
    var enfrentamientos = [];
    for (var i = 0; i < orden.length / 2; i++) {
      var indiceB = ronda === 0 ? i * 2 + 1 : orden.length - 1 - i;
      enfrentamientos.push({
        equipoA: ronda === 0 ? orden[i * 2] : orden[i],
        equipoB: orden[indiceB],
        posA: null,
        posB: null,
        ganador: null,
        vueltaRapida: null,
        sancionA: null,
        sancionB: null,
      });
    }
    var fijo = orden.shift();
    var ultimo = orden.pop();
    orden.splice(ronda % orden.length, 0, ultimo);
    orden.unshift(fijo);
    equipos = orden;
    jornadas.push({
      numero: ronda + 1,
      nombre: "Jornada " + (ronda + 1),
      circuito: circuito[0],
      fecha: circuito[1],
      completada: false,
      descansa: null,
      enfrentamientos: enfrentamientos,
    });
  });
  return jornadas;
}

SRS.jornadas = crearJornadasTemporada();

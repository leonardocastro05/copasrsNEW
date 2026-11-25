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
    ["Turquía", "17/11"],
    ["Brasil", "18/11"],
    ["Japón", "19/11"],
    ["Baréin", "20/11"],
    ["Malasia", "23/11"],
    ["Países Bajos", "24/11"],
    ["México", "25/11"],
    ["Singapur", "26/11"],
    ["Mónaco", "27/11"],
    ["Australia", "30/11"],
    ["Abu Dabi", "01/12"],
    ["Hungría", "02/12"],
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

// Resultado importado de iGP Manager: J1 China (id 70355083).
var RESULTADO_J1_CHINA = {
  posiciones: {
    "10 Scuderia Ferrari": 1,
    "43 Williams Racing": 2,
    "Tortuga": 3,
    "211 Scuderia Ferrari": 4,
    "17 Jordan Grand Prix": 5,
    "01 FORD MUSTANG": 6,
    "TheGoat Ferreira": 7,
    "Roma Astur": 8,
    "11 Racing Club": 9,
    "777 Cadillac Saint Laurent Kimoa": 10,
    "25 Kimoa Racing F1 Team": 11,
    "00 FoxTrot GP": 12,
    "55 Williams F1 Team": 13,
    "Infiniti Red Bull Racing F1 Team": 14,
    "Сектор Газ": 15,
    "00 CRT Competition": 16,
    "50 Rizia Royal Racing": 17,
    "24 Andretti William Hill F2": 18,
    "ruiFerrari": 19,
    "Titán F1 Team": 20,
    "89 WILLIAMS RACING TEAM": 21,
    "Red Bull Argen": 22,
    "99 Campos Racing F1": 23,
    "21 Titan F1 Team by Vitality Motorsports": 24,
    "Red Bull Racing F1 Team": 25,
    "Williams Racing": 26,
    "43 Campos Racing F1": 27,
    "PREMA RACING": 28,
    "12 Kimoa Racing F1 Team": 29,
    "50 Titan F1 Team": 30,
    "83 Lotus Cars": 31,
    "72 Foxtrot GP": 32,
  },
  vueltaRapida: "11 Racing Club",
  combustible: "72 Foxtrot GP",
  fuente: "https://igpmanager.com/app/d=result&id=70355083&tab=race",
};

function aplicarResultado(jornada, resultado) {
  jornada.enfrentamientos.forEach(function (enfrentamiento) {
    var posA = resultado.posiciones[enfrentamiento.equipoA];
    var posB = resultado.posiciones[enfrentamiento.equipoB];
    if (!posA || !posB) return;
    enfrentamiento.posA = posA;
    enfrentamiento.posB = posB;
    enfrentamiento.ganador = posA < posB ? "A" : "B";
    enfrentamiento.vueltaRapida =
      resultado.vueltaRapida === enfrentamiento.equipoA
        ? "A"
        : resultado.vueltaRapida === enfrentamiento.equipoB
          ? "B"
          : null;
    enfrentamiento.sancionA =
      resultado.combustible === enfrentamiento.equipoA ||
      (resultado.sancionados && resultado.sancionados.includes(enfrentamiento.equipoA))
        ? "combustible"
        : null;
    enfrentamiento.sancionB =
      resultado.combustible === enfrentamiento.equipoB ||
      (resultado.sancionados && resultado.sancionados.includes(enfrentamiento.equipoB))
        ? "combustible"
        : null;
  });
  jornada.completada = jornada.enfrentamientos.every(function (enfrentamiento) {
    return enfrentamiento.posA && enfrentamiento.posB;
  });
  jornada.resultado = {
    fuente: resultado.fuente,
    importado: true,
  };
}

aplicarResultado(SRS.jornadas[0], RESULTADO_J1_CHINA);

// Resultado importado de iGP Manager: J2 Japon (id 70355084).
var RESULTADO_J2_JAPON = {
  posiciones: {
    "777 Cadillac Saint Laurent Kimoa": 1,
    "43 Williams Racing": 2,
    "11 Racing Club": 3,
    "Сектор Газ": 4,
    "50 Rizia Royal Racing": 5,
    "25 Kimoa Racing F1 Team": 6,
    "89 WILLIAMS RACING TEAM": 7,
    "Infiniti Red Bull Racing F1 Team": 8,
    "24 Andretti William Hill F2": 9,
    "10 Scuderia Ferrari": 10,
    "Tortuga": 11,
    "99 Campos Racing F1": 12,
    "Williams Racing": 13,
    "Red Bull Argen": 14,
    "43 Campos Racing F1": 15,
    "ruiFerrari": 16,
    "00 CRT Competition": 17,
    "Titán F1 Team": 18,
    "55 Williams F1 Team": 19,
    "12 Kimoa Racing F1 Team": 20,
    "Red Bull Racing F1 Team": 21,
    "Roma Astur": 22,
    "00 FoxTrot GP": 23,
    "21 Titan F1 Team by Vitality Motorsports": 24,
    "PREMA RACING": 25,
    "50 Titan F1 Team": 26,
    "TheGoat Ferreira": 27,
    "83 Lotus Cars": 28,
    "01 FORD MUSTANG": 29,
    "17 Jordan Grand Prix": 30,
    "211 Scuderia Ferrari": 31,
    "72 Foxtrot GP": 32,
  },
  vueltaRapida: "Infiniti Red Bull Racing F1 Team",
  combustible: null,
  sancionados: ["211 Scuderia Ferrari", "72 Foxtrot GP"],
  fuente: "https://igpmanager.com/app/d=result&id=70355084&tier=1&tab=race",
};

aplicarResultado(SRS.jornadas[1], RESULTADO_J2_JAPON);

// Resultado importado de iGP Manager: J3 Brasil (id 70355085).
var RESULTADO_J3_BRASIL = {
  posiciones: {
    "10 Scuderia Ferrari": 1,
    "00 CRT Competition": 2,
    "Tortuga": 3,
    "00 FoxTrot GP": 4,
    "55 Williams F1 Team": 5,
    "50 Rizia Royal Racing": 6,
    "43 Williams Racing": 7,
    "11 Racing Club": 8,
    "25 Kimoa Racing F1 Team": 9,
    "TheGoat Ferreira": 10,
    "17 Jordan Grand Prix": 11,
    "Сектор Газ": 12,
    "12 Kimoa Racing F1 Team": 13,
    "72 Foxtrot GP": 14,
    "01 FORD MUSTANG": 15,
    "Roma Astur": 16,
    "89 WILLIAMS RACING TEAM": 17,
    "Red Bull Argen": 18,
    "24 Andretti William Hill F2": 19,
    "777 Cadillac Saint Laurent Kimoa": 20,
    "99 Campos Racing F1": 21,
    "ruiFerrari": 22,
    "43 Campos Racing F1": 23,
    "Williams Racing": 24,
    "21 Titan F1 Team by Vitality Motorsports": 25,
    "83 Lotus Cars": 26,
    "Infiniti Red Bull Racing F1 Team": 27,
    "50 Titan F1 Team": 28,
    "Titán F1 Team": 29,
    "Red Bull Racing F1 Team": 30,
    "PREMA RACING": 31,
    "211 Scuderia Ferrari": 32,
  },
  vueltaRapida: "83 Lotus Cars",
  combustible: null,
  sancionados: [],
  fuente: "https://igpmanager.com/app/d=result&id=70355085&tier=1&tab=race",
};

aplicarResultado(SRS.jornadas[2], RESULTADO_J3_BRASIL);

// Resultado importado de iGP Manager: J4 Japon (id 70355086).
var RESULTADO_J4_JAPON = {
  posiciones: {
    "10 Scuderia Ferrari": 1,
    "777 Cadillac Saint Laurent Kimoa": 2,
    "11 Racing Club": 3,
    "50 Rizia Royal Racing": 4,
    "Сектор Газ": 5,
    "Tortuga": 6,
    "TheGoat Ferreira": 7,
    "01 FORD MUSTANG": 8,
    "17 Jordan Grand Prix": 9,
    "211 Scuderia Ferrari": 10,
    "24 Andretti William Hill F2": 11,
    "55 Williams F1 Team": 12,
    "00 FoxTrot GP": 13,
    "72 Foxtrot GP": 14,
    "12 Kimoa Racing F1 Team": 15,
    "43 Williams Racing": 16,
    "43 Campos Racing F1": 17,
    "Red Bull Argen": 18,
    "Roma Astur": 19,
    "83 Lotus Cars": 20,
    "21 Titan F1 Team by Vitality Motorsports": 21,
    "ruiFerrari": 22,
    "50 Titan F1 Team": 23,
    "Williams Racing": 24,
    "Titán F1 Team": 25,
    "25 Kimoa Racing F1 Team": 26,
    "PREMA RACING": 27,
    "Red Bull Racing F1 Team": 28,
    "99 Campos Racing F1": 29,
    "Infiniti Red Bull Racing F1 Team": 30,
    "00 CRT Competition": 31,
    "89 WILLIAMS RACING TEAM": 32,
  },
  vueltaRapida: "83 Lotus Cars",
  combustible: null,
  sancionados: [],
  fuente: "https://igpmanager.com/app/d=result&id=70355086&tier=1&tab=race",
};

aplicarResultado(SRS.jornadas[3], RESULTADO_J4_JAPON);

// Resultado importado de iGP Manager: J5 Barein (id 70355087).
var RESULTADO_J5_BAREIN = {
  posiciones: {
    "777 Cadillac Saint Laurent Kimoa": 1,
    "10 Scuderia Ferrari": 2,
    "50 Rizia Royal Racing": 3,
    "11 Racing Club": 4,
    "17 Jordan Grand Prix": 5,
    "Сектор Газ": 6,
    "55 Williams F1 Team": 7,
    "01 FORD MUSTANG": 8,
    "TheGoat Ferreira": 9,
    "211 Scuderia Ferrari": 10,
    "25 Kimoa Racing F1 Team": 11,
    "72 Foxtrot GP": 12,
    "ruiFerrari": 13,
    "Infiniti Red Bull Racing F1 Team": 14,
    "12 Kimoa Racing F1 Team": 15,
    "Tortuga": 16,
    "Titán F1 Team": 17,
    "00 CRT Competition": 18,
    "21 Titan F1 Team by Vitality Motorsports": 19,
    "24 Andretti William Hill F2": 20,
    "43 Williams Racing": 21,
    "83 Lotus Cars": 22,
    "89 WILLIAMS RACING TEAM": 23,
    "50 Titan F1 Team": 24,
    "Red Bull Racing F1 Team": 25,
    "Red Bull Argen": 26,
    "43 Campos Racing F1": 27,
    "PREMA RACING": 28,
    "Roma Astur": 29,
    "00 FoxTrot GP": 30,
    "Williams Racing": 31,
    "99 Campos Racing F1": 32,
  },
  vueltaRapida: "00 CRT Competition",
  combustible: null,
  sancionados: ["00 FoxTrot GP", "Williams Racing", "99 Campos Racing F1"],
  fuente: "https://igpmanager.com/app/d=result&id=70355087&tier=1&tab=race",
};

aplicarResultado(SRS.jornadas[4], RESULTADO_J5_BAREIN);

// Resultado importado de iGP Manager: J6 Malasia (id 70355088).
var RESULTADO_J6_MALASIA = {
  posiciones: {
    "11 Racing Club": 1,
    "00 FoxTrot GP": 2,
    "TheGoat Ferreira": 3,
    "43 Williams Racing": 4,
    "50 Rizia Royal Racing": 5,
    "01 FORD MUSTANG": 6,
    "777 Cadillac Saint Laurent Kimoa": 7,
    "Сектор Газ": 8,
    "72 Foxtrot GP": 9,
    "25 Kimoa Racing F1 Team": 10,
    "211 Scuderia Ferrari": 11,
    "24 Andretti William Hill F2": 12,
    "10 Scuderia Ferrari": 13,
    "Roma Astur": 14,
    "Red Bull Argen": 15,
    "Williams Racing": 16,
    "17 Jordan Grand Prix": 17,
    "43 Campos Racing F1": 18,
    "55 Williams F1 Team": 19,
    "Tortuga": 20,
    "ruiFerrari": 21,
    "00 CRT Competition": 22,
    "Red Bull Racing F1 Team": 23,
    "12 Kimoa Racing F1 Team": 24,
    "21 Titan F1 Team by Vitality Motorsports": 25,
    "50 Titan F1 Team": 26,
    "83 Lotus Cars": 27,
    "89 WILLIAMS RACING TEAM": 28,
    "Titán F1 Team": 29,
    "99 Campos Racing F1": 30,
    "Infiniti Red Bull Racing F1 Team": 31,
    "PREMA RACING": 32,
  },
  vueltaRapida: "83 Lotus Cars",
  combustible: null,
  sancionados: [],
  fuente: "https://igpmanager.com/app/d=result&id=70355088&tier=1&tab=race",
};

aplicarResultado(SRS.jornadas[5], RESULTADO_J6_MALASIA);

// Resultado importado de iGP Manager: J7 Paises Bajos (id 70355089).
var RESULTADO_J7_PAISES_BAJOS = {
  posiciones: {
    "43 Williams Racing": 1,
    "777 Cadillac Saint Laurent Kimoa": 2,
    "17 Jordan Grand Prix": 3,
    "Tortuga": 4,
    "50 Rizia Royal Racing": 5,
    "00 FoxTrot GP": 6,
    "TheGoat Ferreira": 7,
    "211 Scuderia Ferrari": 8,
    "01 FORD MUSTANG": 9,
    "11 Racing Club": 10,
    "Red Bull Racing F1 Team": 11,
    "89 WILLIAMS RACING TEAM": 12,
    "Red Bull Argen": 13,
    "10 Scuderia Ferrari": 14,
    "Сектор Газ": 15,
    "00 CRT Competition": 16,
    "Infiniti Red Bull Racing F1 Team": 17,
    "24 Andretti William Hill F2": 18,
    "55 Williams F1 Team": 19,
    "ruiFerrari": 20,
    "43 Campos Racing F1": 21,
    "72 Foxtrot GP": 22,
    "Williams Racing": 23,
    "Roma Astur": 24,
    "Titán F1 Team": 25,
    "12 Kimoa Racing F1 Team": 26,
    "PREMA RACING": 27,
    "25 Kimoa Racing F1 Team": 28,
    "50 Titan F1 Team": 29,
    "99 Campos Racing F1": 30,
    "21 Titan F1 Team by Vitality Motorsports": 31,
    "83 Lotus Cars": 32,
  },
  vueltaRapida: "83 Lotus Cars",
  combustible: null,
  sancionados: [],
  fuente: "https://igpmanager.com/app/d=result&id=70355089&tier=1&tab=race",
};

aplicarResultado(SRS.jornadas[6], RESULTADO_J7_PAISES_BAJOS);

// Resultado importado de iGP Manager: J8 México (id 70355090).
// Ojo: en iGP el 777 aparece ahora como "777 Andretti William Hill Kimoa",
// "03 Williams Racing" es "Williams Racing" y "Сектор Газа" es "Сектор Газ";
// se usan las claves de SRS.pilotos para que casen con los emparejamientos.
var RESULTADO_J8_MEXICO = {
  posiciones: {
    "10 Scuderia Ferrari": 1,
    "TheGoat Ferreira": 2,
    "50 Rizia Royal Racing": 3,
    "11 Racing Club": 4,
    "Infiniti Red Bull Racing F1 Team": 5,
    "Tortuga": 6,
    "01 FORD MUSTANG": 7,
    "777 Cadillac Saint Laurent Kimoa": 8,
    "43 Williams Racing": 9,
    "Сектор Газ": 10,
    "55 Williams F1 Team": 11,
    "24 Andretti William Hill F2": 12,
    "00 CRT Competition": 13,
    "211 Scuderia Ferrari": 14,
    "99 Campos Racing F1": 15,
    "43 Campos Racing F1": 16,
    "Roma Astur": 17,
    "Red Bull Argen": 18,
    "Red Bull Racing F1 Team": 19,
    "Titán F1 Team": 20,
    "83 Lotus Cars": 21,
    "12 Kimoa Racing F1 Team": 22,
    "89 WILLIAMS RACING TEAM": 23,
    "25 Kimoa Racing F1 Team": 24,
    "PREMA RACING": 25,
    "ruiFerrari": 26,
    "50 Titan F1 Team": 27,
    "72 Foxtrot GP": 28,
    "Williams Racing": 29,
    "00 FoxTrot GP": 30,
    "17 Jordan Grand Prix": 31,
    "21 Titan F1 Team by Vitality Motorsports": 32,
  },
  vueltaRapida: "43 Campos Racing F1",
  combustible: null,
  sancionados: [
    "00 FoxTrot GP",
    "17 Jordan Grand Prix",
    "21 Titan F1 Team by Vitality Motorsports",
  ],
  fuente: "https://igpmanager.com/app/d=result&id=70355090&tier=1&tab=race",
};

aplicarResultado(SRS.jornadas[7], RESULTADO_J8_MEXICO);
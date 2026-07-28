// ============================================================
// GENERADOR DE EMPAREJAMIENTOS ALEATORIOS — Copa T39
// Uso desde la consola del navegador (con srs-data.js cargado):
//   const nuevos = SRS.generarEmparejamientos();
//   console.log(JSON.stringify(nuevos, null, 2));
// Copia el resultado dentro de la jornada correspondiente en
// srs-data.js, y rellena posA/posB/ganador tras la carrera.
// ============================================================
(function () {
  function shuffle(array) {
    const copia = array.slice();
    for (let i = copia.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
  }

  // Elige quién descansa esta jornada, priorizando a quien menos
  // veces haya descansado hasta ahora (para repartir el bye equitativamente).
  function elegirDescanso(equipos) {
    const vecesDescansado = {};
    equipos.forEach((eq) => (vecesDescansado[eq] = 0));
    SRS.jornadas.forEach((j) => {
      if (j.descansa && vecesDescansado.hasOwnProperty(j.descansa)) {
        vecesDescansado[j.descansa]++;
      }
    });
    const minVeces = Math.min(...Object.values(vecesDescansado));
    const candidatos = equipos.filter((eq) => vecesDescansado[eq] === minVeces);
    return candidatos[Math.floor(Math.random() * candidatos.length)];
  }

  function generarEmparejamientos() {
    const todos = SRS.pilotos.map((p) => p.equipo);
    const descansa = elegirDescanso(todos);
    const compiten = shuffle(todos.filter((eq) => eq !== descansa));

    const enfrentamientos = [];
    for (let i = 0; i < compiten.length; i += 2) {
      enfrentamientos.push({
        equipoA: compiten[i],
        posA: null,
        equipoB: compiten[i + 1],
        posB: null,
        ganador: null,
      });
    }

    return { descansa, enfrentamientos };
  }

  SRS.generarEmparejamientos = generarEmparejamientos;
})();